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
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import axios from 'axios'


const LeaveModal = () => {

    const { isOpen, onClose, type, data, onOpen } = useModal();

    const isModalOpen = isOpen && type === "leaveServer";

    const [isMounted, setIsMounted] = useState(false);

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsMounted(true);
    }, []);



    const router = useRouter()

    const { server } = data;

    const handleClose = () => {
        onClose()
    }

    if (!isMounted) {
        return null
    }

    const onClick = async () => {
        setIsLoading(true);
        try {
            await axios.patch(`/api/servers/${server?.id}/leave`);
            router.refresh();
            router.push("/");
        } catch (error) {
            console.log("error", error)
        } finally {
            setIsLoading(false)
            handleClose()
        }
    }


    return (
        <>
            {isMounted && (
                <Dialog open={isModalOpen} onOpenChange={handleClose}>
                    <DialogContent className="bg-white dark:bg-#1E1F22  text-black overflow-hidden">
                        <DialogHeader className='px-6'>
                            <DialogTitle className='text-2xl text-center font-bold'>Leave Server</DialogTitle>
                            <DialogDescription className='text-center text-zinc-500'>
                                <Label>Are your sure you want to leave <span className='text-indigo-500'>Edit Server</span></Label>
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className='bg-gray-100 px-6 py-4'>
                            <div className='flex items-center justify-between w-full'>
                                <Button variant={'ghost'} disabled={isLoading} onClick={() => {onClose()}}>
                                    Cancel
                                </Button>
                                <Button variant={'primary'} disabled={isLoading} onClick={() => {onClick()}}>
                                    Confirm
                                </Button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}

export default LeaveModal