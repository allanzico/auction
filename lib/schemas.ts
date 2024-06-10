import { z } from "zod";

export const AuctionSchema = z.object({
  name: z.string().min(2, {
    message: "must be at least 2 characters.",
  }),
  file: typeof window === 'undefined' ? z.any() : z.instanceof(FileList)
  .refine((file) => file?.length == 1, 'File is required.'),
  location: z.string().min(2, {
    message: "must be at least 2 characters.",
  }),
  startDate: z.date()
  .refine((date) => new Date(date) >= new Date(), 'Start date can not be in the past.'),
  endDate: z.date()
  .refine((date) => new Date(date) > new Date(), 'End date must be in the future.'),
})

export const LotSchema = z.object({
  name: z.string().min(2, {
    message: "must be at least 2 characters.",
  }),
  startingBid: z.coerce.number().min(1, {
    message: "must be a number.",
  }),
  file: typeof window === 'undefined' ? z.any() : z.instanceof(FileList)
  .refine((file) => file?.length == 1, 'File is required.')
  .refine((file) => file?.[0].type.startsWith('image/'), 'File must be an image.'),
  auction: z.string(),
  category: z.string()
})

export const LotCategorySchema = z.object({
  name: z.string().min(2, {
    message: "must be at least 2 characters.",
  }),
})

export const LocationSchema = z.object({
  country: z.string().min(2, {
    message: "must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "must be at least 2 characters.",
  }),
})

export const BidSchema = z.object({
  amount: z.coerce.number().min(1, {
    message: "must be a number.",
  }),
  lot: z.string(),
})