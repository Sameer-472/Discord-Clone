import ChatHeader from '@/components/chats/chat-header';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { getAuth, redirectToSignIn } from '@clerk/nextjs/server';
import { profile } from 'console';
import { redirect } from 'next/navigation';
import React from 'react'

interface ChannelPageProps {
    params: {
        serverId: string;
        channelId: string;
    }
}

const Page = async ({ params }: ChannelPageProps) => {

    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }
    const channel = await db.channel.findUnique({
        where: {
            id: params.channelId,
        }
    })

    const member = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile.id
        }
    });

    if (!channel || !member) {
        redirect("/");
    }
    return (
        <div className='bg-white dark:bg-[#313338] flex-col h-full'>
            <ChatHeader name={channel.name} serverId={channel.serverId} type='channel' />
        </div>
    )
}

export default Page