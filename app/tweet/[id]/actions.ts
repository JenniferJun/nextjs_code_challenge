"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";

export async function likePost(tweetId: number) {
  await new Promise((r) => setTimeout(r, 1000));
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        tweetId: tweetId,
        userId: session.id!,
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {}
}

export async function dislikePost(tweetId: number) {
  await new Promise((r) => setTimeout(r, 1000));
  try {
    const session = await getSession();
    await db.like.delete({
      where: {
        id: {
          tweetId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {}
}
