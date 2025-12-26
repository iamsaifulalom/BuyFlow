import React from 'react'
import {
    Sidebar,
    SidebarInset,
    SidebarProvider
} from '@/shared/components/sidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <Sidebar>
                Side bar contents
            </Sidebar>
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
