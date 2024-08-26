'use client'

import { getCategoriesInAuction } from "@/actions/auction";
import { getLotsInAuction } from "@/actions/lot";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import useSWRMutation from 'swr/mutation'
import { ProductState } from "@/lib/validators/product-validators";
import LotEmptyState from "@/components/lot/empty-state";
import LotCard from "@/components/lot/lot-card";
import LotSkeleton from "@/components/lot/lot-skeleton";
import PaginationComponent from "@/components/pagination-component";
import { ChevronDown, Filter } from "lucide-react";

const DEFAULT_CUSTOM_PRICE_RANGE = [0, 100] as [number, number];
const SORT_OPTIONS = [
  { name: "None", value: "none" },
  { name: "Price: Low to High", value: "price-asc" },
  { name: "Price: High to Low", value: "price-desc" },
] as const;

const PRICE_FILTERS = {
  id: "price",
  name: "Price",
  options: [
    { value: [0, 10000], label: "Any price" },
    { value: [0, 20], label: "Under $20" },
    { value: [20, 40], label: "$20 - $40" },
  ]
} as const;

export default function Page() {
  const [pageIndex, setPageIndex] = useState(0);
  const perPage = 50;
  const { id } = useParams();
  const { data: categories } = useSWR(id ? [`categories`, id.toString()] : null, async () => await getCategoriesInAuction(id.toString()));
  const [initialized, setInitialized] = useState(false);
  
  const CATEGORIES = useMemo(
    () => ({
      id: 'category',
      name: 'Category',
      options: categories?.map((category) => ({ label: category.name, value: category.id, checked: false })) || [],
    }),
    [categories]
  );

  const [filter, setFilter] = useState<ProductState>({
    category: CATEGORIES.options?.map((option) => option.value),
    sort: SORT_OPTIONS[0].value,
    price: { isCustom: false, range: [0, 10000] },
  });

  useEffect(() => {
    if (!initialized && CATEGORIES.options.length > 0) {
      setFilter((prev) => ({
        ...prev,
        category: CATEGORIES.options.map((option) => option.value),
      }));
      setInitialized(true); 
    }
  }, [CATEGORIES.options, initialized]);

  const { data, isLoading: isDataLoading, mutate  } = useSWR(id ? [`/auction/[id]?page=${pageIndex + 1}&perPage=${perPage}`, id.toString()] : null, async () => await getLotsInAuction(id.toString(), pageIndex, perPage, filter));

  const {trigger, isMutating } = useSWRMutation(id ? [`/auction/[id]?page=${pageIndex + 1}&perPage=${perPage}`, id.toString()] : null, async () => await getLotsInAuction(id.toString(), pageIndex, perPage, filter));
  
  useEffect(() => {
    if (initialized) {
      trigger();
    }
  }, [filter, initialized]);

  const applyArrayFilter = ({ category, value }: { category: keyof Omit<typeof filter, "price" | "sort">, value: string }) => {
    const isFilterApplied = filter[category].includes(value as never);
    if (isFilterApplied) {
      setFilter((prev) => ({ ...prev, [category]: prev[category].filter((v: any) => v !== value) }));
    } else {
      setFilter((prev) => ({ ...prev, [category]: [...prev[category], value] }));
    }
  };

  const minPrice = Math.min(filter.price.range[0], filter.price.range[1]);
  const maxPrice = Math.max(filter.price.range[0], filter.price.range[1]);

  const filteredData = useMemo(() => data?.data || [], [data, filter]);

  return (
    <main>
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
        <h1 className="text-4xl font-bold tracking-tight">
          {data?.data?.[0]?.auction?.name}
        </h1>
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
              Sort
              <ChevronDown className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel >
                {SORT_OPTIONS.map((option) => (
                  <button key={option.name}
                    className={cn('text-left w-full block py-2 px-4 text-sm',
                      { "text-gray-900": option.value === filter.sort, "text-gray-500": option.value !== filter.sort }
                    )}
                    onClick={() => setFilter((prev) => ({ ...prev, sort: option.value }))}
                  >
                    {option.name}
                  </button>
                ))}
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
          <button className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>
      <section className="pb-24 pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* Filters */}
          <div className="hidden lg:block lg:col-span-1">
            <Accordion type="multiple" className=" animate-none">
              <AccordionItem value="category" >
                <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
                  Category
                </AccordionTrigger>
                <AccordionContent className="pt-6 animate-none">
                  <ul className="space-y-4">
                    {CATEGORIES?.options?.map((option, idx) => (
                      <li key={option.value} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`category-${idx}`}
                          onChange={() => applyArrayFilter({ category: "category", value: option.value })}
                          checked={filter.category?.includes(option.value)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={`category-${idx}`} className="ml-3 text-sm text-gray-600">
                          {option.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Price filter */}
              <AccordionItem value="price" >
                <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
                  Price
                </AccordionTrigger>
                <AccordionContent className="pt-6 animate-none">
                  <ul className="space-y-4">
                    {PRICE_FILTERS.options.map((option, idx) => (
                      <li key={option.label} className="flex items-center">
                        <input
                          type="radio"
                          id={`price-${idx}`}
                          onChange={() => setFilter((prev) => ({ ...prev, price: { isCustom: false, range: [...option.value] } }))}
                          checked={
                            !filter.price.isCustom &&
                            filter.price.range[0] === option.value[0] &&
                            filter.price.range[1] === option.value[1]
                          }
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={`color-${idx}`} className="ml-3 text-sm text-gray-600">
                          {option.label}
                        </label>
                      </li>
                    ))}
                    <li className="flex items-center">
                      <input
                        type="radio"
                        id={`price-${PRICE_FILTERS.options.length}`}
                        onChange={() => setFilter((prev) => ({ ...prev, price: { isCustom: true, range: DEFAULT_CUSTOM_PRICE_RANGE } }))}
                        checked={filter.price.isCustom}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor={`price-${PRICE_FILTERS.options.length}`} className="ml-3 text-sm text-gray-600">
                        Custom
                      </label>
                    </li>
                    <div className="flex justify-between">
                      <p className="font-medium">Price </p>
                      <div>
                        ${filter.price.isCustom ? minPrice.toFixed(0) : filter.price.range[0].toFixed(0)} {' '} -
                        ${filter.price.isCustom ? maxPrice.toFixed(0) : filter.price.range[1].toFixed(0)}
                      </div>
                    </div>
                    <Slider
                      className={cn({
                        'opacity-50': !filter.price.isCustom,
                      })}
                      value={filter.price.isCustom ? filter.price.range : DEFAULT_CUSTOM_PRICE_RANGE}
                      min={DEFAULT_CUSTOM_PRICE_RANGE[0]}
                      max={DEFAULT_CUSTOM_PRICE_RANGE[1]}
                      defaultValue={DEFAULT_CUSTOM_PRICE_RANGE}
                      step={5}
                      onValueChange={(range) => {
                        const [newMin, newMax] = range;
                        setFilter((prev) => ({ ...prev, price: { isCustom: true, range: [newMin, newMax] } }));
                      }}
                      disabled={!filter.price.isCustom}
                    />
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Product grid */}
          <ul className="relative lg:col-span-3 grid grid-cols-1 gap-8 ">
            <main className="flex flex-row gap-2 mt-2">
              <section className="flex-grow">
                {isDataLoading || isMutating ? (
                  new Array(12).fill(null).map((_, idx) => <LotSkeleton key={idx} />)
                ) : Array.isArray(filteredData) && filteredData !== undefined && filteredData.length < 1 ? (
                  <LotEmptyState />
                ) : (
                  Array.isArray(filteredData) && filteredData.length > 0 && filteredData.map((lot) => <LotCard key={lot.id} lot={lot} />)
                )}
              </section>
            </main>
            <PaginationComponent pageIndex={pageIndex} setPageIndex={setPageIndex} perPage={perPage} count={data?.count} />
          </ul>
        </div>
      </section>
    </main>
  );
}
