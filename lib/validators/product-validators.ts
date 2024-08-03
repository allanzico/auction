import { z } from "zod";


export const AVAILABLE_SORT = ["none", "price-asc", "price-desc"] as const;

export const ProductFilterValidator = z.object({
  category: z.array(z.string()),
  city: z.string(),
  status: z.enum(["open", "closed"]),
  sort: z.enum(AVAILABLE_SORT),
  price: z.tuple([z.number(), z.number()]),
});

export type ProductState = Omit<z.infer<typeof ProductFilterValidator>, "price"> & {
  price: {isCustom: boolean, range: [number, number]};
};