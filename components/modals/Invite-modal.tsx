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
import dynamic from 'next/dynamic'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Check, Copy, RefreshCcw } from 'lucide-react'
import axios from 'axios'


const FileUpload = dynamic(() => import('../file-upload'), {
    ssr: true,
    loading: () => <div>Loading file upload component...</div>
});


const InviteModal = () => {

    const { isOpen, onClose, type, data, onOpen } = useModal();

    const isModalOpen = isOpen && type === "invite";

    const [isMounted, setIsMounted] = useState(false);

    const { server } = data;

    const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

    const [isCopied, setIsCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsMounted(true);
    }, []);

    setTimeout(() => {
        setIsCopied(false)
    }, 3000);

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl)
        setIsCopied(true)
    }

    const onNew = async () => {
        try {
            setIsLoading(true)
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`)
            onOpen("invite", { server: response?.data })
            setIsLoading(false)
        } catch (error) {
            console.log("error on refreshing invite code", error)
            setIsLoading(false)
        }
    }

    const router = useRouter()

    const handleClose = () => {
        onClose()
    }

    if (!isMounted) {
        return null
    }


    return (
        <>
            {isMounted && (
                <Dialog open={isModalOpen} onOpenChange={handleClose}>
                    <DialogContent className="bg-white dark:bg-#1E1F22  text-black overflow-hidden">
                        <DialogHeader className='px-6'>
                            <DialogTitle className='text-2xl text-center font-bold'>Invite your friends</DialogTitle>
                            {/* <DialogDescription className='text-center text-zinc-500'>
                               <Label>hello</Label>
                            </DialogDescription> */}
                        </DialogHeader>
                        <Label className='text-zinc-500 dark:text-secondary/70'>Server Invite Link</Label>
                        <div className='flex items-center mt-2 gap-x-2'>
                            <Input disabled={isLoading} className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0' value={inviteUrl} />
                            <Button disabled={isLoading} size={'icon'} onClick={onCopy}>
                                {isCopied ? <Check /> : <Copy />}
                            </Button>
                        </div>
                        <Button onClick={onNew} disabled={isLoading} variant={"link"} size={"sm"} className='text-xs text-zinc-500 mt-4'>
                            Generate a new link
                            <RefreshCcw className='w-4 h-4 mr-2' />
                        </Button>
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}

export default InviteModal