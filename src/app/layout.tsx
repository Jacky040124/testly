import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { GlobalProvider } from "@/contexts/GlobalContext";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }: { 
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <GlobalProvider>
            <UserProvider>{children}</UserProvider>
          </GlobalProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
