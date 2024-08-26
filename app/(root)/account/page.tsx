'use client';

import { getUser } from '@/actions/auth';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import AccountOverviewCard from '@/components/account/account-overview-card';


const LINKS = [
    {
        name: 'My Lots',
        description: 'View all your lots',
        href: '/account/my-lots',
    },
    {
        name: 'My purchases',
        description: 'View all your purchases',
        href: '/account/my-purchases',
    },
] as const

const Page = () => {
  const { data: user, error, isLoading, mutate } = useSWR('user', async () => await getUser())
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const currentTime = new Date().toLocaleString('en-US', {
      timeZone: userTimeZone,
      hour: 'numeric',
      hour12: true,
    });

    const hour = parseInt(currentTime.split(' ')[0]);
    const period = currentTime.split(' ')[1];

    let calculatedGreeting = '';
    if (period === 'AM') {
      if (hour < 12) calculatedGreeting = 'Good morning,';
    } else {
      if (hour < 6) calculatedGreeting = 'Good afternoon,';
      else calculatedGreeting = 'Good evening,';
    }

    setGreeting(calculatedGreeting);
  }, []);

  return (
    <div className='flex flex-col  gap-4 mt-4'>
      <div className='flex flex-row justify-center items-center gap-4'>
      <h1 className='text-2xl font-semibold '>
        {isLoading || !user ? <></> : greeting} {user?.user?.name || user?.user?.email}
      </h1>
      </div>
      <div className="flex flex-wrap overflow-hidden p-5">
      <div className="flex flex-col w-full gap-2 sm:w-full  md:w-full  lg:w-full  xl:w-full ">
        <div className='flex w-full flex-col items-center  gap-2'>
          <Carousel className="w-full max-w-4xl mt-5 ">
            <CarouselContent className=" -ml-1">
              {LINKS && LINKS.length > 0 && LINKS.map((link: any, index: number) => (
                <CarouselItem key={index} className={`pl-2  md:basis-1/3  ${LINKS.length < 5 ? 'lg:basis-1/2' : 'lg:basis-1/4'}`}>
                  <AccountOverviewCard link={link} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Page;
