'use client'

import { Gallery } from '@/components/gallery'
import { getLot } from '@/actions/lot'
import { useParams } from 'next/navigation'
import React,{ Suspense, useEffect } from 'react'
import useSWR from 'swr'
import { LotBid } from '@/components/lot/lot-bid'
import { Separator } from '@/components/ui/separator'
import BidSkeleton from '@/components/lot/bid-skeleton'

const Page = () => {
  const {id} = useParams()
  const { data, error, isLoading, mutate } = useSWR<any>(id ? ['lot', id.toString()] : null,  async() => await getLot(id.toString()) )
useEffect(() => {
  mutate(
    async () => await getLot(id.toString()),
    false
  )
}, [data])

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
    <main >
      <div className='mt-4 md:mt-8'>
      <Separator />
      </div>
    
      <div className='flex flex-col gap-2 mt-2'>
          <h1 className="mt-2 text-4xl font-semibold">{data?.name}</h1>
          <div className='flex flex-row gap-2 flex-wrap'>
          <p className="text-md text-zinc-400 font-normal ">
            {data?.auction?.name}
            </p>
            <p className="text-md text-zinc-400 font-normal"> {data?.auction?.location?.city}</p>
          </div>
          </div>
          {
            isLoading ? <BidSkeleton /> : !data ? <></> : data && (
              <div className="flex flex-col bg-white  lg:flex-row lg:gap-8 ">
              <div className="flex flex-col gap-4 md:gap-8 py-4 h-full w-full basis-full lg:basis-4/6">
              
              
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
                <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                </div>
              </div>
    
              <div className="py-4 basis-full lg:basis-2/6">
                <LotBid lot={data} />
              </div>
            </div>
            )
          }
      </main>
  )
}

export default Page