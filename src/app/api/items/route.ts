import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { ItemValidator } from "@/lib/validators/item";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  // Complete this route accordingly
  try {
    // const session = await getAuthSession()

    // if(!session?.user) {
    //   return new Response("Unauthorised", { status: 401 })
    // }

    const queryParams = req.nextUrl.searchParams
    const userId = queryParams.get("user")
    const listed = queryParams.get("listed")
    const search = queryParams.get("search")
    const category = queryParams.get("category")
    const sort = queryParams.get("sort")
  } catch (error) {
    
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession()

    if(!session?.user) {
      return new Response("Unauthorised", { status: 401 })
    }

    const body = await req.json()
    const { title, description, price, image, listed, ownerId, totalSupply, availableSupply, category } = ItemValidator.parse(body)

    await db.item.create({
      data: {
        title,
        description,
        price,
        image,
        listed,
        ownerId,
        totalSupply,
        availableSupply,
        category
      }
    })

  return new Response("OK", { 
    headers: {
      "Content-Type": "text/plain;charset=UTF-8"
    }
  })
  } catch (error) {
    if(error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      'Could not create new item at this time. Please try again later',
      { status: 500 }
    )
  }
}