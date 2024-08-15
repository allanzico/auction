
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
import { useEffect, useState } from "react";

const BreadcrumbComponent = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter((segment) => segment);
  const isHome = pathname === '/' || pathname === '/home';
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient &&     <Breadcrumb className="py-8">
  <BreadcrumbList>
  {!isHome && (
    <BreadcrumbItem>
      <Link href="/">Home</Link>
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
          <div className="flex items-center">
          {index === pathSegments.length - 1 ? (
                    <BreadcrumbItem>
                    <BreadcrumbPage > {segment}</BreadcrumbPage>
                  </BreadcrumbItem>
            ) : (
              <Link href={href}>{segment}</Link>
            )}
          </div>
        
        </BreadcrumbItem>
        )})}
  </BreadcrumbList>
</Breadcrumb>
};

export default BreadcrumbComponent;
