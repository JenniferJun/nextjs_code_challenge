import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
  username?: string;
}

export default function getSession() {
  const cookieOptions = {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7, // 1 week
  };
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "excellent_jenyj",
    password: process.env.COOKIE_PASSWORD!,
    cookieOptions,
  });
}
