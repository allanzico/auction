import PageLayout from "@/components/page-layout";
import { SessionProvider } from "next-auth/react";

export default async function RootLayout({
    children,
    breadcrumbs,
  }: Readonly<{
    children: React.ReactNode;
    breadcrumbs: React.ReactNode;
  }>) {
 
    return (
  <>
  <SessionProvider >
    <PageLayout>
    {breadcrumbs}
    {children}
    </PageLayout>
      </SessionProvider>
      </>
    );
  }