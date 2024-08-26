'use client'

import {  getAllAuctions } from '@/actions/auction'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import AuctionCard from '../auction/auction-card'
import AuctionsSkeleton from '../auction/auctions-skeleton'

const fetchData = async () => {
  return await getAllAuctions()
}
const AuctionList = () => {
  const { data, error, isLoading } = useSWR('auctions', () => fetchData())
  const [isClient, setIsClient] = useState(false)

 useEffect(() => {
    setIsClient(true)
  }, [])

    return isClient && (
          <div className="max-w-2xl lg:max-w-7xl ">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">All Auctions</h2>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {isLoading ? (
                new Array(12).fill(null).map((_, idx) => <AuctionsSkeleton key={idx} />)
              ) : Array.isArray(data) && data !== undefined && data.length > 0 && data?.map((auction: any, index: number) => <AuctionCard key={auction.id} auction={auction} index={index} />)
              }
            </div>
          </div>
     
      )
}

export default AuctionList