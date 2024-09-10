import { z } from "zod";

export const PurchaseValidator = z.object({
  id: z.string().optional(),
  itemId: z.string(),
  buyerId: z.string(),
  sellerId: z.string(),
  quantity: z.number(),
  itemPrice: z.number(),
  status: z.enum(["PENDING", "SHIPPED", "DELIVERED"]).optional(),
  txnDigest: z.string()
})

export type PurchaseType = z.infer<typeof PurchaseValidator>