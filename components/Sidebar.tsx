// components/Sidebar.tsx
"use client";

import {
  BookOpen,
  Brain,
  HomeIcon,
  ListPlusIcon,
  LogOutIcon,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";

const navItems = [
  { icon: <HomeIcon size={20} />, label: "Dashboard", href: "/" },
  { icon: <ListPlusIcon size={20} />, label: "Leaderboard", href: "/list" },
  {
    icon: <BookOpen size={20} />,
    label: "Flashcards",
    href: "/flashcards",
  },
  { icon: <Brain size={20} />, label: "Quick", href: "/quick" },
  { icon: <SettingsIcon size={20} />, label: "Settings", href: "/settings" },
  { icon: <LogOutIcon size={20} />, label: "Sign Out" },
];

export default function Sidebar() {
  return (
    <aside className="fixed top-[64px] left-0 bottom-0 z-50 w-16 bg-white dark:bg-gray-800 shadow-md p-4 flex flex-col justify-between overflow-hid">
      <div className="space-y-2">
        {navItems.map(({ icon: Icon, label, href = "" }, idx) => (
          <div key={idx} className="relative group">
            <Link
              href={(href as string) || "#"}
              className="flex items-center justify-center p-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
            >
              <div className="shrink-0"> {Icon}</div>
            </Link>
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap px-3 py-1 text-sm rounded bg-gray-900 text-white opacity-0 group-hover:opacity-100 group-hover:z-150 transition-opacity">
              {label}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
