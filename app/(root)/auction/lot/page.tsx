import CreateLot from '@/components/lot/create'
import { Button } from '@/components/ui/button'
import { createLocation, getLotCategories, getMyAuctions } from '@/actions/auction'
import React from 'react'

const Page = async () => {
  const auctions = await getMyAuctions()
  const categories = await getLotCategories()

  return (
    <div className='flex flex-col gap-4 p-5 items-center justify-center'>
    <h1 className="text-3xl font-bold">Create Lot</h1>
    <CreateLot auctions={auctions} categories={categories} />
  </div>
  )
}

export default Page