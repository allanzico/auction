

import React, { useEffect } from "react";
import { HeartIcon as HeartOutlined } from "@heroicons/react/24/outline";
import { StarIcon } from "lucide-react";
import { getImageUrl } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { Lot } from "@/types";

interface LotCardProps {
    lot: Lot
}
const LotCard = ({lot}: LotCardProps) => {
    const imageUrl = getImageUrl(lot.file)

  return (
    <Link href={`/lot/${lot.id}`}>
<div
      className="flex py-4 px-2 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out"
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
          {/* <div >
<HeartOutlined className="h-6 cursor-pointer" />
          </div> */}
        </div>
       
        <div className="border-b w-10 pt-2" />
        <p className="pt-2 text-sm text-gray-500 flex-grow">
            {lot?.auction?.location?.city}, {lot?.auction?.location?.country} 
        </p>
        <p className="pt-2 text-sm text-gray-500 flex-grow">
          <span className="hover:bg-gray-300 delay-100 duration-100 bg-gray-200 rounded-sm py-1 px-2 text-xs">
            345 bids
          </span>
        </p>
        <div className="flex justify-between items-end pt-5">
          <p className="flex items-center text-primary">
            $5000
          </p>
          <Button className="bg-primary text-white">Bid now</Button>
          {/* <div>
            <p className="text-lg font-semibold pb-2 lg:text-2xl text-green-600">
              <span className="font-normal text-gray-600 text-base">From </span> 
            </p>
          </div> */}
        </div>
      </div>
    </div>
    </Link>
    )
};

export default LotCard;