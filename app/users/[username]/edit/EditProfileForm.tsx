"use client";

import { useFormState, useFormStatus } from "react-dom";
import { editProfile } from "./actions";
import { useOptimistic } from "react";
import { HomeButton } from "@/app/tweet/[id]/page";
import Link from "next/link";

interface EditProfileFormProps {
    user: {
        username: string;
        email: string;
        bio: string | null;
    };
}

export default function EditProfileForm({ user }: EditProfileFormProps) {
    const [state, formAction] = useFormState(editProfile, null);
    const [optimisticUser, updateOptimisticUser] = useOptimistic(
        user,
        (state, newData: Partial<typeof user>) => ({
            ...state,
            ...newData,
        })
    );
    const { pending } = useFormStatus();
    return (
        <form action={formAction} className="space-y-4">
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    defaultValue={optimisticUser.username}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {state?.fieldErrors?.username && (
                    <p className="text-red-500 text-sm mt-1">{state.fieldErrors.username[0]}</p>
                )}
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={optimisticUser.email}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {state?.fieldErrors?.email && (
                    <p className="text-red-500 text-sm mt-1">{state.fieldErrors.email[0]}</p>
                )}
            </div>

            <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    Bio
                </label>
                <textarea
                    id="bio"
                    name="bio"
                    defaultValue={optimisticUser.bio || ""}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    New Password (optional)
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {state?.fieldErrors?.password && (
                    <p className="text-red-500 text-sm mt-1">{state.fieldErrors.password[0]}</p>
                )}
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {state?.fieldErrors?.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{state.fieldErrors.confirmPassword[0]}</p>
                )}
            </div>

            <div className="pt-4 flex-col justify-between items-center">

                <button
                    type="submit"
                    disabled={pending}
                    className="primary-btn"
                >
                    {pending ? "Saving..." : "Save Changes"}
                </button>
                <div className="h-[5px]"></div>
                <Link
                    href="/"
                    className="primary-btn"
                >
                    Home
                </Link>
            </div>
        </form>
    );
} 