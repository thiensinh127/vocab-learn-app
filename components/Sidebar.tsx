// components/Sidebar.tsx
'use client'

import {
  BarChartIcon,
  HomeIcon,
  LogOutIcon,
  MailIcon,
  SettingsIcon
} from "lucide-react"
import Link from "next/link"

const navItems = [

  { icon: HomeIcon, label: "Dashboard" },
  { icon: BarChartIcon, label: "Leaderboard" },



  { icon: MailIcon, label: "Messages" },
  { icon: SettingsIcon, label: "Settings" },
  { icon: LogOutIcon, label: "Sign Out" },
]

export default function Sidebar() {
  return (
    <aside className="fixed top-[64px] left-0 bottom-0 z-50 w-16 bg-white dark:bg-gray-800 shadow-md p-4 flex flex-col justify-between overflow-hid">
      <div className="space-y-2">
        
        {navItems.map(({ icon: Icon, label }, idx) => (
          <div key={idx} className="relative group">
            <Link
              href="#"
              className="flex items-center justify-center p-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
            >
              <Icon className="w-10 h-10" />
            </Link>
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap px-3 py-1 text-sm rounded bg-gray-900 text-white opacity-0 group-hover:opacity-100 group-hover:z-150 transition-opacity">
              {label}
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}