import { z } from "zod";

export const AuctionSchema = z.object({
  name: z.string().min(2, {
    message: "must be at least 2 characters.",
  }),
  file: typeof window === 'undefined' ? z.any() : z.instanceof(FileList)
  .refine((file) => file?.length == 1, 'File is required.')
})

export const LotSchema = z.object({
  name: z.string().min(2, {
    message: "must be at least 2 characters.",
  }),
  price: z.coerce.number().min(1, {
    message: "must be a number.",
  }),
  file: typeof window === 'undefined' ? z.any() : z.instanceof(FileList)
  .refine((file) => file?.length == 1, 'File is required.')
  .refine((file) => file?.[0].type.startsWith('image/'), 'File must be an image.'),
  auction: z.string()
})