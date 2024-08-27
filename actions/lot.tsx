'use server'

import prisma from "@/db/database";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getSignedUrlForS3Upload } from "../lib/s3";
import { AuctionSchema, LocationSchema, LotCategorySchema, LotSchema } from "../lib/schemas";
import AuctionCard from "@/components/auction/auction-card";
import { getUser } from "./auth";
import { AuctionFilterValidator, ProductState } from "@/lib/validators/product-validators";

export const favoriteLot = async (lotId: string) => {
    const dbUser = await getUser()
    const user = dbUser && dbUser.user
    let session = dbUser && dbUser.session
      if (!session) {
          throw new Error("Unauthorized")
      }
      if(!user || !user.id) {
          throw new Error("Unauthorized")
      }
  
    try {
      // Check if the favorite already exists
      const existingFavorite = await prisma.favoriteLot.findFirst({
        where: {
          userId: user.id,
          lotId: lotId,
        },
      });
  
      if (existingFavorite) {
        // If the favorite exists, remove it
        await prisma.favoriteLot.delete({
          where: { id: existingFavorite.id },
        });
        return { success: true, message: 'Lot removed from favorites' };
      } else {
        // If the favorite doesn't exist, add it
        await prisma.favoriteLot.create({
          data: {
            userId: user.id,
            lotId: lotId,
          },
        });
        return { success: true, message: 'Lot added to favorites' };
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      return { success: false, message: 'Internal Server Error' };
    }
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
  
  export const getLotsInAuction = async (auctionId: string, pageIndex: number, perPage: number, filter: ProductState ) => {

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
        favorited: true,
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
        favorited: true,
      },
    })
  }
  