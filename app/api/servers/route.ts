import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { profileEnd } from "console";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
    console.log("calling server")
    try {
        const { name, imageUrl } = await req.json();
        console.log("imageUrl", imageUrl)
        const profile = await currentProfile()
        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        const server = await db.server.create({
            data: {
                imageUrl,
                name,
                inviteCode: uuidv4(),
                profileId: profile.id,
                channels: {
                    create: [
                        { name: "general", profileId: profile?.id }
                    ]
                },
                members: {
                    create: [
                        { profileId: profile?.id, role: MemberRole.ADMIN }
                    ]
                }
            }
        })
        console.log("server" , server)
        return  NextResponse.json(server)
    } catch (error) {
        console.log("SERVER POST", error)
        return new NextResponse("Internal Error", { status: 500  })
    }
}