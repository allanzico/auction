'use client'

import React from 'react'
import CreateAuction from '@/components/auction/create'
import {  getLocations } from '@/lib/actions/auction'


const Auctions = async () => {
  const locations = await getLocations()

  return (
    <div className='flex flex-col gap-4 p-5 items-center justify-center'>
      <h1 className="text-3xl font-bold">Create Auction</h1>
      <CreateAuction locations={locations} />
    </div>
  )
}

export default Auctions