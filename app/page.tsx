import TweetList from "@/components/tweet-list";
import { getTweets } from "./actions";
import AddTweet from "@/components/addTweet";
import { TWEET_PAGE_SIZE } from "@/lib/constants";
import Nav from "@/components/nav";

export type InitialTweets = Awaited<ReturnType<typeof getTweets>>;

export default async function HomePage() {
    const initialTweets = await getTweets({ page: 1, pageSize: TWEET_PAGE_SIZE });

    return (

        <div className="flex flex-col items-center justify-start h-full p-8">
            <Nav></Nav>

            <AddTweet />
            <TweetList initialTweets={initialTweets} />
        </div>
    );
}
