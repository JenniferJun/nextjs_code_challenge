import Link from "next/link";
import db from "@/lib/db";

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

export default async function TweetDetailPage({ params }: { params: { id: string } }) {
    const id = Number(params.id);
    const tweet = await getTweetById(id.toString());

    if (isNaN(id)) {
        return (<>
            <div className="flex justify-center items-center h-80">Invalid tweet ID</div>
            <HomeButton />
        </>);
    }

    if (!tweet) {
        return (<>
            <div className="flex justify-center items-center h-80">Tweet not found</div>
            <HomeButton />
        </>);
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

            <HomeButton />
        </div>
    );
}

function HomeButton() {
    return (
        <Link
            href="/"
            className="primary-btn flex items-center justify-center transition-colors"
        >
            Home
        </Link>
    );
}