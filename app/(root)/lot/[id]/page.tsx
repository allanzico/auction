'use client'

import { Gallery } from '@/components/gallery'
import { LotDescription } from '@/components/lot-description'
import { getLot, getLotBids } from '@/lib/actions/auction'
import { useParams } from 'next/navigation'
import React,{ Suspense } from 'react'
import useSWR from 'swr'

const fetchData = async (lotId: string) => {
  return await getLot(lotId)
}
const Lot = () => {
  const {id} = useParams()
  const { data, error } = useSWR<any>(id ? ['lot', id.toString()] : null,  () => fetchData(id.toString()) )

  const images =  [
    {
      url: '/computer.jpg',
      altText: 'Olympus'
    },
    {
      url: '/boat.jpg',
      altText: 'Olympus'
    },
    {
      url: '/camera.jpg',
      altText: 'Olympus'
    },
    {
      url: '/vegetables.jpg',
      altText: 'Olympus'
    },
  ]

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
   
   <>
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
              }
            >
              <Gallery
                images={images.map((image) => ({
                  src: image.url,
                  altText: image.altText
                }))}
              />
            </Suspense>
          </div>

          <div className="basis-full lg:basis-2/6">
            <LotDescription lot={data} />
          </div>
        </div>
      </div>
    </>
      </main>
  )
}

export default Lot