"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button";
import qs from "query-string";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useRouter } from 'next/navigation'
import FileUpload from '../file-upload'
import { useModal } from '@/hooks/use-modal-store'


const formSchema = z.object({
    
    fileUrl: z.string().min(1, {
        message: "attachement is required"
    })
})



const MessageFileModal = () => {

    const {isOpen , onClose , type , data} = useModal();
    
    const {apiUrl , query} = data

    const isModalOpen = isOpen && type === "messageFile";

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileUrl: "",
        }
    })

    const isLoading = form.formState.isLoading;

    const router = useRouter()

    const onSubmit = async (value: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query,
            })

            await axios.post(url , {
                ...value , 
                content: value.fileUrl
            })
            // router.refresh()
            form.reset()
            router.refresh()
            onClose()
            // window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const handleClose = ()=>{
        form.reset();
        onClose()
    }

    return (
        <>
            <Dialog open={isModalOpen} onOpenChange={handleClose}>
                <DialogContent className="bg-white text-black">
                    <DialogHeader className='pt-8 px-6'>
                        <DialogTitle className='text-2xl text-center font-bold'>Add an attachment</DialogTitle>
                        <DialogDescription className='text-center text-zinc-500'>
                            Send a file as a message.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div>
                                <div className='flex items-center justify-center text-center'>
                                    <FormField
                                        control={form.control}
                                        name='fileUrl'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <FileUpload
                                                        endpoint="messageFile"
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                </FormControl>
                                            </FormItem>)
                                        }

                                    />
                                </div>

                            </div>
                            <DialogFooter>
                                <Button variant={'primary'} type="submit">
                                    Send
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default MessageFileModal