'use client'

import { Button } from '@/components/ui/button'
import MobileMenu from './mobile-menu'
import NavMenu from './nav-menu'
import Link from 'next/link'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { BirdIcon } from 'lucide-react'

const NavBar = ({locale}: {locale: string}) => {

    return (
      <header className="bg-white">
        <nav aria-label="Global" className="mx-auto flex w-full items-center justify-between py-4 md:py-8 border-b border-gray-200">
          <div className="flex lg:flex-1">
          <Link href="/">
                    <div className="flex justify-center items-center gap-2">
                        <h1 className="text-3xl font-bold">The Auction</h1>
                        <BirdIcon className="h-8 w-8" />
                    </div>
                </Link>
          </div>
          <div className="flex lg:hidden">
            <Sheet >
              <SheetTrigger className='md:hidden text-primary' asChild>
              <HamburgerMenuIcon className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side={'left'}>
                <MobileMenu locale={locale} />
                <SheetClose asChild>   
                </SheetClose>
              </SheetContent>
            </Sheet>

          </div>
          <div className="hidden md:flex">
          <NavMenu />
          </div>
        </nav>
      </header>
    )
}

export default NavBar
