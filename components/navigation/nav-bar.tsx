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
import AuthNav from './auth-nav'
import { BirdIcon } from 'lucide-react'

const NavBar = ({locale}: {locale: string}) => {

    return (
      <header className="bg-white">
        <nav aria-label="Global" className="mx-auto flex w-full items-center justify-between py-4 md:py-16 px-6 lg:px-8">
          <div className="flex lg:flex-1">
            <Link href="/">
              <BirdIcon className="h-8 w-8" />
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
        
          <div className="hidden lg:gap-2 lg:items-center lg:flex lg:flex-1 lg:justify-end">
            <Button variant="ghost">
              <Link href="/register">
              Create Account
              </Link>
            </Button>
            <Button className="text-sm font-semibold leading-6 text-white">
              <Link href="/login">
              Login
              </Link>
            </Button>
            {/* <Button  className="text-sm font-semibold leading-6 text-white">
              DONATE
            </Button> */}
          </div>
        </nav>
      </header>
    )
}

export default NavBar
