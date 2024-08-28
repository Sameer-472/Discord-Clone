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
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
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
import { useParams, useRouter } from 'next/navigation'
import { useModal } from '@/hooks/use-modal-store'
import dynamic from 'next/dynamic'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ChannelType } from '@prisma/client'

import qs from "query-string"

const FileUpload = dynamic(() => import('../file-upload'), {
    ssr: true,
    loading: () => <div>Loading file upload component...</div>
});


const formSchema = z.object({
    name: z.string().min(1, {
        message: "Channel name is required"
    }).refine(name => name !== "general", {
        message: "Channel Name cann not be general"
    }),
    type: z.nativeEnum(ChannelType)
})



const CreateChannelModal = () => {

    const { isOpen, onClose, type } = useModal();

    const isModalOpen = isOpen && type === "createChannel";



    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);




    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: ""
        }
    })


    const isLoading = form.formState.isLoading;

    const router = useRouter()
    const params = useParams();

    const onSubmit = async (value: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
               url: "/api/channels",
               query: {
                serverId: params?.serverId
               } 
            })
            await axios.post(url, value)
            form.reset()
            router.refresh()
            onClose()
        } catch (error) {
            console.log(error)
        }
    }

    const handleClose = () => {
        form.reset()
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
                        <DialogHeader className='pt-8 px-6'>
                            <DialogTitle className='text-2xl text-center font-bold'>Create Channel</DialogTitle>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Channel Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input disabled={isLoading}
                                                    className='bg-zinc-300/50 border-0 text-black focus-visible:ring-0 focus-visible:ring-offset-0'
                                                    placeholder='Enter your channel name '
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='type'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Channel Type</FormLabel>
                                            <Select disabled={isLoading} onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger
                                                        className='bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none'
                                                    >
                                                        <SelectValue placeholder="Select a channel Type" />
                                                        <SelectContent>
                                                            {Object.values(ChannelType).map((type)=>(
                                                                <SelectItem key={type} className='capitalize' value={type}>
                                                                    {type.toLowerCase()}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </SelectTrigger>
                                                </FormControl>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                                <DialogFooter>
                                    <Button variant={'primary'} type="submit">
                                        Create
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}

export default CreateChannelModal