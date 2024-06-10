import { displayAllAuctions } from '@/lib/actions/auction'
import React from 'react'

const AuctionList = () => {
    const data  = displayAllAuctions(1)
    return (
        <div className="flex items-center justify-center flex-col mx-auto  bg-white">
          <div className="max-w-2xl px-4 py-16 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">All Auctions</h2>
    
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {data}
            </div>
            
          </div>
        {/* <LoadMore /> */}
        </div>
      )
}

export default AuctionList