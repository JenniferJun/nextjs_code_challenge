import TweetList from "@/components/tweet-list";
import { getTweets } from "./actions";
import AddTweet from "@/components/addTweet";
import { TWEET_PAGE_SIZE } from "@/lib/constants";
import SearchBox from "@/components/search-box";
export type InitialTweets = Awaited<ReturnType<typeof getTweets>>;

export default async function HomePage() {
    const initialTweets = await getTweets({ page: 1, pageSize: TWEET_PAGE_SIZE });

    return (

        <div className="flex flex-col items-center justify-start h-full p-8 w-full border-red-500">
            <div className="flex justify-around items-center w-full mb-4" >
                <h1 className="text-2xl font-bold ">
                    Jeny.J Tweets  {TWEET_PAGE_SIZE}
                </h1>
                <div className="w-[50%] flex justify-end items-end">
                    <SearchBox />
                </div>
            </div >
            <AddTweet />
            <TweetList initialTweets={initialTweets} />

        </div>
    );
}
