"use client";

import { createVocab } from "@/app/api/vocab/route";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Vocabulary } from "@/types/vocabulary";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import ImageUpload from "./Upload";
import { useForm } from "react-hook-form";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  defaultValues?: Vocabulary | null;
}

export default function VocabFormDialog({
  open,
  onClose,
  defaultValues,
}: Props) {
  const initialState = {
    error: null,
    fieldErrors: {},
    success: false,
  };

  const form = useForm();
  const { watch } = form;

  const [state, formAction] = useActionState(createVocab, initialState);

  const handleUpload = (file: File) => {
    // Gửi file này lên server, Cloudinary, hay S3
    console.log("Uploaded file:", file);
  };

  useEffect(() => {
    if (state?.success) {
      onClose();
      toast.success("Add vocabulary successfully");
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="!w-full !max-w-[820px]">
        <DialogHeader>
          <DialogTitle>
            {defaultValues ? "Edit Vocabulary" : "Add Vocabulary"}
          </DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-4 mt-6">
          <div className="flex gap-6">
            <div className="flex flex-col gap-6 w-full">
              <div className="flex gap-6 align-center">
                <div className="w-1/2">
                  <label className="text-sm" htmlFor="word">
                    Word
                    <span className="text-red-500">*</span>
                  </label>
                  <Input
                    defaultValue={defaultValues?.word || ""}
                    name="word"
                    placeholder="Type word"
                    className="py-5 rounded-sm mt-2"
                  />
                  {state?.fieldErrors?.word && (
                    <p className="text-sm text-red-500">
                      {state.fieldErrors.word[0]}
                    </p>
                  )}
                </div>

                <div className="w-1/2">
                  <label className="text-sm" htmlFor="pronunciation">
                    Pronunciation
                  </label>
                  <Input
                    className="py-5 rounded-sm mt-2"
                    name="pronunciation"
                    placeholder="Type pronunciation"
                  />
                  {state?.fieldErrors?.pronunciation && (
                    <p className="text-sm text-red-500">
                      {state.fieldErrors.pronunciation[0]}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm" htmlFor="meaning">
                  Meaning
                  <span className="text-red-500">*</span>
                </label>
                <Input
                  className="py-5 rounded-sm mt-2"
                  name="meaning"
                  placeholder="Type meaning"
                  defaultValue={defaultValues?.meaning || ""}
                />
                {state?.fieldErrors?.meaning && (
                  <p className="text-sm text-red-500">
                    {state.fieldErrors.meaning[0]}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm" htmlFor="example">
                  Example
                </label>
                <Textarea
                  className="py-5 rounded-sm mt-2"
                  defaultValue={defaultValues?.example || ""}
                  name="example"
                  placeholder="Enter example"
                />
              </div>
            </div>

            <div className="w-1/3">
              <label className="text-sm" htmlFor="image">
                Image
              </label>
              <ImageUpload />
            </div>
          </div>

          {state?.error && !state?.fieldErrors && (
            <p className="text-red-500 text-sm">{state.error}</p>
          )}
          <div className="flex justify-end mt-8">
            <Button className="cursor-pointer" type="submit">
              {defaultValues ? "Update Vocabulary" : "Add Vocabulary"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
