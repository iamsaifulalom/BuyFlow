"use client";

import React, { useEffect } from "react";
import {
    Sidebar,
    SidebarInset,
    SidebarProvider,
} from "@/shared/components/sidebar";
import { useRequireAuth } from "@/shared/providers/auth-provider";
import { Spinner } from "@/shared/ui/spinner";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { loading, user } = useRequireAuth("ADMIN")

    // prevent UI flash
    if (loading || !user || user.role !== "ADMIN") {
        return <Spinner className="size-10 text-center w-full mt-10" />;
    }

    return (
        <SidebarProvider>
            <Sidebar>sidebar</Sidebar>
            <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
    );
}
