// components/Header.tsx
'use client'

import { BellIcon, GlobeIcon, SunIcon, MoonIcon } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

export default function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme') as 'light' | 'dark'
      if (storedTheme) {
        setTheme(storedTheme)
        document.documentElement.classList.toggle('dark', storedTheme === 'dark')
      }
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 flex items-center justify-between px-4 sm:px-6 py-4 border-b bg-white dark:bg-gray-800">
      <div className="flex items-center gap-4 w-full max-w-md">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={32}
          height={32}
          className="hidden sm:block"
        />
        <Input placeholder="Search here..." className="w-full" />
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="text-gray-700 dark:text-gray-300"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
        </button>

        <button className="hidden sm:flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
          <GlobeIcon className="w-4 h-4" /> Eng (US)
        </button>
        <button className="relative">
          <BellIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        <div className="flex items-center gap-2">
          <Image
            src="https://i.pravatar.cc/300"
            alt="avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="hidden sm:block text-sm text-gray-700 dark:text-gray-200">
            <div className="font-semibold">Musliq</div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
        </div>
      </div>
    </header>
  )
}
