import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  user?: {
    id: number;
    username: string;
    email: string | null;
  };
}

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), {
    cookieName: "auth",
    password: process.env.SESSION_SECRET || "your-secret-key",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });

  return session;
}
