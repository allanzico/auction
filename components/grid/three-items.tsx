
import Link from 'next/link';
import { GridTileImage } from './tile';
import { Lot } from '@prisma/client';
import { getImageUrl } from '@/lib/utils';

function ThreeItemGridItem({
  item,
  size,
  priority
}: {
  item: Lot;
  size: 'full' | 'half';
  priority?: boolean;
}) {
  return (
    <div
      className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}
    >
      <Link className="relative block aspect-square h-full w-full" href={`/auction/${item.id}`}>
        <GridTileImage
          src={getImageUrl(item.file)}
          fill
          sizes={
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          alt={item.name}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item.name as string,
            amount: item.price.toString(),
            currencyCode: 'USD'
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      {/* <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      <ThreeItemGridItem size="half" item={thirdProduct} /> */}
    </section>
  );
}