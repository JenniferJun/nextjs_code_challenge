"use client";

import Input from "../../../components/input";
import { useFormState } from "react-dom";
import { PASSWORD_MINLENGTH } from "../../../lib/constants";
import Link from "next/link";
import Button from "../../../components/button";
import LogoHeader from "../../../components/LogoHeader";

export default function Login() {
  const [state, submit] = useFormState(loginAction, null);

  return (
    <div className="flex h-screen bg-white">
      <div className="mx-auto md:basis-1/2 lg:basis-1/4">
        <div>
          <div className="text-black flex flex-col justify-between items-center mt-[150px]">
            <p className="text-3xl font-bold text-center">Log in</p>
            <p className="text-center mt-2">Welcome back!</p>
            <form
              action={submit}
              className="flex flex-col gap-1 mt-[150px] w-full  md:px-[50px]"
            >
              <label className="font-bold">Email</label>
              <Input
                name="email"
                type="text"
                placeholder="Email"
                required
                errors={state?.fieldErrors.email}
              />
              <label className="font-bold">Password</label>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                required
                errors={state?.fieldErrors.password}
                minLength={PASSWORD_MINLENGTH}
              />
              <div className="mt-[150px]">
                <Button text="Log in with Email" />
              </div>
            </form>
            <p className="font-bold text-sm mt-4">
              Don't have an account yet?{" "}
              <Link
                href="/sign-up"
                className="font-medium hover:underline text-black no-underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* <SocialLogin /> */}
    </div>
  );
}
