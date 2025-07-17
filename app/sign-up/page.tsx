"use client";

import RegisterFormModal from "@/components/auth/RegisterFormModal";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    router.back();
  };

  return <RegisterFormModal open={open} onClose={handleClose} />;
}
