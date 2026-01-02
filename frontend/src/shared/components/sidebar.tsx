"use client"

import React, {
    useContext,
    ReactNode,
    useState,
    ComponentType,
    SVGProps,
    FC,
} from 'react';
import { cn } from '../lib/utils';
import Link from 'next/link';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';

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

export function Sidebar({ children  , className}: { children?: ReactNode , className?: string}) {
    const { isSidebarOpen, toggleSidebar } = useSidebar();

    return (
        <>
            <aside className={cn(
                "w-64 h-dvh border-r z-20 overflow-y-auto transition-transform fixed left-0 right-0 bg-background lg:hidden",
                "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full",
                className
            )}>
                {children}
            </aside>

            {isSidebarOpen && <div onClick={toggleSidebar} className="fixed top-0 left-0 w-full h-screen bg-foreground/10 z-10 lg:hidden" />}

            <aside className={cn(
                "w-64 h-dvh border-r shrink-0 overflow-y-auto hidden lg:block",
                "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
                className
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


// -------------------- Section --------------------
type SidebarSectionProps = {
    sectionTitle: string;
    options: { name: string; path: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }[];
};

export const SidebarSection: FC<SidebarSectionProps> = ({ sectionTitle, options }) => {

    const { toggleSidebar } = useSidebar();
    const pathname = usePathname()

    return (
        <div className="flex flex-col gap-4">
            {sectionTitle && <div className="font-semibold">{sectionTitle}</div>}
            <div className="ml-5 flex gap-1 flex-col">
                {options.map(({ path, Icon, name }) => (
                    <Link key={name} href={path}>
                        <Button
                            onClick={toggleSidebar}
                            variant={pathname === path ? "default" : "ghost"}
                            className="flex gap-2 py-6 w-full justify-start"
                        >
                            <Icon /> {name}
                        </Button>
                    </Link>
                ))}
            </div>
        </div>
    );
}