
'use client'

import React, { useEffect, useState } from 'react'
import { MotionDiv } from '../MotionDiv'
import Link from 'next/link'
import { getImageUrl } from '@/lib/utils'
import CountdownTimer from '../ui/countdown-timer'
import { Auction } from '@/types'

interface AuctionCardProps {
    auction: Auction,
    index: number,
}
const AuctionCard = ({auction, index}: AuctionCardProps) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }
  const imageUrl = getImageUrl(auction.file)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
 
  return isClient && (
    <Link 
    href={`/auction/${auction.id}`}
    >
    <MotionDiv
    variants={variants}
    initial="hidden"
    animate="visible"
    transition={{ 
      delay: index * 0.01,
      ease: "easeInOut",
      duration: 0.5
     }}
     viewport={{ amount: 0}}
    >
           <div className="group relative" >
           <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-56">
                  <img
                    src={imageUrl}
                    alt={auction.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href=''>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {auction.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                    {auction?.lots?.length} lots
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                  <CountdownTimer start={auction.startDate} end={auction.endDate} />
                  </p>
                </div>
           </div>
                
       
    </MotionDiv>
    </Link>
  )
}

export default AuctionCard