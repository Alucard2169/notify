import SortContextProvider from "@/context/sortContext";
import UserContextProvider from "@/context/userContext";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./provider";
import Navbar from "./ui/navbar";

export const metadata: Metadata = {
  title: "Notify",
  description: "Get Version Updates",
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en" className="sm:overflow-hidden">
      <body className="bg-black flex flex-col sm:overflow-hidden">
        <UserContextProvider>
          <SortContextProvider>
            <Providers>
              <header className="relative h-12">
                <Navbar />
              </header>
              <div className="h-full px-4">{children}</div>
            </Providers>
          </SortContextProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}