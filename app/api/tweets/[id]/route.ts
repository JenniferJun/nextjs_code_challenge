import db from "@/lib/db";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await getTweetById(params.id);
  return NextResponse.json(data);
}

async function getTweetById(id: string) {
  try {
    const tweet = await db.tweet.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: {
          select: {
            username: true,
          },
        },
        _count: {
          select: {
            Like: true,
          },
        },
      },
    });

    if (!tweet) {
      redirect("/");
    }

    return tweet;
  } catch (error) {
    console.error("Error fetching tweet:", error);
    redirect("/");
  }
}
