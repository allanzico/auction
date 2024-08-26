'use server'

import prisma from "@/db/database";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getSignedUrlForS3Upload } from "../lib/s3";
import { AuctionSchema, LocationSchema, LotCategorySchema, LotSchema } from "../lib/schemas";
import AuctionCard from "@/components/auction/auction-card";
import { getUser } from "./auth";
import { AuctionFilterValidator, ProductState } from "@/lib/validators/product-validators";

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