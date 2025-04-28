"use server";

import db from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma";

interface GetTweetsParams {
  page: number;
  pageSize: number;
}

export async function getTweets({ page, pageSize }: GetTweetsParams) {
  const skip = (page - 1) * pageSize;
  const tweets = await db.tweet.findMany({
    skip,
    take: pageSize,
    orderBy: { created_at: "desc" },
  });
  const total = await db.tweet.count();
  return { tweets, total };
}

export type TweetsResponse = Prisma.PromiseReturnType<typeof getTweets>;
