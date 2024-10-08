import { AuctionSchema, LotCategorySchema, LotSchema } from "@/lib/schemas";
import { z } from "zod";
import prisma from "./database";

const getRandomPrice = () => {
  const PRICES = [9.99, 19.99, 29.99, 39.99, 49.99, 59.99, 69.99, 79.99, 89.99, 99.99]
  return PRICES[Math.floor(Math.random() * PRICES.length)]
}

export const seed = async () => {
  const categories: z.infer<typeof LotCategorySchema>[] = []
  const user = 'clzkgxlux0001ouieuin98rkp'
  let auctions: z.infer<typeof AuctionSchema>[] = []
  const lots: z.infer<typeof LotSchema>[] = []
  const locations = ["cm0b4qfsg0001k84vc4n1uwaf", "cm0b4qfsf0000k84vwmh8zv9r", "clznz5y3j0000dksccco802qt"]
  const images = [
    "f8c02e49-69f8-4ed5-8747-afcf00060e0e1717862582426",
    "e6fce116-3f94-4423-a582-3bc3d08a87711717860097076",
    "de9637e7-5f65-4bc9-ad8d-8f96bab333d51717862620552",
    "bd2bb67e-633d-4895-aad9-914188516edb1717862625088",
    "bd2bb67e-633d-4895-aad9-914188516edb1717862625088",
    "bd2bb67e-633d-4895-aad9-914188516edb1717862625088",
    "9b0affa1-7980-4da6-a206-be775713479c1717862618222"
  ]

  // create random categories with a minimum 5 string name 
  for (let i = 0; i < Math.floor(Math.random() * 5) + 5; i++) {
    categories.push({
      name: Math.random().toString(36).substring(7)
    })
  }

  //add categories to db
  await Promise.all(categories.map(async (category) => {
    await prisma.lotCategory.create({
      data: {
        name: category.name,
      },
    })
  }))

  // create auctions with random images and dates
  for (let i = 0; i < Math.floor(Math.random() * 5) + 5; i++) {
    for (let j = 0; j < images.length; j++) {
      const imageId = images[j];
      const startDateOffset = Math.floor(Math.random() * 10) + 1; // Start date between 1-10 days from now
      const endDateOffset = startDateOffset + Math.floor(Math.random() * 30) + 5; // End date between 5-35 days after start

      const startDate = new Date();
      startDate.setDate(startDate.getDate() + startDateOffset);

      const endDate = new Date();
      endDate.setDate(startDate.getDate() + endDateOffset);
      for (let k = 0; k < locations.length; k++) {
        const location = locations[k];
        auctions.push({
          name: Math.random().toString(36).substring(7),
          file: imageId,
          location: location,
          startDate: startDate,
          endDate: endDate,
        });
      }
    }
  }

  //save auctions to db
  await Promise.all(auctions.map(async (auction) => {
    await prisma.auction.create({
      data: {
        name: auction.name,
        user: {
          connect: {
            id: user,
          },
        },
        file: auction.file,
        location: {
          connect: {
            id: auction.location,
          },
        },
        startDate: auction.startDate,
        endDate: auction.endDate,
      },
    })
  }))

  const dbAuctions = await prisma.auction.findMany(
    {
      include: {
        lots: true,
        location: true,
      }
    }
  )

  const dbCategories = await prisma.lotCategory.findMany()


  //create lots for each auction
  for (let i = 0; i < dbAuctions.length; i++) {
    const auctionId = dbAuctions[i].id
    for (let j = 0; j < dbCategories.length; j++) {
      for (let k = 0; k < images.length; k++) {
        const imageId = images[k]
        const categoryId = dbCategories[j].id
        const startingBid = getRandomPrice();
        lots.push({
          name: Math.random().toString(36).substring(7),
          startingBid: startingBid,
          highestBid: startingBid,
          file: imageId,
          category: categoryId,
          auction: auctionId
        })
      }
    }
  }

  // save lots to db
  await Promise.all(lots.map(async (lot) => {
    await prisma.lot.create({
      data: {
        name: lot.name,
        startingBid: lot.startingBid,
        highestBid: lot.highestBid,
        file: lot.file,
        category: {
          connect: {
            id: lot.category,
          },
        },
        auction: {
          connect: {
            id: lot.auction,
          },
        },
      },
    })
  }))
}

seed()
