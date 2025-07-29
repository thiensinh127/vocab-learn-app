import "./globals.css";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Providers } from "./providers";
import { Plus_Jakarta_Sans } from "next/font/google";

export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
});
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${plusJakarta.variable}`}
        data-new-gr-c-s-check-loaded="14.1112.0"
        data-gr-ext-installed=""
      >
        <Providers>
          <div className="flex min-h-screen w-full">
            <Sidebar />
            <main className="flex-1">
              <Header />
              <div className="mt-[64px]">{children}</div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
