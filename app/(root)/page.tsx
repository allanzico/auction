
import { getLotsInAuction } from "@/actions/lot";
import AuctionsList from "@/components/list";
import { ProductState } from "@/lib/validators/product-validators";

export default async function Home() {

  return <AuctionsList />;
}
