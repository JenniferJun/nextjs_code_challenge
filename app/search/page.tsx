import { Suspense } from "react";
import SearchBox from "@/components/search-box";
import SearchResults from "@/components/search-results";

interface SearchPageProps {
    searchParams: {
        q?: string;
    };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Search Tweets</h1>
            <SearchBox />
            <Suspense fallback={<div>Loading...</div>}>
                <SearchResults query={searchParams.q} />
            </Suspense>
        </div>
    );
} 