"use server";

import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const tweetSchema = z.object({
  content: z
    .string()
    .min(10, "Tweet must be at least 10 characters")
    .max(280, "Tweet cannot exceed 280 characters"),
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

  const tweet = await db.tweet.create({
    data: {
      content: result.data.content,
      userId: session.id,
    },
  });
  revalidatePath("/");
  redirect(`/tweet/${tweet.id}`);
  //return { success: true };
}

export type TweetsResponse = Prisma.PromiseReturnType<typeof getTweets>;
