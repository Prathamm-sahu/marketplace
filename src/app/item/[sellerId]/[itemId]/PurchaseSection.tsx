"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Item } from "@prisma/client";
import axios from "axios";
import { Session } from "next-auth";
import { FC, useState } from "react";

type PurchaseSectionProps = Item & {
  session: Session;
};

const PurchaseSection: FC<PurchaseSectionProps> = ({
  id,
  title,
  price,
  ownerId,
  image,
  availableSupply,
  listed,
  session,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  const addItemToWatchList = async () => {
    try {
      await axios.post("/api/watchlist", {
        userId: session.user.id,
        itemId: id,
      });
      setIsWatched(true);
    } catch (error) {
      console.log(error);
    }
  };

  const removeItemFromWatchList = async () => {
    try {
      await axios.delete(`/api/watchlist?itemId=${id}`);
      setIsWatched(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onRemoveListing = async () => {
    try {
      setLoading(true);
      await axios.put(`/api/items/${id}`, {
        listed: false,
      });
      window.location.href = `/seller/${session.user.id}`;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onAddToCart = async () => {
    setLoading(true);
    if (session.user.id === ownerId) {
      return;
    }

    const rawCartItems = localStorage.get("cart");
    if (!rawCartItems) {
      localStorage.setItem("cart", "[]");
    }

    const cartItems = JSON.parse(rawCartItems);
    /*
      TODO: If the item is already in the cart, increment the quantity of the item in the cart, 
      otherwise, add the item to the cart
    */

    let flag = 0;
    for (let i = 0; i < cartItems.lenght; i++) {
      if (cartItems[i].id === id) {
        cartItems[i].quantity += 1;
        flag = 1;
        break;
      }
    }

    if (!flag) {
      cartItems.push({
        id,
        title,
        quantity,
        image,
        ownerId,
        price,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    window.dispatchEvent(new Event("cartUpdated"));
    setLoading(false);
  };

  const onBuyNow = async () => {
    try {
      setLoading(true);
      await axios.post("/api/purchases", {
        itemId: id,
        buyerId: session.user.id,
        sellerId: ownerId,
        quantity,
        itemPrice: price,
      });
      window.location.href = `/seller/${ownerId}?tab=purchases`;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {session.user.id === ownerId ? (
        <Card className="items-center p-6 flex flex-col gap-3 w-3/12 sticky top-6">
          <Button
            onClick={onRemoveListing}
            isLoading={loading}
            disabled={loading}
            variant={"destructive"}
          >
            Remove Listing
          </Button>
        </Card>
      ) : (
        <Card className="items-center p-6 flex flex-col gap-3 w-3/12 sticky top-6">
          <div className="flex flex-col items-center w-full gap-4">
            <div className="flex flex-col justify-center items-start w-full">
              <p className="text-3xl font-semibold">${price}</p>
              <p
                className={cn(
                  `text-xl font-semibold`,
                  availableSupply === 0 ? "text-red-600" : "text-green-600"
                )}
              >
                {availableSupply === 0 ? "Out of Stock" : "In Stock"}
              </p>
            </div>

            <div className="w-full flex flex-row items-center justify-start gap-4">
              <Label className="text-center text-lg">Qty:</Label>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => {
                  setQuantity(parseInt(e.target.value));
                }}
                className={cn("w-[90px] bg-white flex flex-row items-center border border-black/25 rounded py-2 px-3 space-x-2",  quantity > availableSupply ? "text-red-500" : "")}
              />
            </div>
            <Button onClick={onBuyNow} isLoading={loading} disabled={loading} className="w-full font-medium bg-[#FFA41C] text-black hover:bg-[#FFB41C]">
              {availableSupply === 0
                ? "Out of stock"
                : listed === true
                ? "Buy now"
                : "Item not available"}
            </Button>
            <Button
              onClick={onAddToCart}
              isLoading={loading}
              disabled={loading}
              className="w-full font-medium bg-[#FFD813] text-black hover:bg-[#FFE813]"
            >
              {availableSupply === 0
                ? "Out of stock"
                : listed === true
                ? "Add to cart"
                : "Item not available"}
            </Button>
            <div className="py-2 w-full">
              <div className="bg-black/50 w-full h-px" />
            </div>

            {isWatched ? (
              <Button
                disabled={loading || availableSupply == 0 || listed == false}
                variant="outline"
                className="w-full font-medium  rounded-lg text-black "
                onClick={() => removeItemFromWatchList()}
              >
                Remove from Watch List
              </Button>
            ) : (
              <Button
                disabled={loading || availableSupply == 0 || listed == false}
                className="w-full font-medium bg-white border border-black/50 py-3 rounded-full text-black hover:bg-white"
                onClick={() => addItemToWatchList()}
              >
                Add to Watch List
              </Button>
            )}
          </div>
        </Card>
      )}
    </>
  );
};

export default PurchaseSection;
