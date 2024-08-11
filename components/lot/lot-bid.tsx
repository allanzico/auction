'use client'

import { Suspense, useMemo, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { BidSchema } from '@/lib/schemas';
import { useSession } from "next-auth/react"
import { Lot } from '@/types';
import { toast } from '../ui/use-toast';
import { currencyFormatter } from '@/lib/utils';
import { Separator } from '../ui/separator';
import { addBid } from '@/actions/auction';

interface LotBidProps {
  lot: Lot
}

export function LotBid({ lot }: LotBidProps) {
  const { status } = useSession()
  const latestBid = lot?.bids && lot.bids.length > 0 ? lot.bids.slice(-1)[0].amount : lot?.startingBid;
  const numberofBids = useMemo(() => lot?.bids?.length, [lot?.bids])
  const [bidAmount, setBidAmount] = useState(0)

  const form = useForm<z.infer<typeof BidSchema>>({
    resolver: zodResolver(BidSchema),
    defaultValues: {
      amount: 0,
    },
  })


  async function onSubmit(data: z.infer<typeof BidSchema>) {
    console.log(data)
    // await addBid(lot.id, data.amount).then(() => {
    //   toast({
    //     title: "Bid placed",
    //     description: (
    //       <div className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //         Bid sent successfully!
    //       </div>
    //     ),
    //   })
    // })
  }

  return (
    <div className="flex flex-col gap-4 bg-zinc-50 p-4">
      <div className="flex flex-col">
        <p className='text-md font-normal'>
          {
            `current bid (${numberofBids && numberofBids > 0 ? numberofBids : '0'})`
          }
        </p>
        <p className="text-lg tracking-wider font-semibold">
          {latestBid > lot?.startingBid ? currencyFormatter(latestBid) : lot?.startingBid && currencyFormatter(lot?.startingBid)}
        </p>
      </div>
      <Separator />
      {
        status === 'authenticated' ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>place bid</FormLabel>
                    <FormControl>
                      <Input placeholder="amount" {...field} type='number' onChangeCapture={
                        (e) => {
                          setBidAmount(parseFloat(e.currentTarget.value))
                        }
                      } />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
           <Button className="w-full" type='submit' disabled={
                  isNaN(bidAmount)
                  || bidAmount <= latestBid
                  || bidAmount <= 0
                }>
                  Bid
                </Button>
            </form>

          </Form>
        ) : <Button className="w-full" onClick={() => console.log('login')} > Login to bid</Button>
      }
      
      <div className='flex flex-col bg-white p-4'>
        <h5 className='text-sm font-normal tracking-wider uppercase text-zinc-400'>Top Bids</h5>
        {lot?.bids &&
          lot.bids.slice(-3).map((_, index, array) => {
            const bid = array[array.length - 1 - index];
            return (
              <div
                className="flex flex-row justify-between items-start w-full py-2 border-b"
                key={index}
              >
                <p className='text-sm font-semibold'>{currencyFormatter(bid.amount)}</p>
                <p className='text-xs'>
                  {
                    bid.createdAt && new Date(bid.createdAt).toLocaleDateString(
                      'en-US',
                      { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false }
                    )
                  }
                </p>
              </div>
            );
          })}
      </div>
    </div>

  );
}