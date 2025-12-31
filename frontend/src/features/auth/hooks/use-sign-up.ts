"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { SignUpBody , signUpSchema } from "../schema/auth.schema";
import { signUp } from "../api/auth";

export function useSignUp() {
    const form = useForm<SignUpBody>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            name: "",
            password: "",
            termsAccepted: false
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    async function handleSubmit(data: SignUpBody) {
        setIsLoading(true);
        setServerError(null);

        try {
            setIsLoading(true)
            const res = await signUp(data)
            toast.success(res.message)
        } catch (err: any) {
            const errMessage = err?.response?.data?.message || "Something went wrong!";
            toast.error(errMessage);
        } finally {
            setIsLoading(false)
        }
    }

    return { form, handleSubmit, isLoading, serverError };
}