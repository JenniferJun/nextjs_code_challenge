"use client";

import { useFormState, useFormStatus } from "react-dom";
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

export default function AddTweet() {

    const [state, formAction] = useFormState(addTweet, initialState);

    console.log(state, "state");

    if (state?.success) {
        window.location.reload();
    }
    const { pending } = useFormStatus();
    console.log(state, "state", pending, "pending");

    return (
        <div className="w-full max-w-2xl mb-3">
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
                    <button
                        type="submit"
                        disabled={pending}
                        className="absolute right-2 top-3 px-4 py-2  bg-green-700  rounded-full text-white hover:bg-neutral-400 transition-colors disabled:opacity-50 text-sm"
                    >
                        {pending ? "Adding..." : "Add"}
                    </button>
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
