'use client'

import { Suspense, useEffect, useMemo, useState } from 'react';
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
import { toast } from 'sonner';
import { currencyFormatter } from '@/lib/utils';
import { Separator } from '../ui/separator';
import { addBid } from '@/actions/auction';
import Link from 'next/link';
import { getUser } from '@/actions/auth';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';

interface LotBidProps {
  lot: Lot
}

const getUserData = async () => {
  return await getUser()
}
export function LotBid({ lot }: LotBidProps) {
  const router = useRouter()
  const { data: user, error, isLoading, mutate } = useSWR('user', () => getUserData())
  useEffect(() => {
    mutate(
      () => getUserData(),
      false
    )
  }, [user])


  const latestBid = lot?.bids && lot.bids.length > 0 ? lot.bids.slice(-1)[0].amount : lot?.startingBid;
  const numberofBids = useMemo(() => lot?.bids?.length, [lot?.bids])
  const [bidAmount, setBidAmount] = useState(0)
  const [bidLoading, setBidLoading] = useState(false)

  const handleLogin = () => {
    router.push('/auth/login?callbackUrl=' + encodeURIComponent(window.location.pathname));
  };

  const form = useForm<z.infer<typeof BidSchema>>({
    resolver: zodResolver(BidSchema),
    defaultValues: {
      amount: 0,
    },
  })


  async function onSubmit(data: z.infer<typeof BidSchema>) {
    setBidLoading(true)
    const res = await addBid(lot.id, data.amount)

    if (!res) return toast.error('Something went wrong')

    if (res && res.success) {
      setBidLoading(false)
      form.reset(
        {
          amount: 0,
        }
      )
      return toast.success(res.message)
    }
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
        user?.session ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>place bid</FormLabel>
                    <FormControl>
                      <Input placeholder="amount" {...field} type='number'
                        onChangeCapture={
                          (e) => {
                            setBidAmount(parseFloat(e.currentTarget.value))
                          }
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type='submit' disabled={
                isNaN(bidAmount)
                || bidAmount < latestBid
                || bidAmount == latestBid
                || bidAmount <= 0
              }>
                {
                  bidLoading ? <div className="flex flex-row items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white" />
                    <span>Bidding...</span>
                  </div> : <span>Bid</span>
                }
              </Button>
            </form>

          </Form>
        ) : user !== undefined ? (
          <Button className="w-full" onClick={handleLogin}> Login to bid</Button>) : null

      }

      {lot?.bids && lot.bids.length > 0 && (
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
      )}
    </div>
  );
}