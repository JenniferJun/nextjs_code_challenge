"use client";

import { useFormState, useFormStatus } from "react-dom";
import { z } from "zod";
import { addTweet } from "@/app/actions";


interface AddTweetFormState {
    errors?: {
        content?: string[];
    };
    success?: boolean;
}

const initialState: AddTweetFormState = {
    errors: {},
    success: false,
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="absolute right-2 bottom-4 px-4 py-2 bg-gray-400 rounded text-white hover:bg-gray-200 disabled:opacity-50 text-sm"
        >
            {pending ? "Adding..." : "Add"}
        </button>
    );
}

export default function AddTweet() {
    const tweetSchema = z.object({
        content: z.string()
            .min(10, "Tweet must be at least 10 characters")
            .max(280, "Tweet cannot exceed 280 characters")
    });
    const [state, formAction] = useFormState(addTweet, initialState);

    if (state?.success) {
        window.location.reload();
    }

    return (
        <div className="w-full max-w-2xl mb-8">
            <form action={formAction} className="space-y-4">
                <div className="relative">
                    <textarea
                        name="content"
                        placeholder="What's happening?"
                        className="w-full p-4 pr-24 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        rows={1}
                        minLength={10}
                        maxLength={280}
                    />
                    <SubmitButton />
                    {state?.errors?.content && state.errors.content.length > 0 && (
                        <p className="text-red-500 text-sm mt-1">
                            {state.errors.content[0]}
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
} 
