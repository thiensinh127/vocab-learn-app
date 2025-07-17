import "./globals.css";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Dashboard | Dabang",
  description: "Modern dashboard layout using Next.js 15 + Tailwind v4",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body data-new-gr-c-s-check-loaded="14.1112.0" data-gr-ext-installed="">
        <Providers>
          <div className="flex min-h-screen w-full">
            <Sidebar />
            <main className="flex-1 bg-gray-50 dark:bg-gray-900">
              <Header />
              <div className="p-6 space-y-6 ml-[60px] mt-[64px]">
                {children}
              </div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
