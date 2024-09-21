"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Item, ItemRating } from "@prisma/client";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getUserById } from "@/lib/helper";
import Link from "next/link";

interface pageProps {
  params: {
    itemId: string;
  };
}

// TODO: Create rating and if you rated for this item before then update that rating
const Page: FC<pageProps> = ({ params }) => {

  const [item, setItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(false)
  const [rating, setRating] = useState(3); 
  const [comment, setComment] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [review, setReview] = useState<ItemRating | null>(null);


  //TODO: Extract the userId of the object and after that extract all the ratings he had given, then from that ratings array find the rating of current item which user has rated. If user has not rated then then leave it.

  useEffect(() => {
    async function getItemById(itemId: string) {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/items/${itemId}`
        );
        setItem(data);
      } catch (error) {
        console.log(error);
      }
    }

    getItemById(params.itemId);
    // getUserById()
  }, [params]);

  const onSubmitReview = () => {
    
  }

  console.log(rating);
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Create your review</CardTitle>
          <CardDescription>
            Write your review for the item below.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div>
            <p className="text-lg">Item</p>
            <Link href={`/item/${item?.ownerId}/${params.itemId}`}
              className="flex justify-start items-center border gap-4 ps-4"
            >
              <Image
                src={item?.image || ""}
                alt="Item Image"
                width={12}
                height={12}
                className="w-12 h-12 rounded-xl border"
              />
              <span className="text-sm underline">{item?.title}</span>
            </Link>
            <div className="flex flex-col w-full gap-2">
              <p className="flex gap-2 items-baseline">Rating: {rating} stars</p>
              <Slider
                defaultValue={[3]}
                max={5}
                step={1}
                onValueChange={(value) => setRating(value[0])}
                className="w-full"
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <p>Additional comments</p>
              <Textarea
                className="w-full"
                placeholder="I love this item..."
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="w-full">
          <Button
            type="submit"
            disabled={isLoading}
            isLoading={isLoading}
            onClick={() => {}}
            className="w-full"
          >
            Submit review
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
