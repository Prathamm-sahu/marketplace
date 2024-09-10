import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { RatingValidator } from "@/lib/validators/rating";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

// Get ratings of all the products of user
export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams
    const authorId = params.get("authorId")

    const ratings = db.rating.findMany({
      where: {
        authorId: authorId || ""
      }
    })

    if(!ratings) {
      return new Response("Could not able to fetch ratings")
    }

    return NextResponse.json(ratings, {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    })
  } catch (error) {
    return new Response("Something went wrong", { status: 500 })
  }
}

// Submit rating by the user
export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession()

    if(!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { itemId, authorId, stars, comment } = RatingValidator.parse(body)

    await db.rating.create({
      data: {
        itemId,
        authorId,
        stars,
        comment
      }
    })

    return new Response("OK", { headers: { "Content-Type": "text/plain" }})

  } catch (error) {
    if(error instanceof ZodError) {
      return new Response(error.message)
    }

    return new Response("Something went wrong", { status: 500 })
  }
}