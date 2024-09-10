import { z } from "zod";

export const RatingValidator = z.object({
  id: z.string().optional(),
  itemId: z.string(),
  authorId: z.string(),
  stars: z.number(),
  comment: z.string(),
})

export type RatingType = z.infer<typeof RatingValidator>