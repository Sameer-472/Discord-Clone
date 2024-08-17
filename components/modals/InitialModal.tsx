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
import { useRouter } from 'next/navigation'
import FileUpload from '../file-upload'


const formSchema = z.object({
    name: z.string().min(1, {
        message: "Server name is required"
    }),
    imageUrl: z.string().min(1, {
        message: "Server image is required"
    })
})



const InitialModal = () => {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: "",
        }
    })

    const isLoading = form.formState.isLoading;

    const router = useRouter()

    const onSubmit = async (value: z.infer<typeof formSchema>) => {
        try {
            await axios.post("/api/servers", value)
            // router.refresh()
            form.reset()
            // window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <Dialog open={true}>
                <DialogContent className="bg-white text-black">
                    <DialogHeader className='pt-8 px-6'>
                        <DialogTitle className='text-2xl text-center font-bold'>Customize Your Server</DialogTitle>
                        <DialogDescription className='text-center text-zinc-500'>
                            Give your Server a Personality with a Name and you can customize it later.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div>
                                <div className='flex items-center justify-center text-center'>
                                    <FormField
                                        control={form.control}
                                        name='imageUrl'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <FileUpload
                                                        endpoint="serverImage"
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                </FormControl>
                                            </FormItem>)
                                        }

                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Server Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input disabled={isLoading}
                                                    className='bg-zinc-300/50 border-0 text-black focus-visible:ring-0 focus-visible:ring-offset-0'
                                                    placeholder='Enter Server name '
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>
                            <DialogFooter>
                                <Button variant={'primary'} type="submit">
                                    Create
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default InitialModal