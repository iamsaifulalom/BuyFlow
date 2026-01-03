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
import Image from 'next/image';
import { date } from 'zod';

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

export function Sidebar({ children, className }: { children?: ReactNode, className?: string }) {
    const { isSidebarOpen, toggleSidebar } = useSidebar();

    return (
        <>
            <aside className={cn(
                "w-64 h-dvh border-r z-20 overflow-y-auto transition-transform fixed flex flex-col left-0 right-0 bg-background lg:hidden",
                "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full",
                className
            )}>
                {children}
            </aside>

            {isSidebarOpen && <div onClick={toggleSidebar} className="fixed top-0 left-0 w-full h-screen bg-foreground/10 z-10 lg:hidden" />}

            <aside className={cn(
                "w-64 h-dvh border-r shrink-0  hidden lg:flex flex-col justify-between",
                className
            )}>
                {children}
            </aside>
        </>
    );
}


// 6. Sidebar inset
export function SidebarInset({ children }: { children?: ReactNode }) {
    return (
        <main className="h-screen overflow-y-auto flex-col flex-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden duration-300 ease-in-out">
            {children}
        </main>
    )
}
// 6. Sidebar footer
export function SidebarFooter() {

    return (
        <div className="w-full">
            <div className='p-6'>
                there sis nowd
            </div>
            <p className='text-center text-muted-foreground border-t py-4 text-sm'>
                © {new Date().getFullYear()} 3legent. Inc.
            </p>
        </div>
    )
}
export function SidebarHeader() {
    return (
        <Link href="/" className="px-6 flex items-center h-16 border-b">
            <Image src="/images/logo.png" alt='site-logo' width={100} height={50} />
        </Link>
    )
}

// -------------------- Sidebar Section --------------------
type SidebarSection = {
    title: string;
    items: {
        label: string;
        href: string;
        Icon: ComponentType<SVGProps<SVGSVGElement>>;
    }[];
};

export function SidebarContent({ sections }: { sections: SidebarSection[] }) {
    const { toggleSidebar } = useSidebar();
    const pathname = usePathname();

    return (
        <div className={cn(
            "overflow-y-auto flex-1",
            "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        )}>
            {sections.map(({ title, items }, index) => (
                <div key={title} className={cn("mt-5 text-muted-foreground flex flex-col px-6 pb-3", sections.length - 1 !== index && "border-b")}>
                    {title && (
                        <div className="ml-4 text-sm">
                            {title.toUpperCase()}
                        </div>
                    )}

                    <div className="flex flex-col gap-1">
                        {items.map(({ href, Icon, label }) => (
                            <Link key={label} href={href}>
                                <Button
                                    onClick={toggleSidebar}
                                    variant="ghost"
                                    className={cn(
                                        "flex w-full justify-start gap-2 py-6",
                                        href === pathname && "bg-accent text-accent-foreground dark:bg-accent/50"
                                    )}
                                >
                                    <Icon />
                                    {label}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

