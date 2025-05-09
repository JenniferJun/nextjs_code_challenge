import Link from "next/link";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import { unstable_cache as nextCache } from "next/cache";
import getSession from "@/lib/session";
import LikeButton from "@/components/like-button";

async function getTweetById(id: string) {
    try {
        const tweet = await db.tweet.findUnique({
            where: { id: parseInt(id) },
            include: {
                user: {
                    select: {
                        username: true,
                    },
                },
                _count: {
                    select: {
                        Like: true,
                    },
                },
            },
        });
        return tweet;
    } catch (error) {
        console.error("Error fetching tweet:", error);
    }
}

const getCachedPost = nextCache(getTweetById, ["post-detail"], {
    tags: ["tweet-detail"],
    revalidate: 60,
});

async function getLikeStatus(tweetId: number) {
    const session = await getSession();
    if (!session.id) {
        return {
            likeCount: 0,
            isLiked: false,
        };
    }

    const [isLiked, likeCount] = await Promise.all([
        db.like.findUnique({
            where: {
                id: {
                    tweetId,
                    userId: session.id,
                },
            },
        }),
        db.like.count({
            where: {
                tweetId,
            },
        }),
    ]);

    return {
        likeCount,
        isLiked: Boolean(isLiked),
    };
}

function getCachedLikeStatus(tweetId: number) {
    const cachedOperation = nextCache(getLikeStatus, ["product-like-status"], {
        tags: [`like-status-${tweetId}`],
    });
    return cachedOperation(tweetId);
}

export default async function TweetDetailPage({ params }: { params: { id: string } }) {
    const id = Number(params.id);

    if (isNaN(id)) {
        return (<>
            <div className="flex justify-center items-center h-80">Invalid tweet ID</div>
        </>);
    }

    const tweet = await getCachedPost(id.toString());
    if (!tweet) {
        return (<>
            <div className="flex justify-center items-center h-80">Tweet not found</div>
        </>);
    }

    const { likeCount, isLiked } = await getLikeStatus(id);

    return (
        <div className="flex flex-col items-center justify-start h-full p-8 gap-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-12 w-full text-center">
                Tweet Detail
            </h1>
            <div className="bg-white rounded-lg shadow-md p-6 w-full">
                <div className="flex items-center space-x-4 mb-4">
                    <div className="flex-1">
                        <p className="text-gray-500 text-sm underline font-bold">
                            <Link href={`/users/${tweet.user.username}`}>
                                @{tweet.user.username}
                            </Link>
                        </p>
                    </div>
                </div>
                <p className="text-gray-800 mb-4">{tweet.content}</p>
                <div className="flex items-center space-x-4 text-gray-500">
                    <LikeButton isLiked={isLiked} likeCount={likeCount} postId={id} />
                    <span>{new Date(tweet.created_at).toLocaleDateString()}</span>
                </div>
            </div>

            <Link
                href="/"
                className="primary-btn flex items-center justify-center transition-colors  px-2 py-2"
            >
                Home
            </Link>
        </div>
    );
}
