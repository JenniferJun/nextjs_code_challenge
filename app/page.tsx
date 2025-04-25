"use client";

import { handleForm } from "./action";
import { useFormState } from "react-dom";
import Link from "next/link";

'@heroicons/react/24/outline'
export default function HomePage() {
    const [state, action] = useFormState(handleForm, null);

    return (
        <div className="flex flex-col items-center justify-center h-full p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
                Welcome to Jeny.J Property
            </h1>
            <p className="text-lg text-gray-600 text-center mb-8 max-w-2xl">
                Your trusted partner in finding the perfect property. Whether you're buying or selling,
                we're here to help you every step of the way.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                <Link
                    href="/properties"
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Browse Properties</h2>
                    <p className="text-gray-600">Explore our wide range of properties available for sale.</p>
                </Link>

                <Link
                    href="/sell"
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Sell Your Property</h2>
                    <p className="text-gray-600">List your property with us and reach potential buyers.</p>
                </Link>
            </div>

            <div className="mt-8 flex gap-4 w-full">

                <Link
                    href="/log-in"
                    className="primary-btn flex items-center justify-center transition-colors"
                >
                    Log In
                </Link>
                <Link
                    href="/create-account"
                    className="primary-btn flex items-center justify-center transition-colors"
                >
                    Create Account
                </Link>
            </div>
        </div>
    );
}
