
// Get all the purchases done by buyer
// Get all the item selled by seller

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PurchaseValidator } from "@/lib/validators/purchase";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

// This route gives all the purchases done by either buyer or the item selled by seller

// TODO: Test this route properly
export async function GET(req: NextRequest){
  try {
    const session = await getAuthSession()

    if(!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const params = req.nextUrl.searchParams
    const buyerId = params.get("buyerId")
    const sellerId = params.get("sellerId")

    const purchases = await db.purchase.findMany({
      where: {
        OR: [
          {
            buyerId: buyerId || ""
          },
          {
            sellerId: sellerId || ""
          }
        ]
      }
    })

    if(!purchases) {
      return new Response("Purchases not found", { status: 404 })
    }
    return NextResponse.json(purchases, { headers: { "Content-Type": "application/json;charset=UTF-8"}})
  } catch (error) {
    return new Response("Something went wrong", { status: 500 })
  }
}


// User purchasing an item
export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if(!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { itemId, buyerId, sellerId, quantity, itemPrice, txnDigest } = PurchaseValidator.parse(body)

    const itemExits = await db.item.findFirst({
      where: {
        id: itemId
      }
    })

    if(!itemExits) {
      return new Response("Item does not exists", { status: 404 })
    }

    // Checking if supply is suffecient
    if(itemExits.availableSupply < quantity) {
      return new Response("Not enough supply", { status: 400 })
    }

    // Checking if item is listed or not
    if(!itemExits.listed) {
      return new Response("This item is not listed")
    }

    await db.purchase.create({
      data: {
        itemId,
        buyerId,
        sellerId,
        itemPrice,
        quantity,
        txnDigest,
      }
    })

    return new Response("OK")

  } catch (error) {
    if(error instanceof ZodError){
      return new Response(error.message)
    }

    return new Response("Something went wrong", { status: 500 })
  }
}