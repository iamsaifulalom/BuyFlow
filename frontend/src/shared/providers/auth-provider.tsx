"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import ShopAPI from "../api/axios-instance";
import { SignInBody } from "@/features/auth/schema/auth.schema";
import { signIn } from "@/features/auth/api/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";

export type User = {
    id: string;
    email: string;
    name: string;
    role: "ADMIN" | "USER";
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    logout: () => void;
    signInUser: (data: SignInBody) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Fetch user on mount
    useEffect(() => {
        const fetchMe = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await ShopAPI.get("/auth/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(res.data.data);
            } catch (err) {
                console.log(err);
                localStorage.removeItem("accessToken");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchMe();
    }, []);

    const signInUser = async (data: SignInBody) => {
        try {
            const result = await signIn(data);
            const token = result.data.accessToken;
            localStorage.setItem("accessToken", token);

            const res = await ShopAPI.get("/auth/me", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(res.data.data);
            toast.success(result.message);
            router.push(res.data.data.role === "ADMIN" ? "/admin/dashboard" : "/dashboard");
        } catch (err) {
            console.log(err);
            if (isAxiosError(err)) {
                toast.error(err?.response?.data?.message || "Login failed");
            }
        }
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        setUser(null);
        router.push("/sign-in");
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout, signInUser }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be inside AuthProvider");
    return ctx;
}

// Route guard
export const useRequireAuth = (role?: "ADMIN" | "USER") => {
    const { user, loading } = useAuth();
    const router = useRouter();

    // Only redirect after loading completes
    useEffect(() => {
        if (loading) return;

        if (!user) {
            router.push("/sign-in");
        } else if (role && user.role !== role) {
            router.push("/unauthorized");
        }
    }, [user, loading, router, role]);

    return { user, loading };
};
