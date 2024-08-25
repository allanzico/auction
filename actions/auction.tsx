'use server'

import prisma from "@/db/database";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getSignedUrlForS3Upload } from "../lib/s3";
import { AuctionSchema, LocationSchema, LotCategorySchema, LotSchema } from "../lib/schemas";
import AuctionCard from "@/components/auction/auction-card";
import { getUser } from "./auth";
import { AuctionFilterValidator, ProductState } from "@/lib/validators/product-validators";


export const createUploadUrl = async (key: string, type: string) => {
    return await getSignedUrlForS3Upload(key, type)
}

export const createAuction = async (data: z.infer<typeof AuctionSchema>) => {
  const dbUser = await getUser()
  const user = dbUser && dbUser.user
  let session = dbUser && dbUser.session
    if (!session) {
        throw new Error("Unauthorized")
    }
    if(!user || !user.id) {
        throw new Error("Unauthorized")
    }

  await prisma.auction.create({
    data: {
      name: data.name,
        user: {
            connect: {
            id: user.id,
            },
        },
        file: data.file,
        location: {
            connect: {
            id: data.location,
            },
        },
        startDate: data.startDate,
        endDate: data.endDate,
    },
  })
  revalidatePath("/")
  revalidatePath ("/auction")
}

export const getAllAuctions = async () => {
  const auctions = await prisma.auction.findMany({
    include: {
      lots: true,
    }
  })
  return auctions
}

export const getMyAuctions = async () => {
  const dbUser = await getUser()
  const user = dbUser && dbUser.user
  let session = dbUser && dbUser.session
if(!user || !user.id) {
    throw new Error("Unauthorized")
}

 return await prisma.auction.findMany(
    {
      where: {
        userId: user.id,
      },
    }
  )
}

export const createLot = async (data: z.infer<typeof LotSchema>) => {
  const dbUser = await getUser()
const user = dbUser && dbUser.user
let session = dbUser && dbUser.session
    if (!session) {
        throw new Error("Unauthorized")
    }

    if(!user || !user.id) {
        throw new Error("Unauthorized")
    }

  await prisma.lot.create({
    data: {
      name: data.name,
      startingBid: data.startingBid,
      highestBid: data.startingBid,
      file: data.file,
      auction: {
        connect: {
          id: data.auction,
        },
      },
      category: {
        connect: {
          id: data.category,
        },
      },
    },
  })
  revalidatePath("/")
}
export const getAllLots = async () => {
  return await prisma.lot.findMany(
    {include: {
      auction: {
        include: {
          location: true,
        },
      },
      category: true,
    }}
  )
}

export const getLotsInAuction = async (auctionId: string, pageIndex: number, perPage: number, filter: ProductState) => {

  const [data, count] = await prisma.lot.findManyAndCount({
    where: {
      auctionId: auctionId,
      categoryId: {
        in: filter.category,
      },
               highestBid: {
            gte: filter.price.range[0],
            lte: filter.price.range[1],
          },
    },
    include: {
      category: true,
      bids: true,
      auction: {
        include: {
          location: true,
        },
      },
    },
    skip: pageIndex * perPage,
    take: perPage,
    orderBy: {
      bids: {
        _count: filter.sort === "price-desc" ? "desc" : "asc",
      },
    },
  });

  return { data, count };
};


export const displayAllAuctions = async (page: number) => {
  try {
    const auctions = await prisma.auction.findMany({
      include: {
        lots: true,
      }
    })
    return auctions.slice((page - 1) * 2, page * 100).map((auction: any, index) => {
      return <>
      <AuctionCard key={auction.id} auction={auction} index={index} />
      </>

    })    
 } catch (error) {
   console.error(error)
 }
}

export const createLotCategory = async (data: z.infer<typeof LotCategorySchema>) => {
  const dbUser = await getUser()
  const user = dbUser && dbUser.user
  let session = dbUser && dbUser.session
    if (!session) {
        throw new Error("Unauthorized")
    }
    if(!user || !user.id) {
        throw new Error("Unauthorized")
    }

  await prisma.lotCategory.create({
    data: {
      name: data.name,
    },
  })
  revalidatePath("/")
}

export const getLotCategories = async () => {
  return await prisma.lotCategory.findMany()
}

export const getLot = async (id: string) => {
  return await prisma.lot.findUnique({
    where: {
      id: id,
    },
    include: {
      auction:  {
        include: {
          location: true,
        },
      },
      category: true,
      bids : {
        include: {
          user: {
            select: {
              name: true,
            }
          },
        },
      },
    },
  })
}

export const createLocation = async (data: z.infer<typeof LocationSchema>) => {
  const dbUser = await getUser()
const user = dbUser && dbUser.user
let session = dbUser && dbUser.session

  if (!session) {
      throw new Error("Unauthorized")
  }

  if(!user || !user.id) {
      throw new Error("Unauthorized")
  } 

  await prisma.location.create({
    data: {
      country: data.country,
      city: data.city,
    },
  })
}

export const getLocations = async () => {
  return await prisma.location.findMany()
}

export const getLotBids = async (lotId: string) => {
  return await prisma.bid.findMany({
    where: {
      lotId: lotId,
    },
    include: {
      user: true,
    },
  })
}

export const addBid = async (lotId: string, amount: number) => {
  const dbUser = await getUser()
const user = dbUser && dbUser.user
let session = dbUser && dbUser.session


 try {
  if (!session) {
    throw new Error("Unauthorized")
}

if(!user || !user.id) {
    throw new Error("Unauthorized")
}

await prisma.bid.create({
  data: {
    amount: amount,
    lot: {
      connect: {
        id: lotId,
      },
    },
    user: {
      connect: {
        id: user.id,
      },
    },
  },
})

//update lot highest bid
await prisma.lot.update({
  where: {
    id: lotId,
  },
  data: {
    highestBid: amount,
  },
})
revalidatePath('/auction/lot/[id]' , 'page')
return {success: true, message: "Bid placed successfully"}
 } catch (error) {
  console.error(error)
 }
}

export const getCategoriesInAuction = async (auctionId: string) => {
  const lots = await prisma.lot.findMany({
    where: {
      auctionId,
    },
    include: {
      category: true,
    },
  });

  const categoryMap = new Map();
  lots.forEach((lot: any) => {
    const category = lot.category;
    if (!categoryMap.has(category.id)) {
      categoryMap.set(category.id, category);
    }
  });

  const uniqueCategories = Array.from(categoryMap.values());
  return uniqueCategories;
};

export const getLocationInAuction = async (auctionId: string) => {
  const auction = await prisma.auction.findUnique({
    where: {
      id: auctionId,
    },
    include: {
      location: true,
    },
  });
 return auction?.location
};




