import { currentProfilePage } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
// import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/type";
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo,) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" })
    }
    try {
        const profile = await currentProfilePage(req);
        const { content, fileUrl } = req.body;
        const { serverId, channel} = req.query;

        if (!profile) {
            return res.status(401).json({ error: "unauthorized" });
        }
        if (!serverId) {
            return res.status(401).json({ error: "Server Id Missing" });
        }
        if (!content) {
            return res.status(401).json({ error: "content Is missing" });
        }

        const server = await db.server.findFirst({
            where: {
                id: serverId as string,
                members: {
                    some: {
                        profileId: profile.id
                    }
                }
            },
            include: {
                members: true
            }
        });

        console.log("Server details", server)

        if (!server) {
            return res.status(404).json({ message: "Server not found" })
        }


        const channelId = await db.channel.findFirst({
            where: {
                id: channel as string,
                serverId: serverId as string
            }
        })



        if (!channelId) {
            return res.status(404).json({ message: "Channel  not found" });
        }

        const member = server.members.find((member) => member.profileId === profile.id);

        if (!member) {
            return res.status(404).json({ message: "Member  not found" });
        }

        const message = await db.message.create({
            data: {
                content: content ?? "",
                fileUrl: fileUrl ?? "",
                channelId: channel as string,
                memberId: member.id
            },
            include: {
                member: {
                    include: {
                        profile: true
                    }
                }
            }
        })

        console.log("message", message)

        const channelKey = `chat:${channelId}:messages`;

        res?.socket?.server?.io?.emit(channelKey, message);
        return res.status(200).json(message);

    } catch (error) {
        console.log("error while sending message", error);
        return res.status(500).json({ message: "Internal Error", error });
    }
}