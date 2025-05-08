import Link from "next/link";

export default function Nav() {
    return (
        <nav className="w-full">
            < div className="max-w-2xl mx-auto px-4 py-3" >
                <div className="flex justify-between items-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-7">
                        Jeny.J Tweets
                    </h2>
                    <Link
                        href="/search"
                        className="text-gray-600 hover:text-gray-900"
                    >
                        Search
                    </Link>
                </div>
            </div >
        </nav >
    );
}

