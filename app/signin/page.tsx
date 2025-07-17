"use client";

import SignInFormModal from "@/components/auth/SignInFormModal";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    router.back();
  };

  return <SignInFormModal open={open} onClose={handleClose} />;
}
