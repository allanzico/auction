

import React, { useEffect } from "react";
import { HeartIcon as HeartOutlined } from "@heroicons/react/24/outline";
import { StarIcon } from "lucide-react";
import { getImageUrl } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { Lot } from "@/types";

interface LotCardProps {
    lot: any
}
const LotCard = ({lot}: LotCardProps) => {
    const imageUrl = getImageUrl(lot.file)

  return (

      
    <Link href={`/auction/lot/${lot.id}`}>
<div
      className="flex flex-row w-full py-4 px-2 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out"
    >
      <div className="relative h-24 w-40 md:h-40 md:w-60 flex-shrink-0">
      <img
    src={imageUrl}
    alt={lot.name}
    className="rounded-md object-cover h-full w-full"
  />
      </div>
      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between">
        <h4 className="text-xl text-primary font-semibold">{lot.name}</h4>
        </div>
        <p className="pt-2 text-sm text-gray-500 flex-grow">
            {lot?.auction?.location?.city}, {lot?.auction?.location?.country} 
        </p>
        <div className="flex flex-row justify-start items-center pt-2 gap-4">
          <div>
            <p>counter</p>
          </div>
          <div>
          <p className="text-sm text-gray-500 flex-grow">
            <span className="hover:bg-gray-300 delay-100 duration-100 bg-gray-200 rounded-sm py-1 px-2 text-xs">
              345 bids
            </span>
          </p>
          </div>
        </div>
        <div className="flex justify-end items-end pt-5 gap-6">
          <p className="flex text-md items-center text-primary font-semibold">
            $5000
          </p>
          <Button className="bg-primary text-white">Bid now</Button>
        </div>
      </div>
    </div>
    </Link>
    )
};

export default LotCard;