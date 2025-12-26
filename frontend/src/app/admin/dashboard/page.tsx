"use client"
import { useSidebar } from '@/shared/components/sidebar'
import { MenuIcon } from 'lucide-react'

export default function AdminDashboard() {
  const { toggleSidebar } = useSidebar()
  return (
    <div className='items-center gap-10' >
      <MenuIcon className='lg:hidden' onClick={toggleSidebar} /> <br />

    </div>
  )
}
