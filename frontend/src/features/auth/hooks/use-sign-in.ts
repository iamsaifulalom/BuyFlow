"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { SignInBody, signInSchema } from "../schema/auth.schema";
import { isAxiosError } from "axios";
import { useAuth } from "@/shared/providers/auth-provider";

export function useSignIn() {

    const { signInUser } = useAuth()

    const form = useForm<SignInBody>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "hello@saifulalom.com",
            password: "saifulalom2",
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    async function handleSubmit(data: SignInBody) {
        setIsLoading(true);
        setServerError(null);

        try {
            setIsLoading(true)
            await signInUser(data);
        } catch (err) {
            let errMessage = "Something went wrong!";

            if (isAxiosError(err)) {
                errMessage = err.response?.data?.message || errMessage;
            }

            toast.error(errMessage)
        } finally {
            setIsLoading(false)
        }
    }

    return { form, handleSubmit, isLoading, serverError };
}