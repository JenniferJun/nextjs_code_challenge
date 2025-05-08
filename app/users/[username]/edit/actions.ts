"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import getSession from "@/lib/session";

const editProfileSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    bio: z.string().optional(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR)
      .optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.password && data.confirmPassword) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export async function editProfile(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session.id) {
    redirect("/log-in");
  }

  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    bio: formData.get("bio"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const result = await editProfileSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  }

  const { username, email, bio, password } = result.data;

  // Check if username is taken by another user
  const existingUser = await db.user.findFirst({
    where: {
      username,
      NOT: {
        id: session.id,
      },
    },
  });

  if (existingUser) {
    return {
      fieldErrors: {
        username: ["This username is already taken"],
      },
    };
  }

  // Check if email is taken by another user
  const existingEmail = await db.user.findFirst({
    where: {
      email,
      NOT: {
        id: session.id,
      },
    },
  });

  if (existingEmail) {
    return {
      fieldErrors: {
        email: ["This email is already taken"],
      },
    };
  }

  const updateData: any = {
    username,
    email,
    bio,
  };

  if (password) {
    updateData.password = await bcrypt.hash(password, 12);
  }

  await db.user.update({
    where: {
      id: session.id,
    },
    data: updateData,
  });

  revalidatePath(`/users/${username}`);
  redirect(`/users/${username}`);
}
