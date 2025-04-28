"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import getSession from "@/lib/session";

'@heroicons/react/24/outline'
export default function HomePage() {
    const [tweets, setTweets] = useState<{ id: number; content: string; created_at: Date; updated_at: Date; userId: number; }[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const pageSize = 8;

    useEffect(() => {
        fetch(`/api/tweets?page=${page}&pageSize=${pageSize}`)
            .then(res => res.json())
            .then(data => {
                setTweets(data.tweets);
                setTotal(data.total);
            });
    }, [page]);

    const hasPrev = page > 1;
    const hasNext = page * pageSize < total;

    return (
        <div className="flex flex-col items-center justify-start h-full p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-12">
                Welcome to Jeny.J Tweets
            </h1>

            <ul className="w-full max-w-2xl mb-8 top-0 h-full">
                {tweets.map(tweet => (
                    <li
                        key={tweet.id}
                        className="bg-white hover:bg-gray-200 cursor-pointer p-4 rounded-lg shadow mb-2 flex flex-row justify-between"
                        onClick={() => window.location.href = `/tweet/${tweet.id}`}
                    >
                        <div className="text-gray-800"><Link href={`/tweet/${tweet.id}`}>{tweet.content}</Link></div>
                        <div className="text-xs text-gray-400">{new Date(tweet.created_at).toLocaleString()}</div>
                    </li>
                ))}
            </ul>
            <div className="flex gap-4 justify-center items-center bottom-0">
                <button
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    onClick={() => setPage(page - 1)}
                    disabled={!hasPrev}
                >
                    이전
                </button>
                <span>Page {page}</span>
                <button
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    onClick={() => setPage(page + 1)}
                    disabled={!hasNext}
                >
                    다음
                </button>
            </div>
        </div>
    );
}
