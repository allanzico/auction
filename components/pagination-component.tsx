import React, { useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from '@/lib/utils';

interface PaginationProps {
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  perPage: number;
  count: number | undefined;
}

const PaginationComponent = ({
  pageIndex,
  setPageIndex,
  perPage,
  count
}: PaginationProps) => {
  const totalPages = Math.ceil(count! / perPage)

  // State to track the last page clicked before the ellipsis
  const [lastVisiblePage, setLastVisiblePage] = useState(3);

  const renderPaginationItems = () => {
    const paginationItems = []

    // Always render the first three pages
    for (let i = 0; i < Math.min(lastVisiblePage, totalPages); i++) {
      paginationItems.push(
        <PaginationItem
          key={i}
          className={cn('cursor-pointer', {
            'bg-zinc-100': pageIndex === i,
          })}
          onClick={() => {
            setPageIndex(i);
            // If the last visible page is clicked, increment the visible pages
            if (i === lastVisiblePage - 1 && lastVisiblePage < totalPages - 3) {
              setLastVisiblePage(prev => prev + 1);
            }
          }}
        >
          <PaginationLink>{i + 1}</PaginationLink>
        </PaginationItem>
      )
    }

    // Conditionally render the ellipsis if there are more pages after the visible ones
    if (lastVisiblePage < totalPages - 3) {
      paginationItems.push(<PaginationItem key="start-ellipsis"><PaginationEllipsis /></PaginationItem>)
    }

    // Always render the last three pages
    for (let i = Math.max(totalPages - 3, lastVisiblePage); i < totalPages; i++) {
      paginationItems.push(
        <PaginationItem
          key={i}
          className='cursor-pointer'
          onClick={() => setPageIndex(i)}
        >
          <PaginationLink>{i + 1}</PaginationLink>
        </PaginationItem>
      )
    }

    return paginationItems
  }

  return (
    <Pagination className='flex max-w-screen-lg justify-center items-center bottom-[5%] sticky z-[100] h-14 inset-x-0  w-full'>
      <PaginationContent className='bg-white backdrop-blur-xl transition-all'>
        {/* Conditionally render the PaginationPrevious button */}
        {pageIndex > 0 && (
          <PaginationItem className='cursor-pointer' onClick={() => setPageIndex(pageIndex - 1)}>
            <PaginationPrevious />
          </PaginationItem>
        )}

        {/* Render pagination items with ellipses */}
        {renderPaginationItems()}

        {/* Conditionally render the PaginationNext button */}
        {pageIndex < totalPages - 1 && (
          <PaginationItem className='cursor-pointer' onClick={() => setPageIndex(pageIndex + 1)}>
            <PaginationNext />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationComponent
