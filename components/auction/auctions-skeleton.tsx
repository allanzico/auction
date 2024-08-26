import React from 'react'

const AuctionsSkeleton = () => {
  return (
    <div className="group relative animate-pulse gap-4" >
    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-56 animate-pulse">
           <div className="h-full w-full object-cover object-center lg:h-full lg:w-full"
           />
         </div>
         <div className="mt-4 flex flex-col justify-between gap-2">
         <p className="h-4 w-full bg-gray-200 animate-pulse" />
        <p className="h-4 w-full bg-gray-200 animate-pulse" />
         </div>
    </div>

  )
}

export default AuctionsSkeleton