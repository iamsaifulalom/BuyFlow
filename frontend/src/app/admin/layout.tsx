"use client";

import {
    Sidebar,
    SidebarInset,
    SidebarProvider,
    SidebarSection,
} from "@/shared/components/sidebar";
import { adminMenu } from "@/shared/constants/admin-sidebar";
import { useRequireAuth } from "@/shared/providers/auth-provider";
import { Spinner } from "@/shared/ui/spinner";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { loading } = useRequireAuth("ADMIN")

    if (loading) {
        return <Spinner className="size-10 text-center w-full mt-10" />;
    }

    return (
        <SidebarProvider>
            <Sidebar className="px-4">
                {adminMenu.map(menu => (
                    <SidebarSection
                        key={menu.sectionTitle}
                        {...menu}
                    />
                ))}
            </Sidebar>
            <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
    );
}
