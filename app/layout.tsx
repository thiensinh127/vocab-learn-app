// app/layout.tsx
import type { Metadata } from "next"
import "@/app/globals.css"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"

export const metadata: Metadata = {
  title: "Dashboard | Dabang",
  description: "Modern dashboard layout using Next.js 15 + Tailwind v4",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-white">
        <div className="flex min-h-screen w-full">
          <Sidebar />
          <main className="flex-1 bg-gray-50 dark:bg-gray-900">
            <Header />
            <div className="p-6 space-y-6 ml-[60px] mt-[64px]">{children}</div>
          </main>
        </div>
      </body>
    </html>
  )
}