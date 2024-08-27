import { getCategoriesInAuction } from "@/actions/auction";
import { getLotsInAuction } from "@/actions/lot";
import AuctionLots from "@/components/auction/auction-lots";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";



export default async function Page({params}: any) {
  const {id} = params
  const categories = await getCategoriesInAuction(id.toString())
  const queryclient  = new QueryClient()
  await queryclient.prefetchQuery({
    queryKey: ["categories", id.toString()],
    queryFn: () => getCategoriesInAuction(id.toString()),
  })

  return (
    <>
   <HydrationBoundary state={dehydrate(queryclient)}>
   <AuctionLots id={id} categories={categories} />
   </HydrationBoundary> 
    </>
  )
}