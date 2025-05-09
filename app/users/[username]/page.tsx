import { notFound } from "next/navigation";
import db from "@/lib/db";
import Link from "next/link";
import TweetList from "@/components/tweet-list";
import getSession from "@/lib/session";
import ListTweet from "@/components/list_tweet";
interface UserProfilePageProps {
    params: {
        username: string;
    };
}

async function getUserProfile(username: string) {
    const user = await db.user.findUnique({
        where: {
            username,
        },
        select: {
            id: true,
            username: true,
            email: true,
            bio: true,
            created_at: true,
            Tweet: {
                select: {
                    id: true,
                    content: true,
                    created_at: true,
                    updated_at: true,
                    userId: true,
                    user: {
                        select: {
                            username: true,
                        },
                    },
                },
                orderBy: {
                    created_at: "desc",
                },
            },
        },
    });

    if (!user) {
        notFound();
    }

    return {
        ...user,
        Tweet: {
            tweets: user.Tweet,
            total: user.Tweet.length
        }
    };
}

export default async function UserProfilePage({ params }: UserProfilePageProps) {
    const user = await getUserProfile(params.username);
    const session = await getSession();
    const isOwner = session?.id === user.id;

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold">{user.username}</h1>
                        <p className="text-gray-600">{user.email}</p>
                        {user.bio && <p className="mt-2">{user.bio}</p>}
                    </div>
                    <div className="w-[200px] flex-col gap-2">
                        {isOwner && (
                            <Link
                                href={`/users/${user.username}/edit`}
                                className="primary-btn flex items-center justify-center transition-colors  px-2 py-2"
                            >
                                Edit Profile
                            </Link>
                        )}
                        <div className="h-[5px]"></div>
                        <Link
                            href="/"
                            className="primary-btn flex items-center justify-center transition-colors  px-2 py-2"
                        >
                            Home
                        </Link>
                    </div>
                </div>
            </div>

            <div className="space-y-4 pr-3 h-[500px] overflow-y-auto">
                <h2 className="text-xl font-semibold">Tweets</h2>

                {user.Tweet.tweets.length > 0 ? (
                    user.Tweet.tweets.map((tweet) => (
                        <ListTweet
                            key={tweet.id}
                            id={tweet.id.toString()}
                            content={tweet.content || ""}
                            created_at={tweet.created_at.toISOString()}
                            username={tweet.user?.username || "Unknown"}
                        />
                    ))
                ) : (
                    <p className="text-gray-600">No tweets found</p>
                )}

            </div>
        </div>
    );
} 