"use client";

import { BadgeEuro } from "lucide-react";
import { useSocket } from "./providers/socket-provider";
import { Badge } from "./ui/badge";

export const SocketIndicator = () => {
    const { isConnected } = useSocket();

    if (!isConnected) {
        return (
            <Badge variant={"outline"} className="bg-yellow-600 text-white border-none">
                Fallback: polling every is
            </Badge>
        )
    }
    <Badge variant={"outline"} className="bg-emerald-600 text-white border-none">
        LiveL real-time
    </Badge>

}