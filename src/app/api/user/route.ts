import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // const session = await getAuthSession()

    // if(!session?.user) {
    //   return new Response("Unauthenticated", { status: 401 })
    // }

    const userId = req.nextUrl.searchParams.get("userId")

    if(!userId) {
      return new Response("Invalid userId", { status: 400 })
    }
    console.log('pratham')
    const user = await db.user.findFirst({
      where: {
        id: userId
      },
      include: {
        itemPurchased: true,
        itemSelled: true,
        items: true,
        itemRatings: true,
      }
    })

    console.log('sahu')

    if(!user) {
      return new Response("User not found", { status: 404 })
    }
    console.log('sahu')
    return NextResponse.json(user)
  } catch (error) {
    return new Response("Something went wrong", { status: 500 })
  }
}