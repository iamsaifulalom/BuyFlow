import { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <main className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-dvh'>
            <div className='hidden md:block w-full h-full bg-cover bg-center bg-[url("/images/auth-side-img.png")]'></div>
            <div className='p-4'>{children}</div>
        </main>
    )
}
