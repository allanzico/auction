import React from 'react'
import CreateAuction from '@/components/auction/create'


const Auctions = async () => {

 

  return (
    <div className='flex flex-col gap-4 p-5 items-center justify-center'>
      <h1 className="text-3xl font-bold">Create Auction</h1>
      <CreateAuction />
    </div>
  )
}

export default Auctions