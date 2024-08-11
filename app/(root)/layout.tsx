import BreadcrumbComponent from "@/components/breadcrumb";
import PageLayout from "@/components/page-layout";
import { SessionProvider } from "next-auth/react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <SessionProvider >
        <PageLayout>
          <BreadcrumbComponent />
          {children}
        </PageLayout>
      </SessionProvider>
    </>
  );
}