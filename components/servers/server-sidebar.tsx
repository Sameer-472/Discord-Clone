import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { channel } from "diagnostics_channel";
import { redirect } from "next/navigation";
import { ServerHeader } from "./server-header";
import { ScrollArea } from "../ui/scroll-area";
import { ServerSearch } from "./server-search";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { Separator } from "../ui/separator";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-members";

interface serverSideBarProps {
    serverId: string;
}


const iconMap = {
    [ChannelType.Text]: <Hash className="w-4 h-4 mr-2" />,
    [ChannelType.AUDIO]: <Mic className="w-4 h-4 mr-2" />,
    [ChannelType.VIDEO]: <Video className="w-4 h-4 mr-2" />
}

const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 mr-2" />,
    [MemberRole.ADMIN]: <ShieldAlert className="h-r w-4 mr-2" />
}

export const ServerSideBar = async ({ serverId }: serverSideBarProps) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirect("/")
    }

    const server = await db.server.findUnique({
        where: {
            id: serverId
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: "asc"
                }
            },
            members: {
                include: {
                    profile: true
                },
                orderBy: {
                    role: "asc"
                }
            }
        }
    })

    const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.Text)
    const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO)
    const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO)
    const members = server?.members.filter((member) => member.profileId === profile.id)

    const role = server?.members.find((member) => member.profileId === profile.id)?.role;

    if (!server) {
        return redirect("/");
    }

    return (
        <>
            <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
                <ServerHeader server={server} role={role} />
                <ScrollArea className="flex-1 px-3">
                    <div className="mt-2">
                        <ServerSearch data={[
                            {
                                label: "Text Channel", type: "channel", data: textChannels?.map((channel) => ({
                                    id: channel.id,
                                    name: channel.name,
                                    icon: iconMap[channel.type]
                                }))
                            },
                            {
                                label: "Voice Channel", type: "channel", data: audioChannels?.map((channel) => ({
                                    id: channel.id,
                                    name: channel.name,
                                    icon: iconMap[channel.type]
                                }))
                            },
                            {
                                label: "Video Channels", type: "channel", data: videoChannels?.map((channel) => ({
                                    id: channel.id,
                                    name: channel.name,
                                    icon: iconMap[channel.type]
                                }))
                            },
                            {
                                label: "Members", type: "member", data: members?.map((member) => ({
                                    id: member.id,
                                    name: member.profile.name,
                                    icon: roleIconMap[member.role]
                                }))
                            },

                        ]} />
                    </div>
                    <Separator className="my-2 bg-zinc-100 dark:bg-zinc-700 rounded-md" />
                    {!!textChannels?.length && (
                        <div className="mb-2">
                            <ServerSection sectionType="channels" channelType={ChannelType.Text}
                                role={role} label="Text Channels" />
                            {textChannels?.map((channel) => (
                                <ServerChannel channel={channel} key={channel.id} role={role} server={server} />
                            ))}
                        </div>
                    )}
                    {!!audioChannels?.length && (
                        <div className="mb-2">
                            <ServerSection sectionType="channels" channelType={ChannelType.AUDIO}
                                role={role} label="Voice Channels" />
                            {audioChannels?.map((channel) => (
                                <ServerChannel channel={channel} key={channel.id} role={role} server={server} />
                            ))}
                        </div>
                    )}
                    {!!members?.length && (
                        <div className="mb-2">
                            <ServerSection sectionType="members"
                                role={role} label="Members" server={server} />
                            {members?.map((member) => (
                                <ServerMember key={member.id} member={member} server={server} />
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </div>
        </>
    )
}