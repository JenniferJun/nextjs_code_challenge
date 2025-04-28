"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Tweet {
    id: number;
    content: string;
    created_at: Date;
    user: {
        username: string;
    };
    _count: {
        Like: number;
    };
}

export default function TweetDetailPage() {
    const params = useParams();
    const [tweet, setTweet] = useState<Tweet | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchTweet() {
            try {
                const response = await fetch(`/api/tweets/${params.id}`);
                const data = await response.json();
                setTweet(data);
            } catch (error) {
                console.error("Error fetching tweet:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchTweet();
    }, [params.id]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!tweet) {
        return <div className="flex justify-center items-center h-screen">Tweet not found</div>;
    }

    return (
        <div className="flex flex-col items-center justify-start h-full p-8 gap-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-12 w-full text-center">
                Tweet Detail
            </h1>
            <div className="bg-white rounded-lg shadow-md p-6 w-full">
                <div className="flex items-center space-x-4 mb-4">
                    <div className="flex-1">
                        <p className="text-gray-500 text-sm">{tweet.user.username}</p>
                    </div>
                </div>
                <p className="text-gray-800 mb-4">{tweet.content}</p>
                <div className="flex items-center space-x-4 text-gray-500">
                    <span>{tweet._count.Like} likes</span>
                    <span>{new Date(tweet.created_at).toLocaleDateString()}</span>
                </div>
            </div>
            <Link
                href="/"
                className="primary-btn flex items-center justify-center transition-colors"
            >
                Home
            </Link>
        </div>
    );
} 