import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "./db";


export const InitialProfile = async () => {
    const user = await currentUser();

    if (!user) {
        auth().redirectToSignIn()
    }

    const profile = await db.profile.findUnique({
        where: {
            userId: user?.id
        }
    })

    if (profile) {
        return profile
    }

    else {
        const newProfile = await db.profile.create({
            data: {
                userId: user?.id,
                name: `${user?.firstName} ${user?.lastName}`,
                imageUrl: user?.imageUrl,
                email: user?.emailAddresses[0].emailAddress

            }
        })

        return newProfile
    }
}
