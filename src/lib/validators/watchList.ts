import { z } from "zod";

export const WatchListValidator = z.object({
  id: z.string().optional(),
  itemId: z.string(),
  userId: z.string(),
})

export type WatchListType = z.infer<typeof WatchListValidator>