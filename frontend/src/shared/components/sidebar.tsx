"use client"

import React, {
    useContext,
    ReactNode,
    useState,
} from 'react';
import { cn } from '../lib/utils';

// 1. Define the context type
interface SidebarProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

// 2. Create context
const SidebarContext = React.createContext<SidebarProps | undefined>(undefined);

// 3. Custom hook to use the sidebar context
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
        <SidebarContext.Provider
            value={{
                isSidebarOpen,
                toggleSidebar: () => setIsSidebarOpen(p => !p),
            }}
        >
            <div className="relative flex h-screen overflow-hidden">
                {children}
            </div>
        </SidebarContext.Provider>
    )
}


// 5. Sidebar component

export function Sidebar({ children }: { children?: ReactNode }) {
    const { isSidebarOpen, toggleSidebar } = useSidebar();

    return (
        <>
            {/* Sidebar container */}
            <aside
                className={cn(
                    "fixed top-0 left-0 h-screen w-65 z-20 bg-background transition-transform duration-300 overflow-y-auto",
                    "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
                    "lg:static lg:translate-x-0 lg:w-75 shrink-0 lg:border-r lg:block",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {children}
            </aside>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed top-0 left-0 w-full h-screen bg-foreground/10 z-10 lg:hidden"
                />
            )}
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

