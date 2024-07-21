"use client"

import React from 'react'
import ActionToolTip from '../action-tooltip';
import { cn } from '@/lib/utils';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';


interface NavigationItemProp {
  id: string;
  name: string;
  imageUrl: string;
}

const NavigationItem = ({ id, name, imageUrl }: NavigationItemProp) => {

  const params = useParams()
  const router = useRouter();


  const onClick = () => {
    router.push(`/servers/${id}`)

  }
  return (
    <div>
      <ActionToolTip label={name} align='center' side='right'>
        <button onClick={onClick} className={cn("relative group flex items-center")}>
          <div className={cn("absolute left-0 bg-primary rounded-r-full transition-all w-[4px]", params?.serverId !== id && "group-hover:h-[20px]", params?.serverId === id ? "group-hover:h-[36px]" : "group-hover:h-[8px]")} />
          <div className={cn("relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:hover:rounded-[16px] transition-all overflow-hidden", params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]")}>
            <Image src={imageUrl} fill alt='channelServer' />
          </div>
        </button>
      </ActionToolTip>
    </div>
  )
}

export default NavigationItem