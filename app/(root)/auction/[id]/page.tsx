'use client'

import { Fragment, useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { cn } from '@/lib/utils'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { getAllLots, getLotsInAuction } from '@/lib/actions/auction'
import useSWR from 'swr'
import { useParams } from 'next/navigation'
import LotCard from '@/components/lot/LotCard'

const fetchData = async (auctionId: string) => {
  return await getLotsInAuction(auctionId)
}

export default function Auction() {
  const { id } = useParams()
  const { data, error } = useSWR(id ? ['lots', id.toString()] : null, () => fetchData(id.toString()))

  const filters = [
    {
      id: 'category',
      name: 'Category',
      options: Array.from(new Set(data?.map((lot) => JSON.stringify({ value: lot.category.id, label: lot.category.name }))))
        .map((str) => JSON.parse(str))
        .map((category) => ({ ...category, checked: false })),
    },
  ]
  

  const subCategories = [
    { value: 'open', label: 'Open' },
    { value: 'closed', label: 'Closed' },
  ]

  const sortOptions = [
    { name: 'Newest', value: 'newest' },
    { name: 'Price: Low to High', value: 'priceLowToHigh' },
    { name: 'Price: High to Low', value: 'priceHighToLow' },
  ]

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<any>({
    category: [],
    status: [],
  })
  const [selectedSort, setSelectedSort] = useState(sortOptions[0].value)

  const handleFilterChange = (filterId: any, value: any) => {
    setSelectedFilters((prevFilters: any) => {
      const filterValues = prevFilters[filterId]
      const newFilterValues = filterValues.includes(value)
        ? filterValues.filter((v: any) => v !== value)
        : [...filterValues, value]
      return {
        ...prevFilters,
        [filterId]: newFilterValues,
      }
    })
  }

  const handleSortChange = (sortValue: any) => {
    setSelectedSort(sortValue)
  }

  const filteredData = data?.filter((item) => {
    const statusMatch =
      selectedFilters.status.length === 0 ||
      selectedFilters.status.includes(item.auction.endDate > new Date() ? 'open' : 'closed')
    const categoryMatch =
      selectedFilters.category.length === 0 || selectedFilters.category.includes(item.category.id)
    return statusMatch && categoryMatch
  }).sort((a, b) => {
    if (selectedSort === 'newest') {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    }
    if (selectedSort === 'priceLowToHigh') {
      return a.startingBid - b.startingBid
    }
    if (selectedSort === 'priceHighToLow') {
      return b.startingBid - a.startingBid
    }
    return 0
  })

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition show={mobileFiltersOpen}>
          <Dialog className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <TransitionChild
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div className="fixed inset-0 z-40 flex">
              <TransitionChild
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Status</h3>
                    <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                      {subCategories.map((status) => (
                        <li key={status.value}>
                          <div className="flex items-center">
                            <input
                              id={`filter-mobile-status-${status.value}`}
                              name="status[]"
                              value={status.value}
                              type="checkbox"
                              onChange={() => handleFilterChange('status', status.value)}
                              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                            />
                            <label htmlFor={`filter-mobile-status-${status.value}`} className="ml-3 text-gray-500">
                              {status.label}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>

                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </DisclosureButton>
                            </h3>
                            <DisclosurePanel className="pt-6">
                              <div className="space-y-6">
                                {section?.options?.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      onChange={() => handleFilterChange(section.id, option.value)}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </DisclosurePanel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Lots</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>

                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <MenuItem key={option.value}>
                          {({ active }) => (
                            <a
                              href="#"
                              onClick={() => handleSortChange(option.value)}
                              className={cn(
                                option.value === selectedSort ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-9">
              {/* Filters */}
              <form className="hidden lg:block lg:col-span-2">
                <h3 className="sr-only">Status</h3>
                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                  {subCategories.map((status) => (
                    <li key={status.value}>
                      <div className="flex items-center">
                        <input
                          id={`filter-status-${status.value}`}
                          name="status[]"
                          value={status.value}
                          type="checkbox"
                          onChange={() => handleFilterChange('status', status.value)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={`filter-status-${status.value}`} className="ml-3 text-gray-600">
                          {status.label}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </DisclosureButton>
                        </h3>
                        <DisclosurePanel className="pt-6">
                          <div className="space-y-4">
                            {section?.options?.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  onChange={() => handleFilterChange(section.id, option.value)}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-7">
              <main className="flex flex-row gap-2 mt-2">
                      <section className="flex-grow">

                        <div className="flex flex-col">
                  {filteredData?.map((item) => (
                    <LotCard key={item.id} lot={item} />
                  ))}
                </div>
              </section>
              </main>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
