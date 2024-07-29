import React from 'react'
import { usePathname } from "next/navigation"
import { Button } from '../ui/button';
import Link from 'next/link';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { SheetTrigger } from '@/components/ui/sheet';
import { MenuList } from '@/lib/menu-list';

const MobileMenu = ({
  locale
}: {
  locale: string
}) => {
  const pathname = usePathname();
  const menuList = MenuList(pathname,);
  return (
    <div className='flex flex-col gap-4'>
      <div>
      {
      menuList.map(({
        label,
        href,
        submenus,
        active,
      }, index) => {
       
        return (
          <div key={index}>
            {submenus.length > 0 ?
             <Collapsible className=" shadow-none items-center py-2 px-4 rounded-md justify-center">
             <CollapsibleTrigger className='flex flex-row gap-2 items-center justify-center'>
             <p
                  className='max-w-[200px] truncate text-lg text-gray-900 font-normal'
                >
                  {label}
                </p>
                <ChevronDownIcon />
             </CollapsibleTrigger>
             <CollapsibleContent className='flex flex-col ml-5 gap-2'>
             {
            submenus.map((submenu, index) => {
                return (
                  <Link href={submenu.href}  key={index}>
                    <SheetTrigger asChild>
                    <p
                 
                  className='max-w-[200px] truncate text-sm text-gray-900 font-normal'
                >
                  {submenu.label}
                </p>
                    </SheetTrigger>
                   
                  </Link>
                  
                )
              })
            }
             </CollapsibleContent>
           </Collapsible>
           
              
              :
              <Button
              variant={active ? "secondary" : "ghost"}
              className="flex shadow-none gap-2 h-10 items-center py-2 px-4 rounded-md justify-start"
              asChild
            >
              <Link href={href}>
              <SheetTrigger asChild>
              <p
                  className='max-w-[200px] truncate text-lg text-gray-900 font-normal'
                >
                  {label}
                </p>
              </SheetTrigger>
               
             
              </Link>
            </Button>
            }
            
          </div>
        )
      })
    }
      </div>
      <div>
        <Button
          className="flex shadow-none gap-2 h-10 items-center py-2 px-4 rounded-md justify-center"
          asChild
        >
          <Link href="/login">
            <p
              className='max-w-[200px] truncate text-lg text-white font-normal'
            >
              DONATE
            </p>
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default MobileMenu