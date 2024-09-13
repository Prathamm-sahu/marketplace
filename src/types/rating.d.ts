import { RatingValidator } from "@/lib/validators/rating"
import { ItemRating, User } from "@prisma/client"

export type ExtendedRating = ItemRating & {
  author: User
}