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
import { Input } from "@/components/ui/input"
import { createAuction, createUploadUrl } from "@/lib/actions/auction"
import { v4 as uuidv4 } from 'uuid';
import { AuctionSchema } from "@/lib/schemas"


const CreateAuction = () => {
  
    const form = useForm<z.infer<typeof AuctionSchema>>({
        resolver: zodResolver(AuctionSchema),
        defaultValues: {
            name: "",
            file: null
        },
      })
      const fileRef = form.register("file");
    
  async function onSubmit(data: z.infer<typeof AuctionSchema>) {
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
  await createAuction(saveData)
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )
}

export default CreateAuction
