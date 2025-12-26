"use client"

import React, {
    useContext,
    ReactNode,
    useState,
} from 'react';
import { cn } from '../lib/utils';
import { useSmallScreen } from '../hooks/use-small-screen';

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
    const { isSmallScreen } = useSmallScreen();

    if (isSmallScreen) return (
        <>
            <div className={cn(
                'fixed w-65 z-20 bg-background transition-all duration-300 overflow-y-auto top-0 left-0 h-screen',
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {children}
            </div>

            {/* overlya */}
            <div onClick={toggleSidebar}
                className={cn(
                    'fixed w-full bg-foreground/10 backdrop-blur-sm transition-all duration-300 overflow-y-auto top-0 left-0 h-screen',
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )} />
        </>
    )

    return (
        <aside className="z-30 overflow-y-auto h-screen w-75 shrink-0 border-r hidden lg:block bg-white ease-in-out">
            {children}
        </aside>
    )
}


// 6. Sidebar component
export function SidebarInset({ children }: { children?: ReactNode }) {

    return (
        <main className="h-screen overflow-y-auto duration-300 ease-in-out">
            {children}
        </main>
    )
}

