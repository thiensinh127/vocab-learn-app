"use client";

import { BellIcon, MoonIcon, SunIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export default function Header() {
  const navigate = useRouter();

  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  const user = session?.user;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 h-16 flex items-center justify-between px-4 sm:px-6 py-4 border-b bg-white dark:bg-gray-800">
        <div className="flex items-center gap-4 w-full max-w-md">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="hidden sm:block"
          />
        </div>

        <div className="flex items-center gap-4 w-full">
          <Input placeholder="Search here..." className="w-full" />

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-gray-700 dark:text-gray-300"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <Image
                src={user.image || "https://i.pravatar.cc/300"}
                alt="avatar"
                width={32}
                height={32}
                className="rounded-full"
              />

              <Button
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={() => signOut()}
              >
                Đăng xuất
              </Button>
            </div>
          ) : (
            <Button size="sm" onClick={() => navigate.push("/signin")}>
              Đăng nhập
            </Button>
          )}
        </div>
      </header>
    </>
  );
}
