"use client"
import { Plus } from 'lucide-react'
import React from 'react'
import ActionToolTip from '../action-tooltip'

const NavigationAction = () => {
    return (
        // <div >
            <ActionToolTip label={"Add a server"} align='center' side='right'>
                <button className='group flex items-center mt-2'>
                    <div className='flex mx-3 rounded-[24px] h-[48px] group-hover:rounded-[16px] w-[48px] justify-center items-center bg-background dark:bg-neutral-700 '>
                        <Plus className='text-emerald-500 transition group-hover:text-white ' size={25} />
                    </div>
                </button>
            </ActionToolTip>
        // </div>
    )
}

export default NavigationAction