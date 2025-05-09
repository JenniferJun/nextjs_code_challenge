"use client";

import { TweetsResponse, getTweets } from "@/app/actions";
import { useState } from "react";
import ListTweet from "./list_tweet";
import { TWEET_PAGE_SIZE } from "@/lib/constants";

interface TweetListProps {
    initialTweets: TweetsResponse;
}

export default function TweetList({ initialTweets }: TweetListProps) {
    const [tweetList, setTweetList] = useState<TweetsResponse>(initialTweets);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(initialTweets.total);
    const [isLoading, setIsLoading] = useState(false);

    const pageSize = TWEET_PAGE_SIZE;

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
        <>
            <ul className="w-full max-w-2xl mb-0 top-0 h-full">
                {tweetList.tweets.map((tweet) => (
                    <ListTweet
                        key={tweet.id}
                        id={tweet.id.toString()}
                        content={tweet.content || ""}
                        created_at={tweet.created_at.toISOString()}
                        username={tweet.user?.username || "Unknown"}
                    />
                ))}
            </ul>
            <div className="flex gap-4 justify-center items-center bottom-0 w-full ">
                <div className="w-[90px]">
                    {hasPrev && (
                        <button
                            className="primary-btn"
                            onClick={() => onLoadMoreClick(page - 1)}
                            disabled={!hasPrev}
                        >
                            이전
                        </button>
                    )}</div>
                <span className="w-[100px] text-center">Page {page}</span>
                <div className="w-[90px]">
                    {hasNext && (
                        <button
                            className="primary-btn"

                            onClick={() => onLoadMoreClick(page + 1)}
                            disabled={!hasNext}
                        >
                            다음
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}