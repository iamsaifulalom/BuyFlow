import { useSidebar } from './sidebar'
import { BellIcon, MenuIcon, UserCircleIcon } from 'lucide-react'
import Search from '../ui/search'
import { useState } from 'react';

export default function AdminHeader() {
    const { toggleSidebar } = useSidebar();
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <header className='w-full sticky gap-3 px-4 top-0 left-0 bg-background z-10 flex border-b items-center justify-between h-16' >
            <div className='flex flex-1 items-center gap-2 max-w-sm'>
                <MenuIcon size={24} className='cursor-pointer lg:hidden' onClick={toggleSidebar} />
                <Search
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder='Search ...'
                    onKeyDown={(e) => {
                        console.log(e.key)
                        if (e.key === "Enter") alert(`Your are lopking for "${searchTerm}"`)
                    }}
                />
            </div>

            <div className='flex items-center gap-3 text-muted-foreground justify-end'>
                <BellIcon size={24} />
                <UserCircleIcon size={24} />
            </div>

        </header>

    )
}
