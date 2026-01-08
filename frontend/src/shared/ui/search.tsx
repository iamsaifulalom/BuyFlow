import React from 'react'
import { Input } from './input'
import { SearchIcon } from 'lucide-react';

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onClear?: () => void;
}

export default function Search({ onClear, ...props }: SearchProps) {
    return (
        <div onFocus={onClear} className='relative flex items-center border gap-1 w-full rounded-lg px-2 text-muted-foreground'>
            <SearchIcon size={20} />
            <Input {...props}  type='search'  className='border-none h-9 text-accent-foreground' />
        </div>
    )
}
