import React from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <h1>Client header</h1>
            {children}
        </main>
    )
}
