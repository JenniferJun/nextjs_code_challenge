import db from "@/lib/db";
import { redirect } from "next/navigation";

export async function getTweetById(id: string) {
  try {
    const tweet = await db.tweet.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!tweet) {
      redirect("/");
    }

    return tweet;
  } catch (error) {
    console.error("Error fetching tweet:", error);
    redirect("/");
  }
}
