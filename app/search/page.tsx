
import ListTweet from "@/components/list_tweet";
import SearchBox from "@/components/search-box";
import { searchTweets } from "./actions";

interface SearchPageProps {
    searchParams: {
        q?: string;
    };
}
export default async function SearchPage({ searchParams }: SearchPageProps) {

    let results;
    if (!searchParams.q || searchParams.q === "") {
        results = null;
    } else {

        results = await searchTweets(searchParams.q);
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="flex justify-between items-center w-full p-6">
                <h1 className="text-2xl font-bold">Search Tweets</h1>
            </div>
            <SearchBox />
            <div className="h-[20px]"></div>
            <div className="space-y-4 pr-3 h-[500px] overflow-y-auto">
                {results === null ? (
                    <div className="text-center text-gray-500">
                        Enter a search term to find tweets
                    </div>
                ) : results.tweets.length === 0 ? (
                    <div className="text-center text-gray-500">
                        No tweets found for "{searchParams.q}"
                    </div>
                ) : (
                    results.tweets.map((tweet) => (
                        <ListTweet
                            key={tweet.id}
                            id={tweet.id.toString()}
                            content={tweet.content || ""}
                            created_at={tweet.created_at.toISOString()}
                            username={tweet.user?.username || "Unknown"}
                        />
                    )
                    )
                )}
            </div>
        </div>
    );
} 