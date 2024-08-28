"use client"
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { useRouter } from 'next/navigation'
import { useModal } from '@/hooks/use-modal-store'
import axios from 'axios'
import { ServerwithMemberWithProfiles } from '@/type'
import { ScrollArea } from '../ui/scroll-area'
import { UserAvatar } from '../user-avatar'
import { ShieldCheck, ShieldAlert, MoreVertical, ShieldQuestion, Shield, Check, Gavel, Loader2 } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSubContent, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { MemberRole } from '@prisma/client'
import qs from "query-string";

const roleIconMap = {
    "GUEST": null,
    "MODERATOR": <ShieldCheck className='h-4 w-4 ml-2 text-indigo-500' />,
    "ADMIN": <ShieldCheck className='h-4 w-4 ml-2 text-rose-500' />
}


const MembersModal = () => {

    const { isOpen, onClose, type, data, onOpen } = useModal();

    const [loadingId, setLoadingId] = useState("")

    const isModalOpen = isOpen && type === "members";

    const [isMounted, setIsMounted] = useState(false);

    const { server } = data as { server: ServerwithMemberWithProfiles };


    useEffect(() => {
        setIsMounted(true);
    }, []);


    const router = useRouter()

    const handleClose = () => {
        onClose()
    }

    if (!isMounted) {
        return null
    }

    const onKick = async (memberId: string, role: MemberRole) => {
        try {
            setLoadingId(memberId);
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server?.id,
                    // memberId
                }
            })

            const response = await axios.delete(url);
            router.refresh();
            onOpen("members", { server: response.data });

        } catch (error) {
            console.log("error", error)
        } finally {
            setLoadingId("")
        }
    }
    const onRoleChange = async (memberId: string, role: MemberRole) => {
        try {
            setLoadingId(memberId);
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server?.id,
                    // memberId
                }
            })

            const response = await axios.patch(url, { role });
            router.refresh();
            onOpen("members", { server: response.data });

        } catch (error) {
            console.log("error", error)
        } finally {
            setLoadingId("")
        }
    }

    return (
        <>
            {isMounted && (
                <Dialog open={isModalOpen} onOpenChange={handleClose}>
                    <DialogContent className="bg-white dark:bg-#1E1F22  text-black overflow-hidden">
                        <DialogHeader className='px-6'>
                            <DialogTitle className='text-2xl text-center font-bold'>Members</DialogTitle>
                            <DialogDescription className='text-center text-zinc-500'>
                                {/* {server?.} */}
                            </DialogDescription>
                        </DialogHeader>
                        <ScrollArea className='mt-8 max-h-[420px] pr-6'>
                            {server?.members.map((member) => (
                                <>
                                    <div className='flex items-center gap-x-2 mb-6' key={member?.id}>
                                        <UserAvatar src={member?.profile?.imageUrl} />
                                        <div className='text-xs font-semibold flex items-center gape-x-1'>
                                            {member.profile.name}
                                            {roleIconMap[member.role]}
                                        </div>
                                        <p className='text-xs text-zinc-500'>
                                            {member.profile.email}
                                        </p>
                                        {server.profileId !== member.profileId && loadingId !== member.id && (
                                            <div className='ml-auto'>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger>
                                                        <MoreVertical className='h-4 w-4 text-zinc-500' />
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent side='left'>
                                                        <DropdownMenuSub>
                                                            <DropdownMenuSubTrigger className='flex items-center'>
                                                                <ShieldQuestion className='w-4 h-4 mr-2' />
                                                                <span>Role</span>
                                                            </DropdownMenuSubTrigger>
                                                            <DropdownMenuPortal>
                                                                <DropdownMenuSubContent>
                                                                    <DropdownMenuItem onClick={() => onRoleChange(member.id, "GUEST")}>
                                                                        <Shield className='w-4 h-4 mr-2' />
                                                                        Guest
                                                                        {member.role === "GUEST" && (
                                                                            <Check className='h-4 w-4 ml-auto' />
                                                                        )}
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem onClick={() => onRoleChange(member.id, "MODERATOR")}>
                                                                        <ShieldCheck className='w-4 h-4 mr-2' />
                                                                        Moderator
                                                                        {member.role === "MODERATOR" && (
                                                                            <Check className='h-4 w-4 ml-auto' />
                                                                        )}
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuSubContent>
                                                            </DropdownMenuPortal>
                                                        </DropdownMenuSub>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem onClick={()=> onKick(member.id , "GUEST")}>
                                                            <Gavel className='h-4 w-4 mr-2' />
                                                            Kick
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        )}
                                        {loadingId === member.id && (
                                            <Loader2 className='animate-spin text-zinc-500 ml-auto w-4 h-4' />
                                        )}
                                    </div>
                                </>
                            ))}
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}

export default MembersModal