import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";


// Getting the details of a specific purchase
export async function GET(req: Request, { params }: { params: { purchaseId: string }}) {
  try {
    const session = await getAuthSession()

    if(!session?.user){
      return new Response("Unauthorized", { status: 401 })
    }

    const purchaseExists = await db.purchase.findFirst({
      where: {
        id: params.purchaseId
      }
    })

    if(!purchaseExists) {
      return new Response("Purchase not found", { status: 404 })
    }

    return NextResponse.json(purchaseExists)

  } catch (error) {
    return new Response("Something went wrong", { status: 500 })
  }
}

// Updating the status of the purchase
export async function PUT(req: Request, { params }: { params: { purchaseId: string }}) {
  try {
    const session = await getAuthSession()

    if(!session?.user){
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { status } = body

    if (!status) {
      return new Response("Status not provided", {
        headers: {
          "content-type": "text/plain;charset=UTF-8",
        },
        status: 400,
      })
    }

    await db.purchase.update({
      where: {
        id: params.purchaseId,
      },
      data: {
        status
      }
    })
    
    return new Response("Status updated", { status: 200 })
  } catch (error) {
    return new Response("Something went wrong")
  }
}

export async function DELETE(req: Request, { params }: { params: { purchaseId: string } }) {
  try {
    const session = await getAuthSession()

    if(!session?.user){
      return new Response("Unauthorized", { status: 401 })
    }

    const purchaseExists = await db.purchase.findFirst({
      where: {
        id: params.purchaseId
      }
    })

    if(!purchaseExists) {
      return new Response("Purchase does not exists", { status: 404 })
    }

    await db.purchase.delete({
      where: {
        id: params.purchaseId
      }
    })

    return new Response("Item deleted")
  } catch (error) {
    return new Response("Something went wrong", { status: 500 })
  }
}