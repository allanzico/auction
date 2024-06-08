import CreateLot from '@/components/lot/create'
import { getMyAuctions } from '@/lib/actions/auction'
import React from 'react'

const Lots = async () => {
  const auctions = await getMyAuctions()
  return (
    <div className='flex flex-col gap-4 p-5 items-center justify-center'>
    <h1 className="text-3xl font-bold">Create Lot</h1>
    <CreateLot auctions={auctions} />
  </div>
  )
}

export default Lots