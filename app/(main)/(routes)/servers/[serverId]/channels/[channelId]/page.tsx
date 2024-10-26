import ChatHeader from '@/components/chats/chat-header';
import { ChatInput } from '@/components/chats/chat-input';
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
        <div className='bg-white dark:bg-[#313338] flex flex-col h-[100vh]'>
            <ChatHeader name={channel.name} serverId={channel.serverId} type='channel' />
            <div className='flex-1'>Future Messages</div>
            <ChatInput name={channel.name} type="channel" apiUrl='/api/socket/messages' query={{channel: channel.id , serverId: channel.serverId }}/>
        </div>
    )
}

export default Page