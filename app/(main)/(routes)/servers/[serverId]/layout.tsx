import { ServerSideBar } from '@/components/servers/server-sidebar'
import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { auth, redirectToSignIn } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const ServerIdLayout = async ({ children, params }: { children: React.ReactNode; params: { serverId: string } }) => {
    const profile = await currentProfile()

    if (!profile) {
        return auth().redirectToSignIn();
    }

    const server = await db.server.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if (!server) {
        return redirect("/")
    }
    return (
        <div className='h-full'>
            <div className='md:flex h-full w-60 flex-col inset-y-0 z-20 fixed'>
                <ServerSideBar serverId={server.id} />
            </div>
            <div className='h-full md:pl-60'>{children}</div>
        </div>
    )
}

export default ServerIdLayout