// components/Sidebar.tsx
"use client";

import { FaBrain, FaThList } from "react-icons/fa";
import { HiMiniHome } from "react-icons/hi2";
import { ImBook } from "react-icons/im";
import { IoLogOut } from "react-icons/io5";
import { RiSettings3Fill } from "react-icons/ri";

import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const navItems = [
  { icon: <HiMiniHome size={24} />, label: "Dashboard", href: "/" },
  { icon: <FaThList size={24} />, label: "Topics", href: "/topics" }, // { icon: <FaThList size={24} />, label: "Leaderboard", href: "/list" },
  {
    icon: <ImBook size={24} />,
    label: "Flashcards",
    href: "/flashcards",
  },
  { icon: <FaBrain size={24} />, label: "Quick", href: "/quick" },
  { icon: <RiSettings3Fill size={24} />, label: "Settings", href: "/settings" },
  { icon: <IoLogOut size={24} />, label: "Sign Out" },
];

export default function Sidebar() {
  return (
    <aside className="fixed top-[64px] left-12 bottom-0 z-50 w-16 bg-white dark:bg-foreground shadow-md p-6 flex flex-col justify-between items-center rounded-3xl h-[80%] my-auto ">
      <div className="space-y-2">
        {navItems.map(({ icon: Icon, label, href = "" }, idx) => (
          <div key={idx} className="">
            <Tooltip>
              <TooltipTrigger>
                <Link
                  href={(href as string) || "#"}
                  className="flex  items-center justify-center p-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                >
                  <div className="shrink-0"> {Icon}</div>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{label}</TooltipContent>
            </Tooltip>
          </div>
        ))}
      </div>
    </aside>
  );
}
