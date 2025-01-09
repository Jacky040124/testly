
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { EnvironmentProvider } from "@/contexts/EnvironmentContext";

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    
  return (
    <html lang="en">
      <EnvironmentProvider>
        <UserProvider>
          <body>{children}</body>
        </UserProvider>
      </EnvironmentProvider>
    </html>
  );
}
