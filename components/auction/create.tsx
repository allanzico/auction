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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { createAuction, createUploadUrl } from "@/lib/actions/auction"
import { v4 as uuidv4 } from 'uuid';
import { AuctionSchema } from "@/lib/schemas"
import { CalendarIcon } from "lucide-react"
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import { cn } from "@/lib/utils"
import { Location } from "@/types"


interface CreateAuctionProps {
  locations: Location[]
}

const CreateAuction = ({
  locations
}: CreateAuctionProps
) => {
  
    const form = useForm<z.infer<typeof AuctionSchema>>({
        resolver: zodResolver(AuctionSchema),
        defaultValues: {
            name: "",
            file: null,
            location: "",
            startDate: new Date(),
            endDate: new Date(),
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
                    <Input placeholder="auction name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select a location" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    locations.map((location: any) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.city}, {location.country}
                      </SelectItem>
                    ))
                  
                  }
                </SelectContent>
              </Select>
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
           
        <div className="md:flex md:flex-row md:gap-4 md:items-start">
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                      
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>End</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                      
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )
}

export default CreateAuction
