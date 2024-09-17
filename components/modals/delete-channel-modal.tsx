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

import { useParams, useRouter } from 'next/navigation'
import { useModal } from '@/hooks/use-modal-store'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import axios from 'axios'
// import queryString from 'query-string'
import qs from "query-string";

const DeleteChannel = () => {

    const { isOpen, onClose, type, data, onOpen } = useModal();

    const isModalOpen = isOpen && type === "deleteChannel";

    const [isMounted, setIsMounted] = useState(false);

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsMounted(true);
    }, []);



    const router = useRouter()

    const { server , channel} = data;

    const handleClose = () => {
        onClose()
    }

    if (!isMounted) {
        return null
    }

    const onClick = async () => {
        setIsLoading(true);
        try {
            const url = qs.stringifyUrl({
                url: `/api/channels/${channel?.id}` , 
                query: {
                    serverId: server?.id
                }
            })
            await axios.delete(url);
            router.refresh();
            router.push(`/servers/${server?.id}`);
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
                            <DialogTitle className='text-2xl text-center font-bold'>Delete Channel</DialogTitle>
                            <DialogDescription className='text-center text-zinc-500'>
                                <Label>Are your sure you want to delete <span className='text-indigo-500'>{channel?.name}</span></Label>will be permenetly delete.
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

export default DeleteChannel