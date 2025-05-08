import { searchTweets } from "@/app/search/actions";
import TweetList from "@/components/tweet-list";

interface SearchResultsProps {
    query?: string;
}

export default async function SearchResults({ query }: SearchResultsProps) {
    if (!query) {
        return (
            <div className="text-center text-gray-500">
                Enter a search term to find tweets
            </div>
        );
    }

    const results = await searchTweets(query);

    if (results.tweets.length === 0) {
        return (
            <div className="text-center text-gray-500">
                No tweets found for "{query}"
            </div>
        );
    }

    return <TweetList initialTweets={results} />;
} 