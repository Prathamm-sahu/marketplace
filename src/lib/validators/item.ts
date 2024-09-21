import { z } from "zod";

export const ItemValidator = z.object({
  id: z.string().optional(),
  title: z.string().min(3, { message: 'Title must be longer than 3 characters'}).max(128, { message: 'Title must be at max 128 characters'}),
  description: z.string(),
  price: z.number(),
  image: z.string(),
  ownerId: z.string().optional(),
  listed: z.boolean(),
  totalSupply: z.number(),
  availableSupply: z.number(),
  category: z.enum(["collectiblesAndArt", "electronics", "homeAndGarden", "jewelryAndAccessories", "toysAndGames"])
})

export type ItemType = z.infer<typeof ItemValidator>