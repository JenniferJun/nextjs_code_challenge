import { z } from "zod";

export const USERNAME_MIN_LENGTH = 5;
export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);

export const PASSWORD_REGEX_ERROR =
  "Passwords must contain at least one UPPERCASE, lowercase, number and special characters #?!@$%^&*-";

export const PASSWORD_MIN_ERROR =
  "Password should be at least 10 charactors long";

export const USERNAME_MIN_ERROR =
  "Username should be at least 5 charactors long";

export const EMAIL_ZOD_ERROR = "Only @zod.com emails are allowed.";
