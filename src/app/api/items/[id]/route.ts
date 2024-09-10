import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { ItemValidator } from "@/lib/validators/item";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(req: Request, { params }: { params: { id: string }}) {
  try {
    const item = await db.item.findFirst({
      where: {
        id: params.id
      }
    })

    if(!item) {
      return new Response("Item not found", { status: 404 })
    }

    return NextResponse.json(item, { 
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    })
  } catch (error) {
    return new Response("Something went wrong", { status: 500 })
  }
}

// Only the owner of the item can update the item
export async function PUT(req: Request, { params }: { params: { id: string }}) {
  try {
    const session = await getAuthSession()

    if(!session) {
      return new Response("Unauthorized", { status: 401 })
    }

    // Checking item exists
    const itemExists = await db.item.findFirst({
      where: {
        id: params.id
      }
    })

    if(!itemExists) {
      return new Response("Item not found", { status: 404 })
    }

    // Checking owner of the item
    if(itemExists.ownerId !== session.user.id) {
      return new Response("You are not the owner of this item", { status: 403 })
    }

    const body = await req.json()
    const { title, description, price, totalSupply, availableSupply, category, listed, image } = ItemValidator.parse(body)

    await db.item.update({
      where: {
        id: params.id,
        ownerId: session.user.id,
      },
      data: {
        title,
        description,
        price,
        totalSupply,
        availableSupply,
        category,
        listed,
        image
      }
    })

    return new Response("OK", { status: 200, headers: { "Content-Type": "text/plain;charset=UTF-8"}})

  } catch (error) {
    if(error instanceof ZodError) {
      return new Response(error.message)
    }

    return new Response("Something went wrong", { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string }}) {
  try {
    const session = await getAuthSession()

    if(!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const itemExists = await db.item.findFirst({
      where: {
        id: params.id,
        ownerId: session.user.id
      }
    })

    if(!itemExists) {
      return new Response("Item not found", { status: 404 })
    }

    await db.item.delete({
      where: {
        id: params.id,
        ownerId: session.user.id
      }
    })

    return new Response("OK")
  } catch (error) {
    return new Response("Something went wrong", { status: 500 })
  }
}