import React from 'react'

const LotSkeleton = () => {
    return (
<div
      className="flex flex-row w-full py-4 px-2  animate-pulse"
    >
      <div className="relative h-24 w-40 md:h-40 md:w-60 flex-shrink-0">
      <div className='h-full w-full bg-gray-200' />
      </div>
      <div className="flex flex-col gap-4 flex-grow pl-5">
      <div className='h-4 bg-gray-200 w-full' />
      <div className='h-4 bg-gray-200 w-full' />
      <div className='h-4 bg-gray-200 w-full' />
      <div className='h-4 bg-gray-200 w-full' />
      </div>
    </div>
    )
}

export default LotSkeleton