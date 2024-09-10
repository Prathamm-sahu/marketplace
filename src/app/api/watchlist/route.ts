import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { WatchListValidator } from "@/lib/validators/watchList";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getAuthSession()

    if(!session?.user) {
      return new Response("Unauthenticated", { status: 401 })
    }

    const params = req.nextUrl.searchParams
    const userId = params.get("userId")

    // If another user trys to access someone else watchlist
    if(userId !== session.user.id) {
      return new Response("You are trying to access someone else watchlist", { status: 403 })
    }

    const watchlist = db.watchList.findFirst({
      where: {
        userId: session.user.id
      }
    })

    return NextResponse.json(watchlist)
  } catch (error) {
    return new Response("Something went wrong", { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession()

    if(session?.user) {
      return new Response("Unauthenticated", { status: 401 })
    }

    const body = await req.json()
    const { userId, itemId } = WatchListValidator.parse(body)

    await db.watchList.create({
      data: {
        userId,
        itemId
      }
    })

    return new Response("OK")
  } catch (error) {
    return new Response("Something went wrong", { status: 500 })
  }
}

export async function DELETE(req:NextRequest) {
  try {
    const session = await getAuthSession()

    if(session?.user) {
      return new Response("Unauthenticated", { status: 401 })
    }

    const body = await req.json()
    const { id } = WatchListValidator.parse(body)

    await db.watchList.delete({
      where: {
        id
      }
    })

    return new Response("OK")
  } catch (error) {
    return new Response("Something went wrong", { status: 500 })
  }
}