"use client"

import React, {
    useContext,
    ReactNode,
    useState
} from 'react';

// 1. Define the context type
interface SidebarProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (state: boolean) => void;
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

// 4. Provider component
export function SidebarProvider({ children }: { children?: ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    return (
        <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }} >
            <div className='flex'>
                {children}
            </div>
        </SidebarContext.Provider>
    );
}

// 5. Sidebar component
export function Sidebar({ children }: { children?: ReactNode }) {
    const { isSidebarOpen } = useSidebar()
    return (
        <>
            {isSidebarOpen && <div className='w-[320px] h-screen overflow-y-auto'>{children} </div>}
        </>
    );
}

// 6. Sidebar component
export function SidebarInset({ children }: { children?: ReactNode }) {

    return (
        <div className='flex-1 h-screen overflow-hidden overflow-y-auto'>
            {children}
        </div>
    );
}
