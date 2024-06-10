'use client'

import { Suspense } from 'react';
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

interface LotDescriptionProps {
  lot: any;
}

export function LotDescription({lot}: LotDescriptionProps) {
  const { data: session, status } = useSession()
  const latestBid = lot?.bids && lot.bids.length > 0 ? lot.bids[0] + 1 : lot?.startingBid;
  const [bid , setBid] = React.useState(latestBid)

  const form = useForm<z.infer<typeof BidSchema>>({
    resolver: zodResolver(BidSchema),
    defaultValues: {
        amount: latestBid,
    },
  })

async function onSubmit(data: z.infer<typeof BidSchema>) {

}

console.log(form.getValues('amount'))
console.log(lot?.startingBid)

  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">Title</h1>
        <div className="mr-auto w-auto rounded-md bg-gray-100 p-2 text-sm text-gray-900 font-semibold">
          {latestBid > lot?.startingBid ? `Current bid: $${latestBid}` : lot?.startingBid && `Starting bid: $${lot.startingBid}`}
        </div>
      </div>

      <div
      className='prose mx-auto mb-6 text-sm leading-tight dark:text-white/[60%] max-w-6xl text-black prose-headings:mt-8 prose-headings:font-semibold prose-headings:tracking-wide prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-a:text-black prose-a:underline hover:prose-a:text-neutral-300 prose-strong:text-black prose-ol:mt-8 prose-ol:list-decimal prose-ol:pl-6 prose-ul:mt-8 prose-ul:list-disc prose-ul:pl-6 dark:text-white dark:prose-headings:text-white dark:prose-a:text-white dark:prose-strong:text-white'
    >
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget efficitur turpis. In nec diam sit amet erat mollis gravida. Etiam ut dui ac metus interdum scelerisque. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget urna. Nam nec libero nec ligula lacinia venenatis. Nulla facilisi. Sed at semper purus. Donec quis semper felis. Curabitur ac felis arcu.
        </p>
      </div>
      {
        status === 'authenticated' ? (
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>place your bid here</FormLabel>
                  <FormControl>
                    <Input placeholder="amount" {...field} type='number' onChangeCapture={(e) => setBid(e.currentTarget.value)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Suspense fallback={null}>
              <Button className="w-full" disabled={
                bid <= latestBid
              } > Bid</Button>
              </Suspense>
          </form>
        </Form>
        ) : <Button className="w-full" onClick={() => console.log('login') } > Login to bid</Button>
      }
    </>
  );
}