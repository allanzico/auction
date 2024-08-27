'use client'

import React, { MouseEvent, useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import useSWR from "swr";
import { getUser } from "@/actions/auth";
import { currencyFormatter, getImageUrl } from "@/lib/utils";
import { favoriteLot, getLot } from "@/actions/lot";
import { HeartIcon } from "lucide-react";
import { toast } from 'sonner';
import CountdownTimer from "../ui/countdown-timer";

interface LotCardProps {
  lot: any;
}

const LotCard = ({ lot }: LotCardProps) => {
  const imageUrl = lot && getImageUrl(lot.file);
  const { data: user, mutate: mutateUser } = useSWR('user', getUser);
  const { data: freshLot, mutate: mutateFreshLot } = useSWR(['freshLot', lot.id], () => getLot(lot.id));
  const isLotFavorited = useMemo(() => user?.user?.favoriteLots?.some((favoriteLot: any) => favoriteLot.lotId === lot.id), [user, lot]);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [numberOfFavorites, setNumberOfFavorites] = useState<number>(0);

  useEffect(() => {
    if (freshLot) {
      setNumberOfFavorites(freshLot.favorited.length);  // Set initial number of favorites
    }
  }, [freshLot]);

  useEffect(() => {
    setIsFavorited(isLotFavorited!);
  }, [isLotFavorited]);

  const handleFavoriteClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if(!user) {
      return toast.error('You must be logged in to favorite a lot')
    }

    // Optimistically update the UI
    const newFavoriteState = !isFavorited;
    setIsFavorited(newFavoriteState);
    setNumberOfFavorites(prev => newFavoriteState ? prev + 1 : prev - 1);

    try {
      const response = await favoriteLot(lot.id);

      if (response.success) {
        // Revalidate the user and fresh lot data to sync with the backend
        mutateUser();
        mutateFreshLot();
        toast.success(response.message);
      } else {
        // Revert the optimistic update if the backend operation failed
        setIsFavorited(isLotFavorited!);
        setNumberOfFavorites(freshLot?.favorited.length!);
        toast.error('Failed to update favorite');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      // Revert the optimistic update in case of an error
      setIsFavorited(isLotFavorited!);
      setNumberOfFavorites(freshLot?.favorited.length!);
      toast.error('Failed to update favorite');
    }
  };

  return (
    <div
      className="flex flex-row w-full py-4 px-2 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out"
    >
      <Link href={`/auction/lot/${lot?.id}`} className="flex flex-row w-full">
        <div className="relative h-24 w-40 md:h-40 md:w-60 flex-shrink-0">
          <img
            src={imageUrl!}
            alt={lot?.name}
            className="rounded-md object-cover h-full w-full"
          />
        </div>
        <div className="flex flex-col flex-grow pl-5">
          <div className="flex flex-row justify-between">
            <h4 className="text-xl text-primary font-semibold">{lot?.name}</h4>
            <button
              type="button"
              className="flex flex-row justify-between items-center px-2 py-1 rounded-md bg-gray-50 text-white"
              onClick={handleFavoriteClick}
            >
              {isFavorited ? (
                <HeartIcon className="h-5 w-5" fill="red" />
              ) : (
                <HeartIcon className="h-5 w-5 text-red-500" />
              )}
              <p className="text-xs text-gray-900 font-semibold px-1">
                {numberOfFavorites}
              </p>
            </button>
          </div>
          <p className="pt-2 text-sm text-gray-500 flex-grow">
            {lot?.auction?.location?.city}, {lot?.auction?.location?.country}
          </p>
          <div className="flex flex-row justify-start items-center pt-2 gap-4">
          <p className="text-xs font-medium text-gray-900">
                  <CountdownTimer start={lot?.auction?.startDate!} end={lot?.auction?.endDate!} />
                  </p>
            <div>
              <p className="text-sm text-gray-500 flex-grow">
                <span className="hover:bg-gray-300 delay-100 duration-100 bg-gray-200 rounded-sm py-1 px-2 text-xs">
                  {lot?.bids?.length} bids
                </span>
              </p>
            </div>
          </div>
          <div className="flex justify-end items-end pt-5 gap-6">
            <p className="flex text-lg items-center text-primary font-semibold">
              {
                currencyFormatter(lot?.highestBid!)
              }
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default LotCard;
