import { SessionProvider } from "next-auth/react";

export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
 
    return (
  <>
  <SessionProvider >
   <div className="w-full">
   {children}
      </div>
      </SessionProvider>
      </>
    );
  }