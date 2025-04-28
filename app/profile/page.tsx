
import db from "@/lib/db";
import getSession from "@/lib/session";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";


async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        bio: true,
        created_at: true,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}


export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    console.log("logged out");
    redirect("/");
  };
  if (!user) {
    redirect("/log-in");
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>

        <div className="space-y-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Username</span>
            <span className="text-lg font-medium">{user.username}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Email</span>
            <span className="text-lg font-medium">{user.email}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Member Since</span>
            <span className="text-lg font-medium">
              {new Date(user.created_at).toLocaleDateString()}
            </span>
          </div>
          <form action={logOut} >
            <button className="mt-10 primary-btn  disabled:bg-green-700 disabled:text-green-300 disabled:cursor-not-allowed">Log out</button>
          </form>

          <Link
            href="/"
            className="primary-btn flex items-center justify-center transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </div >
  );
}
