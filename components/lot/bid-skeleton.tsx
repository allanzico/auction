import React from 'react'

const BidSkeleton = () => {
  return (
<div
      className="flex flex-col bg-white  lg:flex-row lg:gap-8 animate-pulse"
    >
        <div className='flex flex-col gap-4 md:gap-8 py-4 h-full w-full basis-full lg:basis-4/6'>
        <div className="relative aspect-square h-full max-h-[400px] w-full overflow-hidden">
      <div className='h-full w-full bg-gray-200' />
      </div></div>

      <div className="flex flex-col py-4 basis-full lg:basis-2/6 gap-4 md:gap-8">
      <div className='flex flex-col gap-4 p-4 bg-gray-200 w-full' />
      <div className='flex flex-col gap-4 p-4 bg-gray-200 w-full' />
      <div className='flex flex-col gap-4 p-4 bg-gray-200 w-full' />
      <div className='flex flex-col gap-4 p-4 bg-gray-200 w-full' />
      </div>
    </div>
  )
}

export default BidSkeleton