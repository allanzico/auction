'use server'

import { auth } from "@/auth";
import prisma from "@/db/database";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getSignedUrlForS3Upload } from "../s3";
import { AuctionSchema, LotSchema } from "../schemas";
import AuctionCard from "@/components/auction/auction-card";


export const createUploadUrl = async (key: string, type: string) => {
    return await getSignedUrlForS3Upload(key, type)
}

export const createAuction = async (data: z.infer<typeof AuctionSchema>) => {
    const  session = await auth()

    if (!session) {
        throw new Error("Unauthorized")
    }

    const user = session.user
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
    },
  })
  revalidatePath("/")
  revalidatePath ("/auction")
}

export const getAllAuctions = async () => {
  return await prisma.auction.findMany()
}

export const getMyAuctions = async () => {
  const  session = await auth()

const user = session?.user
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
    const  session = await auth()

    if (!session) {
        throw new Error("Unauthorized")
    }

    const user = session.user
    if(!user || !user.id) {
        throw new Error("Unauthorized")
    }

  await prisma.lot.create({
    data: {
      name: data.name,
      price: data.price,
      file: data.file,
      auction: {
        connect: {
          id: data.auction,
        },
      },
    },
  })
  revalidatePath("/")
}

export const displayAllAuctions = async (page: number) => {
  try {
    const auctions = await prisma.auction.findMany({})
    return auctions.slice((page - 1) * 2, page * 100).map((auction, index) => {
      return <AuctionCard key={auction.id} auction={auction} index={index} />
    })    
 } catch (error) {
   console.error(error)
 }
}