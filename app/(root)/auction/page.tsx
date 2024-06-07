import React from 'react'
import { auth } from '@/auth'
import CreateAuction from '@/components/auction/create'
import CreateLot from '@/components/lot/create'
import { getMyAuctions } from '@/lib/actions/auction'

const Auctions = async () => {

  const auctions = await getMyAuctions()

  return (
    <div className='flex flex-col gap-4 p-5 items-center justify-center'>
      <h1 className="text-3xl font-bold">Create Auction</h1>
      <CreateAuction />
      <h1 className="text-3xl font-bold">Create Bid</h1>
      <CreateLot auctions={auctions} />
    </div>
  )
}

export default Auctions