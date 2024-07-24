
import NavigationSideBar from '@/components/navigations/navigation-sidebar'
import { ModalProvider } from '@/components/providers/modal-provider'
import React from 'react'

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-full'>
            <div className='md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0'>
                <NavigationSideBar />
            </div>
            <main className='md:pl-[72px] h-full'>
                {children}
            </main>
        </div>
    )
}

export default MainLayout