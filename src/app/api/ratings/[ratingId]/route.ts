import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { ratingId: string } }
) {
  try {
    const rating = db.item.findFirst({
      where: {
        id: params.ratingId,
      },
    });

    return NextResponse.json(rating);
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { ratingId: string } }
) {
  try {
    const session = await getAuthSession();

    if (session?.user) {
      return new Response("Unauthenticated", { status: 401 });
    }

    const body = await req.json();
    const { authorId, stars, comment } = body;

    if (authorId !== session?.user.id) {
      return new Response("Unauthorized", { status: 403 });
    }

    await db.itemRating.update({
      where: {
        id: params.ratingId,
      },
      data: {
        stars,
        comment,
      },
    });

    return new Response("OK");
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { ratingId: string } }
) {
  try {
    const session = await getAuthSession();

    if (session?.user) {
      return new Response("Unauthenticated", { status: 401 });
    }

    await db.itemRating.delete({
      where: {
        id: params.ratingId,
        authorId: session?.user.id,
      },
    });

    return new Response("OK");
  } catch (error) {
    return new Response("Something went wrong", { status: 400 });
  }
}
