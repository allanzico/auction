"use client"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {createLot, createUploadUrl, getMyAuctions } from "@/lib/actions/auction"
import { v4 as uuidv4 } from 'uuid';
import { LotSchema } from "@/lib/schemas"
import { Auction } from "@prisma/client"

interface CreateLotProps {
  auctions: Auction[]
}

const CreateLot = ({auctions}: CreateLotProps) => {

    const form = useForm<z.infer<typeof LotSchema>>({
        resolver: zodResolver(LotSchema),
        defaultValues: {
            name: "",
            price: 0,
            file: null,
            auction: ""
            
        },
      })
      const fileRef = form.register("file");
    
  async function onSubmit(data: z.infer<typeof LotSchema>) {
    let file = data.file[0]
    const randomImageName = uuidv4() + Date.now()
    const newFile = new File([file], randomImageName, { type: file.type })
    const uploadUrl = await createUploadUrl(newFile.name, file.type)

    await fetch (uploadUrl, {
      method: "PUT",
      body: newFile,
    }
  )
  const saveData = {
    ...data,
    file: newFile.name
  }
  await createLot(saveData)
  }
    
      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input 
                    placeholder="price" 
                    {...field} 
                    type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input 
                    {...fileRef}
                    type="file"
                    onChange={(event) => {
                      field.onChange(event.target?.files ?? undefined);
                    }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                    <FormField
          control={form.control}
          name="auction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Auction</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select auction" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    auctions.map((auction) => (
                      <SelectItem key={auction.id} value={auction.id}>
                        {auction.name}
                      </SelectItem>
                    ))
                  
                  }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )
}

export default CreateLot
