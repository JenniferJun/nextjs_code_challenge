import TweetList from "@/components/tweet-list";
import db from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma";

export async function getFirstTweets({ page, pageSize }) {
    const skip = (page - 1) * pageSize;
    const tweets = await db.tweet.findMany({
        skip,
        take: pageSize,
        orderBy: { created_at: "desc" },
    });
    const total = await db.tweet.count();
    return { tweets, total };
}


export type InitialTweets = Prisma.PromiseReturnType<
    typeof getFirstTweets
>;


export default async function HomePage() {
    const initialTweets = await getFirstTweets({ page: 1, pageSize: 8 });

    return (
        <>
            <TweetList initialTweets={initialTweets} />
        </>
    );
}
