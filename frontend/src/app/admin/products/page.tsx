"use client"

import { Button } from '@/shared/ui/button'
import { Checkbox } from '@/shared/ui/checkbox'
import Search from '@/shared/ui/search'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Download, EllipsisVertical, FilterIcon, PlusIcon, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function ProductList() {

  function handleClick() {
    alert("Comming soon")
  }

  return (
    <div className='bg-muted min-h-dvh w-full'>
      <div className="bg-background sticky border-b top-0 left-0 h-16 z-10 p-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        {/* Left group */}
        <div className="flex w-full gap-2 md:flex-1 max-w-xl">
          <Search placeholder="Search product" className="flex-1" />
          <Button onClick={handleClick} variant="outline">
            <FilterIcon />
            Filter
          </Button>
        </div>

        {/* Right group */}
        <div className="flex w-full gap-3 md:w-auto">
          <Button onClick={handleClick} variant="outline">
            <Download className="rotate-180" />
            Export
          </Button>

          <Link className="flex-1 md:flex-auto" href="/admin/products/new">
            <Button className='w-full'>
              <PlusIcon />
              New product
            </Button>
          </Link>
        </div>
      </div>

      <div className='p-4'>
        <Table className='bg-background rounded-lg'>
          <TableHeader>
            <TableRow >

              <TableHead>
                ITEM NAME
              </TableHead>
              <TableHead>
                PRICE
              </TableHead>
              <TableHead>
                STOCK
              </TableHead>
              <TableHead>
                CATEGORY
              </TableHead>
              <TableHead>
                RATING
              </TableHead>
              <TableHead>
                ACTIONS
              </TableHead>
            </TableRow>

          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className='flex gap-3 items-center'>
                <Checkbox />
                <Image
                  className='rounded-sm overflow-hidden object-contain'
                  src="/images/product.jpg"
                  alt="product image"
                  width={50}
                  height={50}
                />
                <div>
                  <h1 className=''>Product name ...</h1>
                  <p className='text-xs text-muted-foreground'>Product desciptions</p>
                </div>
              </TableCell>
              <TableCell>
                <div className='flex gap-1 items-end'>
                  <p>$200</p>
                  <p className='text-xs text-muted-foreground line-through'>$250</p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p>250 item/s <span className='text-muted-foreground'>left</span></p>
                  <p className='text-xs text-muted-foreground'>14,00 sold</p>
                </div>
              </TableCell>
              <TableCell>
                Fashion
              </TableCell>
              <TableCell>
                <div className='flex gap-1 items-center'>
                  <Star size={16} fill='red' className='text-red-600' />
                  <p>4.5</p>
                  <p className='text-muted-foreground text-xs'>41 Reviews</p>
                </div>
              </TableCell>
              <TableCell>
                <EllipsisVertical className='cursor-pointer' size={16} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
