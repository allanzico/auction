
'use client';
import Link from "next/link"
 
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from 'next/navigation';

const BreadcrumbComponent = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter((segment) => segment);
  const isHome = pathname === '/' || pathname === '/home';

  return (
    <Breadcrumb>
    <BreadcrumbList>
    {!isHome && (
      <BreadcrumbItem>
        <BreadcrumbLink>
          <Link href="/">Home</Link>
        </BreadcrumbLink>
      </BreadcrumbItem> )}
      {pathSegments.map((segment, index) => {
          const href = '/' + pathSegments.slice(0, index + 1).join('/');
          return (
            <BreadcrumbItem
            key={index}
            className={`breadcrumb-item ${
              index === pathSegments.length - 1 ? 'active' : ''
            }`}
            >
                 <BreadcrumbSeparator />
            <BreadcrumbLink>
            {index === pathSegments.length - 1 ? (
                      <BreadcrumbItem>
                      <BreadcrumbPage > {segment}</BreadcrumbPage>
                    </BreadcrumbItem>
              ) : (
                <Link href={href}>{segment}</Link>
              )}
            </BreadcrumbLink>
          
          </BreadcrumbItem>
          )})}
           

    </BreadcrumbList>
  </Breadcrumb>
   
  );
};

export default BreadcrumbComponent;
