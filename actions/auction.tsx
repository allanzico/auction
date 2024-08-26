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




