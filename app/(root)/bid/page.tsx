'use client'

import { Button } from '@/components/ui/button'
import { createLocation,} from '@/actions/auction'
import React from 'react'
import { createLotCategory, } from '@/actions/lot'

const Page = () => {
  const locations = [
    {
      country: 'United States',
      city: 'New York'
    },
    {
      country: 'Uganda',
      city: 'Kampala'
    },
    {
      country: 'Kenya',
      city: 'Nairobi'
    }
  ]
  const categories = [
    'Solar Panels',
    'Wind Turbines',
    'Batteries',
    'Inverters',
    'Charge Controllers',
    'Laptops',
    'Monitors',
    'Desktops',
    'Servers',
  ]
  return (
    <div className="flex items-center justify-center flex-col mx-auto gap-4 bg-white">
          <Button 
      onClick={async () => {
        locations.map(async (location) => {
          await createLocation(location)
        })
      }}>
      Add Location
      </Button>
      <Button 
      onClick={async () => {
        categories.map(async (category) => {
          await createLotCategory({name: category})
        })
      }}>
      Add Category
      </Button>
    </div>
  )
}

export default Page