"use client";

import Link from "next/link";
import { FC } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { ExtendedRating } from "@/types/rating";

interface ReviewCardProps {
  review: ExtendedRating;
}

// TODO: Add styles add see for further optimizations

const ReviewCard: FC<ReviewCardProps> = ({ review }) => {
  return (
    <div>
      <Link href={`/seller/${review.authorId}`}>
        {review.author.image !== "" ? (
          <Image
            src={review.author.image || ""}
            alt=""
            height={40}
            width={40}
            className="w-[40px] h-[40px] rounded-full"
          />
        ) : (
          <div className="w-[40px] h-[40px] rounded-full bg-yellow-500"></div>
        )}
        <span className="">{review.author.name}</span>
      </Link>

      <div className="text-md flex flex-row">
        {[1, 2, 3, 4, 5].map((i) => {
          return (
            <Star
              key={i}
              className={
                i <= Math.round(review.stars)
                  ? "text-orange-500 fill-orange-500"
                  : "text-orange-500"
              }
            />
          );
        })}
      </div>
      <span className="text-gray-500">Reviewed on {`${review.createdAt}`}</span>
      <div>
        <span>{review.comment}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
