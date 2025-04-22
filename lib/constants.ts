import { z } from "zod";

export const USERNAME_MIN_LENGTH = 5;
export const PASSWORD_MIN_LENGTH = 10;
export const PASSWORD_REGEX = new RegExp(/^(?=.*\d).{10,}$/);

export const PASSWORD_REGEX_ERROR =
  "Passwords should contain at least one number(123456789).";

export const PASSWORD_MIN_ERROR =
  "Password should be at least 10 charactors long";

export const USERNAME_MIN_ERROR =
  "Username should be at least 5 charactors long";

export const EMAIL_ZOD_ERROR = "Only @zod.com emails are allowed.";
