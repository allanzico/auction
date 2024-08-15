import React from 'react'
import AuctionsList from "@/components/list";
import CreateAuction from '@/components/auction/create';
import { getLocations } from '@/actions/auction';

const Page = async () => {
  const locations = await getLocations()
  return (
    // <AuctionsList />
    <div className='flex flex-col gap-4 p-5 items-center justify-center'>
    <h1 className="text-3xl font-bold">Create Auction</h1>
    <CreateAuction locations={locations} />
  </div>
  )
}

export default Page