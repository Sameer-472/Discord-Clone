import { ServerwithMemberWithProfiles } from "@/type"
import { MemberRole } from "@prisma/client"

interface ServerHeaderProps {
    server: ServerwithMemberWithProfiles,
    role?: MemberRole
}

export const ServerHeader=({server , role }: ServerHeaderProps)=>{
    return (
        <>
            {server.channel}
        </>
    )
}