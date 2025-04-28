"use client";

import { logIn } from "./action";
import { useFormState } from "react-dom";
import { UsersIcon } from "@heroicons/react/24/outline";
import Input from "@/components/input";
import Button from "@/components/button";
import Link from "next/link";

'@heroicons/react/24/outline'
export default function Home() {
    const [state, action] = useFormState(logIn, null);

    return (
        <div className="text-black flex flex-col justify-center items-center py-20">
            <div className="flex w-auto justify-center items-center">
                <UsersIcon className="h-20 w-20 text-blue-800 " name="titleIcone" />
                <p className="text-3xl font-bold text-center py-10 px-5">Log in</p>
            </div>

            <form
                action={action}
                className="flex flex-col items-center justify-center gap-1"
            >
                <Input
                    name="email"
                    type="text"
                    placeholder="Email"
                    required
                    errors={state?.fieldErrors.email}
                    icon="email"
                />

                <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    icon="password"
                    errors={state?.fieldErrors.password}
                />
                <Button text="Log in" />
                <Link
                    href="/create-account"
                    className="primary-btn flex items-center justify-center transition-colors"
                >
                    Create Account
                </Link>
                <Link
                    href="/"
                    className="primary-btn flex items-center justify-center transition-colors"
                >
                    Home
                </Link>
            </form>

        </div>
    );
}
