"use client"

import React, {
    useContext,
    ReactNode,
    useState,
} from 'react';
import { cn } from '../lib/utils';

//  Define the context type
interface SidebarProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

//  Create context
const SidebarContext = React.createContext<SidebarProps | undefined>(undefined);

// Custom hook to use the sidebar context
export function useSidebar() {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
}

export function SidebarProvider({ children }: { children?: ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar: () => setIsSidebarOpen(p => !p) }} >
            <div className="relative flex h-dvh overflow-hidden">
                {children}
            </div>
        </SidebarContext.Provider>
    )
}


// Sidebar component

export function Sidebar({ children }: { children?: ReactNode }) {
    const { isSidebarOpen, toggleSidebar } = useSidebar();

    return (
        <>
            <aside className={cn(
                "w-64 h-dvh border-r z-20 overflow-y-auto transition-transform fixed left-0 right-0 bg-background lg:hidden",
                "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {children}
            </aside>

            {isSidebarOpen && <div onClick={toggleSidebar} className="fixed top-0 left-0 w-full h-screen bg-foreground/10 z-10 lg:hidden" />}

            <aside className={cn(
                "w-64 h-dvh border-r shrink-0 overflow-y-auto hidden lg:block",
                "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
            )}>
                {children}
            </aside>
        </>
    );
}


// 6. Sidebar component
export function SidebarInset({ children }: { children?: ReactNode }) {

    return (
        <main className="h-screen overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden duration-300 ease-in-out">
            {children}
        </main>
    )
}

