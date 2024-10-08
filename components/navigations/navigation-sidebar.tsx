import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import React from 'react'
import NavigationAction from './navigation-action';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import NavigationItem from './navigation-item';
import { ModeToggle } from '../mode-toggle';
import { UserButton } from '@clerk/nextjs';

const NavigationSideBar = async () => {
    const profile = await currentProfile();
    if (!profile) {
        return redirect("/")
    }

    const server = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile?.id
                }
            }
        }
    })

    return (
        <div className='h-full flex flex-col items-center space-y-4 w-full dark:bg-[#1E1F22] text-primary bg-[#E3E5E8]'>
            <NavigationAction />
            <Separator className='yh-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto' />
            <ScrollArea className='flex-1 w-full'>
                {server?.map((server, index) => (
                    <div key={server?.id} className='mb-4'>
                        <NavigationItem name={server?.name} imageUrl={server?.imageUrl} id={server?.id} key={index} />
                    </div>
                ))}
            </ScrollArea>
            <div className='pb-3 mt-auto flex items-center flex-col gap-y-4'>
                <ModeToggle />
                <UserButton
                    afterSignOutUrl='/'
                    appearance={{
                        elements: {
                            avatarBox: "h-[48px] w-[48px]"
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default NavigationSideBar