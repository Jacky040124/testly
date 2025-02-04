import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { GlobalProvider } from "@/contexts/GlobalContext";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <GlobalProvider>
        <UserProvider>
          <body>{children}</body>
        </UserProvider>
      </GlobalProvider>
    </html>
  );
}
