import { Suspense } from "react";
import SearchBox from "@/components/search-box";
import { searchTweets } from "./actions";
import TweetList from "@/components/tweet-list";

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
            <div className="flex justify-between items-center w-full mb-8"></div>
            {results === null ? (
                <div className="text-center text-gray-500">
                    Enter a search term to find tweets
                </div>
            ) : results.tweets.length === 0 ? (
                <div className="text-center text-gray-500">
                    No tweets found for "{searchParams.q}"
                </div>
            ) : (
                <Suspense key={searchParams.q} fallback={<div>Loading...</div>}>
                    <TweetList initialTweets={results} />
                </Suspense>
            )}
        </div>
    );
} 