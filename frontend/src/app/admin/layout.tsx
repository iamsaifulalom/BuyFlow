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
                sidebar
            </Sidebar>
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
