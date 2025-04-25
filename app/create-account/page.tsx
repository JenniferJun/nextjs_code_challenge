"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { createAccount } from "./actions"; import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  USERNAME_MIN_LENGTH,
} from "@/lib/constants";
import { UsersIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);
  return (

    <div className="text-black flex flex-col justify-center items-center pt-20">
      <div className="flex w-auto justify-center items-center">
        <UsersIcon className="h-20 w-20 text-blue-800 " name="titleIcone" />
        <p className="text-2xl font-bold text-center px-5">Join JenyJ Property</p>
      </div>
      <div>
        <p className="text-2xl font-bold text-center px-5">Hello Welcom to JenyJ Property!</p>
        <p className="text-xl font-bold text-center px-5">Fill in the form below to join!</p>
      </div>
      <div className="text-black flex flex-col justify-center items-center py-10">
        <form action={dispatch} className="flex flex-col gap-3">
          <Input
            name="username"
            type="text"
            placeholder="Username"
            required
            errors={state?.fieldErrors.username}
            minLength={USERNAME_MIN_LENGTH}
            icon="username"
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            required
            errors={state?.fieldErrors.email}
            icon="email"
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            minLength={PASSWORD_MIN_LENGTH}
            required
            errors={state?.fieldErrors.password}
            icon="password"
          />
          <Input
            name="confirm_password"
            type="password"
            placeholder="Confirm Password"
            required
            minLength={PASSWORD_MIN_LENGTH}
            errors={state?.fieldErrors.confirm_password}
            icon="password"
          />
          <Button text="Create account" />
          <Link
            href="/"
            className="primary-btn flex items-center justify-center transition-colors"
          >
            Home
          </Link>
        </form>
      </div>
    </div>
  );
}
