"use client"

import Link from 'next/link'
import { Button } from '@/shared/ui/button'
import { Form } from '@/shared/ui/form'
import InputField from '@/shared/ui/input-field'
import { Spinner } from '@/shared/ui/spinner'
import { SignIn } from '@/features/auth/forms/sigin-in'
import { useSignIn } from '@/features/auth/hooks/use-sign-in'

export default function SignInForm() {
    const { form, handleSubmit, isLoading } = useSignIn();

    return (
        <div className='space-y-8'>
            <div className='flex flex-col gap-6'>
                <h1 className='text-3xl font-bold'>Sign In</h1>
                <p className='text-[16px] text-muted-foreground'>
                    Don&lsquo;t have an account?
                    <Link href="/sign-up" className='font-bold ml-2 text-green-600'>
                        Sign Up
                    </Link>
                </p>
            </div>
            
            <Form {...form}>
                <form>
                    <div className='flex flex-col gap-3'>
                        {/* form fields for sign in */}
                        {SignIn.map((item) => (
                            <InputField key={item.name} form={form} {...item} />
                        ))}

                    </div>
                </form>
            </Form>
            <Button
                disabled={isLoading}
                onClick={form.handleSubmit(handleSubmit)}
                className="w-full mt-2 py-2.5 font-bold" size="lg"
            >
                {isLoading ? <Spinner/> : "Sign in"}
            </Button>
        </div>
    )
}