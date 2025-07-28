"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { vocabSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";

export async function createVocab(prevState: unknown, formData: FormData) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return { error: "Unauthorized" };

  const parsed = vocabSchema.safeParse({
    word: formData.get("word"),
    meaning: formData.get("meaning"),
    example: formData.get("example"),
    known: formData.get("known") === "on",
  });

  if (!parsed.success) {
    return {
      error: "Validation failed",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  await prisma.vocabulary.create({ data: { ...parsed.data, userId } });

  revalidatePath("/vocab");
  return { success: true };
}

export async function updateVocab(id: string, formData: FormData) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return { error: "Unauthorized" };

  const parsed = vocabSchema.safeParse({
    word: formData.get("word"),
    meaning: formData.get("meaning"),
    example: formData.get("example"),
    known: formData.get("known") === "on",
  });

  if (!parsed.success) return { error: parsed.error.format() };

  await prisma.vocabulary.update({
    where: { id },
    data: parsed.data,
  });

  revalidatePath("/vocab");
  return { success: true };
}

export async function deleteVocab(id: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return { error: "Unauthorized" };

  try {
    await prisma.vocabulary.delete({ where: { id } });
    revalidatePath("/vocab");
    return { success: true };
  } catch {
    return { error: "Something went wrong" };
  }
}
