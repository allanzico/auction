"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { MenuList } from "@/lib/menu-list"

const NavMenu = () => {
  const pathname = usePathname();
  const menuList = MenuList(pathname);


  return (
    <NavigationMenu>
      <NavigationMenuList>
        {
            menuList.map(({
                label,
                href,
                submenus,
                active,
            
            }, index) => {

                return (
                    <NavigationMenuItem key={index}>
                        {
                            submenus.length > 0 ?
                            <NavigationMenuTrigger className="focus:bg-transparent hover:bg-green-50 ">
                                 <p
                  className='max-w-[200px] truncate text-lg text-gray-900 font-semibold '
                >
                  {label}
                </p>
                            </NavigationMenuTrigger> :
                            <NavigationMenuLink 
                            className="focus:bg-transparent hover:bg-green-50 "
                            asChild>
                              <Link href={href} className={navigationMenuTriggerStyle()}>
                              <p
                  className={cn(
                    "max-w-[200px] truncate text-lg text-gray-900 font-semibold",
                    active && "border-b-2 border-primary bg-green-50 px-2 py-1 rounded-sm"
                  )}
                >
                  {label}
                </p>
                              </Link>
                            
                            </NavigationMenuLink>
                        }
                        <NavigationMenuContent>
                            <ul className="flex flex-col w-full gap-1 p-2 min-w-[200px]">
                                {submenus.map((submenu, index) => {
                                    return (
                                        <ListItem
                                            key={index}
                                            title={submenu.label}
                                            href={submenu.href}
                                            className="flex flex-col w-full focus:bg-transparent hover:bg-green-50 "
                                        >
                                            {submenu.label}
                                        </ListItem>
                                    )
                                })}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                )
            })
        }
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default NavMenu
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>
(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})

ListItem.displayName = "ListItem"
