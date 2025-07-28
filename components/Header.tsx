"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useState } from "react";
import SignInFormModal from "./auth/SignInFormModal";
import RegisterFormModal from "./auth/RegisterFormModal";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const user = session?.user;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 h-16 flex items-center justify-between px-4 sm:px-6 py-4  bg-background dark:bg-background">
        <div className="flex items-center gap-4 w-full max-w-md">
          <Image
            src="/logo.png"
            alt="Logo"
            width={180}
            height={180}
            className="hidden sm:block"
          />
        </div>

        <div className="flex items-center gap-4 w-full justify-end">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-gray-700 dark:text-gray-300 cursor-pointer"
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
                Logout
              </Button>
            </div>
          ) : (
            <Button
              className="cursor-pointer"
              size="sm"
              onClick={() => setOpenLogin(true)}
            >
              Login
            </Button>
          )}
        </div>
        {openLogin && (
          <SignInFormModal
            open={openLogin}
            onClose={() => setOpenLogin(false)}
            onSwitchToRegister={() => {
              setOpenLogin(false);
              setOpenRegister(true);
            }}
          />
        )}
        {openRegister && (
          <RegisterFormModal
            open={openRegister}
            onClose={() => setOpenRegister(false)}
            onSwitchToLogin={() => {
              setOpenRegister(false);
              setOpenLogin(true);
            }}
          />
        )}
      </header>
    </>
  );
}
