"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface ListTweetProps {
    id: string;
    content: string;
    created_at: string;
    username: string;
}

export default function ListTweet({ id, content, created_at, username }: ListTweetProps) {
    const router = useRouter();
    const formattedDate = new Date(created_at).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    return (
        <li
            key={id}
            className="bg-white hover:bg-gray-200 cursor-pointer p-4 rounded-lg shadow mb-2 flex flex-row justify-between"
            onClick={() => router.push(`/tweet/${id}`)}
        >
            <div className="flex flex-col">
                <div className="text-gray-800">
                    <Link href={`/tweet/${id}`}>{content}</Link>
                </div>
                <div className="text-sm text-gray-500">@{username}</div>
            </div>
            <div className="text-xs text-gray-400">{formattedDate}</div>
        </li>
    );
}
