"use client";

import FormButton from "../components/form-btn";
import FormInput from "../components/form-input";
import WelcomeBack from "../components/welcome_back";
import { handleForm } from "./action";
import { useFormState } from "react-dom";
import { FilmIcon, UsersIcon } from "@heroicons/react/24/outline"; import { PASSWORD_MIN_LENGTH } from "../lib/constants";
'@heroicons/react/24/outline'
export default function Home() {
    const [state, action] = useFormState(handleForm, null);

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
                <FormInput
                    name="email"
                    type="text"
                    placeholder="Email"
                    required
                    errors={state?.fieldErrors.email}
                    icon="email"
                />

                <FormInput
                    name="username"
                    type="text"
                    placeholder="Username"
                    required
                    errors={state?.fieldErrors.username}
                    icon="username"
                />
                <FormInput
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    icon="password"
                    errors={state?.fieldErrors.password}
                />
                <FormButton text="Log in" />

                {state?.fieldErrors ? (
                    null
                ) : (
                    <WelcomeBack />
                )}
            </form>

        </div>
    );
}
