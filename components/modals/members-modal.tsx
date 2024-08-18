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



const MembersModal = () => {

    const { isOpen, onClose, type, data, onOpen } = useModal();

    const isModalOpen = isOpen && type === "members";

    const [isMounted, setIsMounted] = useState(false);

    const { server } = data;


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
                            <DialogTitle className='text-2xl text-center font-bold'>Members</DialogTitle>
                            <DialogDescription className='text-center text-zinc-500'>
                               {/* {server?.} */}
                            </DialogDescription>    
                        </DialogHeader>
                        
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}

export default MembersModal