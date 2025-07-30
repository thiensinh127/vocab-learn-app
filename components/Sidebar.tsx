// components/Sidebar.tsx
"use client";

import { FaBrain, FaThList } from "react-icons/fa";
import { HiMiniHome } from "react-icons/hi2";
import { ImBook } from "react-icons/im";
import { IoLogOut } from "react-icons/io5";
import { RiSettings3Fill } from "react-icons/ri";

import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
  { icon: <HiMiniHome size={24} />, label: "Dashboard", href: "/" },
  { icon: <FaThList size={24} />, label: "Topics", href: "/topics" },
  { icon: <ImBook size={24} />, label: "Flashcards", href: "/flashcards" },
  { icon: <FaBrain size={24} />, label: "Quick", href: "/quick" },
  { icon: <RiSettings3Fill size={24} />, label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const pathName = usePathname().split("/")[1];

  return (
    <aside
      className="fixed top-[64px] left-12 bottom-0 z-50 w-16 p-6 flex flex-col justify-between items-center gap-8 rounded-3xl h-[calc(100%-112px)] my-auto border-border shadow-md"
      style={{ background: "var(--sidebar-gradient)" }}
    >
      <div className="space-y-2">
        {navItems.map(({ icon: Icon, label, href = "" }, idx) => {
          const isActive = pathName === href.split("/")[1];

          return (
            <div key={idx}>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    href={href || "#"}
                    className={clsx(
                      "flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 tracking-wide",
                      isActive
                        ? "bg-gradient-indigo-purple text-white shadow-lg"
                        : "text-gray-600 hover:bg-white/50 dark:text-gray-300 dark:hover:bg-slate-700/50"
                    )}
                  >
                    <div className="shrink-0">{Icon}</div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-sm font-medium">
                  {label}
                </TooltipContent>
              </Tooltip>
            </div>
          );
        })}
      </div>
      <div>
        <Tooltip>
          <TooltipTrigger>
            <div
              className="flex cursor-pointer items-center justify-center p-3 rounded-md transition-all text-gray-600 hover:bg-white/50 dark:text-gray-300 dark:hover:bg-slate-700/50"
              // onClick={() => {
              //   // TODO: Add actual logout logic
              //   console.log("Logging out...");
              // }}
            >
              <IoLogOut size={24} />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-sm font-medium">
            Sign Out
          </TooltipContent>
        </Tooltip>
      </div>
    </aside>
  );
}
