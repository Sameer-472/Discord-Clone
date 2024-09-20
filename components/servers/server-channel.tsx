"use client";

import { cn } from "@/lib/utils";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import ActionToolTip from "../action-tooltip";
import { useModal } from "@/hooks/use-modal-store";


interface ServerChannelProps {
    channel: Channel;
    server: Server;
    role?: MemberRole
}


const iconMap = {
    [ChannelType.Text]: Hash,
    [ChannelType.AUDIO]: Mic,
    [ChannelType.VIDEO]: Video,

}

export const ServerChannel = ({ channel, role, server }: ServerChannelProps) => {
    const params = useParams();
    const router = useRouter();

    const Icon = iconMap[channel.type];

    const { onOpen } = useModal();
    return (
        <button onClick={() => { }} className={cn("group px-2 py-2 rounded-md items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1 flex", params?.channelId == channel?.id && "bg-zinc-700/20 dark:bg-zinc-700")}>
            <Icon className="flex-shrink-0 dark:text-zinc-400 text-zinc-500 w-4 h-4" />
            <p className={cn("line-clamp-1 font-semibold text-xs text-zinc-500 group-hover:text-zinc-500 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition", params.channelId == channel?.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white")}>
                {channel?.name}
            </p>
            {channel?.name !== "general" && role !== MemberRole.GUEST && (
                <div className="ml-auto flex items-center gap-x-2">
                    <ActionToolTip  label={"Edit"} side="top">
                        <Edit onClick={() => onOpen("editChannel", {server ,  channel })} className="w-4 h-4 hidden group-hover:block text-zinc-500 hover:text-zinc-600 dark:text-zonc-400 dark:hover:text-zinc-300 transition" />
                    </ActionToolTip>
                    <ActionToolTip label={"Delete"} side="top">
                        <Trash onClick={() => onOpen("deleteChannel", { server, channel })} className="w-4 h-4 hidden group-hover:block text-zinc-500 hover:text-zinc-600 dark:text-zonc-400 dark:hover:text-zinc-300 transition" />
                    </ActionToolTip>

                </div>
            )}
            {channel?.name == "general" && (
                <Lock className="w-4 h-4 hidden group-hover:block text-zinc-500 hover:text-zinc-600 dark:text-zonc-400 dark:hover:text-zinc-300 transition" />

            )}
        </button>
    )
}