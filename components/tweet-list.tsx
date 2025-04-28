"use client";

import { TweetsResponse } from "@/app/action";
import { useState } from "react";
import ListTweet from "./list_tweet";
import { getTweets } from "@/app/action";

interface TweetListProps {
    initialTweets: TweetsResponse;
}

export default function TweetList({ initialTweets }: TweetListProps) {
    const [tweetList, setTweetList] = useState<TweetsResponse>(initialTweets);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(initialTweets.total);
    const [isLoading, setIsLoading] = useState(false);

    const pageSize = 8;

    const onLoadMoreClick = async (page: number) => {
        setIsLoading(true);
        const data = await getTweets({ page, pageSize });
        setTweetList(data);
        setTotal(data.total);
        setPage(page);
        setIsLoading(false);
    }

    const hasPrev = page > 1;
    const hasNext = page * pageSize < total;

    return (
        <div className="flex flex-col items-center justify-start h-full p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-12">
                Welcome to Jeny.J Tweets
            </h1>
            <ul className="w-full max-w-2xl mb-0 top-0 h-full">
                {tweetList.tweets.map((tweet) => (
                    <ListTweet
                        key={tweet.id}
                        id={tweet.id.toString()}
                        content={tweet.content || ""}
                        created_at={tweet.created_at.toISOString()}
                    />
                ))}
            </ul>
            <div className="flex gap-4 justify-center items-center bottom-0">
                <button
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    onClick={() => onLoadMoreClick(page - 1)}
                    disabled={!hasPrev}
                >
                    이전
                </button>
                <span>Page {page}</span>
                <button
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    onClick={() => onLoadMoreClick(page + 1)}
                    disabled={!hasNext}
                >
                    다음
                </button>
            </div>
        </div>
    );
}