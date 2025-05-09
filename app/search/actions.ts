"use server";

import db from "@/lib/db";

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
