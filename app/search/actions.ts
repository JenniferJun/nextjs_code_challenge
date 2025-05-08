"use server";

import db from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma";

export async function searchTweets(query: string) {
  const tweets = await db.tweet.findMany({
    where: {
      content: {
        contains: query,
      },
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return {
    tweets,
    total: tweets.length,
  };
}
