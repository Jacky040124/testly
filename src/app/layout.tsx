import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { GlobalProvider } from "@/contexts/GlobalContext";
import { Suspense } from "react";
import Loading from "./loading";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <GlobalProvider>
        <UserProvider>
          <body>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </body>
        </UserProvider>
      </GlobalProvider>
    </html>
  );
}
