import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { channelId: string } }) {
    try {
        const profile = await currentProfile()
        const { searchParams } = new URL(req.url);
        const serverId = searchParams.get("serverId");

        if (!profile) {
            return new NextResponse("Unathorized", { status: 401 });
        }

        if (!serverId) {
            return new NextResponse("Server id missing", { status: 400 })
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR],
                        }
                    }
                },
            },
            data: {
                channels: {
                    delete: {
                        id: params.channelId,
                        name: {
                            not: "general"
                        }
                    }
                }
            }
        })

        return NextResponse.json(server)
    } catch (error) {
        console.log("channel delete error", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}