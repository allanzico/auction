import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Button } from '../ui/button'
  import { cn } from '@/lib/utils'
  import Link from 'next/link'
  
type AccountOverviewCardProps = {
    link: {
        name: string
        description: string
        href: string
    }
}
const AccountOverviewCard = ({link}: AccountOverviewCardProps) => {
  return (
    <Link href={link.href} >
    <Card className='shadow-none'>
 <CardHeader>
   <CardTitle>{link.name}</CardTitle>
   <CardDescription>{link.description}</CardDescription>
 </CardHeader>
 {/* <CardContent className="grid">
 <p className="text-lg font-medium leading-none">
     #
       </p>
 </CardContent> */}
</Card>
 </Link>
  )
}

export default AccountOverviewCard