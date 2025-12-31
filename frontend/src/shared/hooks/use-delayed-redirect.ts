"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useDelayedRedirect() {
    const [redirectOptions, setRedirectOptions] = useState<{ path: string; delay: number } | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!redirectOptions) return;

        const timer = setTimeout(() => {
            router.push(redirectOptions.path);
        }, redirectOptions.delay);

        return () => clearTimeout(timer);
    }, [redirectOptions, router]);

    const triggerRedirect = ( path: string, delay = 3000) => {
        setRedirectOptions({ path, delay });
    };

    return { triggerRedirect };
}