"use server";

import db from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma";
import { z } from "zod";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const tweetSchema = z.object({
  content: z.string(),
});

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
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  const total = await db.tweet.count();
  return { tweets, total };
}

export async function addTweet(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session.id) {
    return {
      errors: {
        content: ["로그인이 필요합니다."],
      },
    };
  }

  const data = {
    content: formData.get("content"),
  };

  const result = tweetSchema.safeParse(data);
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  await db.tweet.create({
    data: {
      content: result.data.content,
      userId: session.id,
    },
  });
}

export type TweetsResponse = Prisma.PromiseReturnType<typeof getTweets>;
