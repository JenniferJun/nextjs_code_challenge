import { notFound, redirect } from "next/navigation";
import db from "@/lib/db";
import EditProfileForm from "./EditProfileForm";
import getSession from "@/lib/session";

interface EditProfilePageProps {
    params: {
        username: string;
    };
}

async function getUserProfile(username: string) {
    const user = await db.user.findUnique({
        where: {
            username,
        },
        select: {
            id: true,
            username: true,
            email: true,
            bio: true,
        },
    });

    if (!user) {
        notFound();
    }

    return user;
}

export default async function EditProfilePage({ params }: EditProfilePageProps) {
    const user = await getUserProfile(params.username);
    const session = await getSession();

    if (session.id !== user.id) {
        redirect(`/users/${user.username}`);
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
            <EditProfileForm user={user} />
        </div>
    );
} 