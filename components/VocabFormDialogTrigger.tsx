"use client";

import { useState } from "react";
import VocabFormDialog from "./VocabFormDialog";
import { useRouter } from "next/navigation";

export default function VocabFormDialogTrigger() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        onClick={() => setOpen(true)}
      >
        + Add Vocabulary
      </button>

      <VocabFormDialog
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={() => {
          setOpen(false);
          router.refresh();
        }}
      />
    </>
  );
}
