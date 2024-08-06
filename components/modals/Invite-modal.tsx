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
import { Copy, RefreshCcw } from 'lucide-react'


const FileUpload = dynamic(() => import('../file-upload'), {
    ssr: true,
    loading: () => <div>Loading file upload component...</div>
});






const InviteModal = () => {

    const { isOpen, onClose, type } = useModal();

    const isModalOpen = isOpen && type === "invite";



    const [isMounted, setIsMounted] = useState(false);

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
                            <Input className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0' value={"invite-link"} />
                            <Button size={'icon'}>
                                <Copy />
                            </Button>
                        </div>
                        <Button variant={"link"} size={"sm"} className='text-xs text-zinc-500 mt-4'>
                                Generate a new link
                                <RefreshCcw className='w-4 h-4 mr-2'/>
                        </Button>
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}

export default InviteModal