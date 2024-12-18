import { Hash, Menu } from "lucide-react"
import { MobileToggle } from "../mobile-toggle";
import { SocketIndicator } from "../socket-indicator";
import { UserAvatar } from "../user-avatar";

interface ChatHeader {
    serverId: string;
    name: string;
    type: "channel" | "conversation";
    imageUrl?: string
}

const ChatHeader = ({ serverId, name, type, imageUrl }: ChatHeader) => {
    return (
        <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
            <MobileToggle serverId={serverId} />
            {type === "channel" && (
                <Hash className="w-5 h-5 text-zinc-500" />
            )}
            {type === "conversation" && (
                <UserAvatar src={imageUrl} className="w-5 h-5 md:w-8 mr-2" />
            )}
            <p className="font-semibold text-md text-black dark:text-white">{name}</p>
            <div className="ml-auto flex items-center">
                <SocketIndicator/>
            </div>
        </div>
    )
}

export default ChatHeader