"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CartItem } from "@/types/cart";
import axios from "axios";
import { ShoppingCartIcon } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

interface CartCardProps {
  session: Session;
}

const CartCard: FC<CartCardProps> = ({ session }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /*
    On page load, get the cart items from local storage.
  */

  useEffect(() => {
    const rawCartItem = localStorage.getItem("cart");
    if (!rawCartItem) {
      setCartItems([]);
      return;
    }
    const cartItem = JSON.parse(rawCartItem);
    setCartItems(cartItem);
  }, []);

  /*
    Dispatches an event to the window whenever the cart items change.
    HINT: Dispatch an event with the name "cartUpdated"
  */
  useEffect(() => {
    window.dispatchEvent(new Event("cartUpdated"));
  }, [cartItems]);

  //  TODO: Ensure proper error handling
  const onPurchase = async () => {
    try {
      setIsLoading(true);
      cartItems.forEach(async (item) => {
        await axios.post("https://localhost:3000/api/purchases", {
          itemId: item.id,
          buyerId: session.user.id,
          sellerId: item.sellerId,
          quantity: item.quantity,
          itemPrice: item.price,
        });
      });

      localStorage.setItem("cart", "");
      window.location.href = `/seller/${session.user.id}?tab=purchases`;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-[#f4f7f7] p-6 text-black h-full">
      <div className="flex gap-6 items-start">
        <Card className="bg-white p-6 w-9/12">
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="text-3xl font-medium flex items-center">
                <ShoppingCartIcon />
                Shopping Cart
              </div>
              <div className="bg-black/25 rounded w-full h-px" />

              {/* Display cart Item */}
              <div className="grid grid-cols-1">
                {!cartItems || cartItems.length === 0 ? (
                  <p>No items in cart</p>
                ) : (
                  cartItems.map((item) => (
                    <CartCardItem key={item.id} {...item} />
                  ))
                )}
              </div>
              {cartItems && cartItems.length >= 1 && (
                <div className="border-t border-black/25 pt-6 flex items-end gap-2 justify-end">
                  <p className="text-2xl font-medium">
                    Subtotal ({cartItems.length} item
                    {cartItems && cartItems.length >= 2 ? "s" : ""}
                    ):
                  </p>
                  <p className="text-2xl font-bold">
                    {" "}
                    $
                    {cartItems
                      .reduce<number>(
                        (acc, curr) => acc + curr.quantity * curr.price,
                        0
                      )
                      .toLocaleString()}{" "}
                  </p>
                  <Button
                    className="w-full font-medium bg-[#FFD813]  hover:bg-[#FFE813] text-black"
                    onClick={onPurchase}
                    disabled={isLoading}
                  >
                    Checkout
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

const CartCardItem = ({ title, quantity, price, image, id }: CartItem) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const rawCartItem = localStorage.getItem("cart");
    if (!rawCartItem) {
      setCartItems([]);
      return;
    }
    const cartItem = JSON.parse(rawCartItem);
    setCartItems(cartItem);
  }, []);

  return (
    <div>
      <Image
        src={image}
        alt="background image"
        className="shrink-0"
        width={160}
        height={160}
      />
      <div>
        <p>{title}</p>
        <div>
          <div>
            <p>Qty:</p>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => {
                const index = cartItems.findIndex((item) => item.id === id);
                const updatedCartItems = [
                  ...cartItems.slice(0, index),
                  {
                    ...cartItems[index],
                    quantity: Number(e.target.value),
                  },
                  ...cartItems.slice(index + 1, cartItems.length),
                ];
                setCartItems(updatedCartItems);
                localStorage.setItem("cart", JSON.stringify(updatedCartItems));
              }}
            />
          </div>
        </div>

        <Button
          className="text-blue-500 hover:underline hover:cursor-pointer"
          onClick={() => {
            const itemIndex = cartItems.findIndex((item) => item.id === id);

            if (itemIndex !== -1) {
              const deletedItemFromCart = [
                ...cartItems.slice(0, itemIndex),
                ...cartItems.slice(itemIndex + 1, cartItems.length),
              ];
              setCartItems(deletedItemFromCart);
              localStorage.setItem("cart", JSON.stringify(deletedItemFromCart));
            }
          }}
        >
          Delete
        </Button>
      </div>

      <p className="text-xl font-medium">
        ${(quantity * price).toLocaleString()}
      </p>
    </div>
  );
};

export default CartCard;
