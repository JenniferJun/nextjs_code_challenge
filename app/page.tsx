import TweetList from "@/components/tweet-list";
import { getTweets } from "./actions";
import AddTweet from "@/components/addTweet";

export type InitialTweets = Awaited<ReturnType<typeof getTweets>>;

export default async function HomePage() {
    const initialTweets = await getTweets({ page: 1, pageSize: 4 });

    return (
        <div className="flex flex-col items-center justify-start h-full p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-7">
                Welcome to Jeny.J Tweets
            </h1>
            <AddTweet />
            <TweetList initialTweets={initialTweets} />
        </div>
    );
}
