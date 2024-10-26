// import { auth } from "@clerk/nextjs/server";
import { getAuth } from "@clerk/nextjs/server";
import { db } from "./db";
import { NextApiRequest } from "next";


export const currentProfile = async(req: NextApiRequest) => {

    const { userId } = getAuth(req);
    if (!userId) {
        return null
    }

    const profileId = db.profile.findUnique({
        where: {
            userId
        }
    })

    return profileId
}