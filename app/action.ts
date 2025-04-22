"use server";

import {
  PASSWORD_MIN_LENGTH,
  USERNAME_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  PASSWORD_MIN_ERROR,
  USERNAME_MIN_ERROR,
  EMAIL_ZOD_ERROR,
} from "../lib/constants";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .toLowerCase()
    .refine((email) => email.includes("@zod.com"), EMAIL_ZOD_ERROR),
  username: z.string().min(USERNAME_MIN_LENGTH, USERNAME_MIN_ERROR),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_ERROR)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function handleForm(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = formSchema.safeParse(data);

  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
