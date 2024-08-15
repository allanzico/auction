import BreadcrumbComponent from "@/components/breadcrumb";
import PageLayout from "@/components/page-layout";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

 
        <PageLayout>
          <BreadcrumbComponent />
          {children}
        </PageLayout>

  );
}