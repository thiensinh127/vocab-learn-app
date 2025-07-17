"use server";

import { authSchema } from "@/lib/schema";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function checkUser(email: string) {
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  return existing;
}

export async function registerAction(_: unknown, formData: FormData) {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = authSchema.safeParse(raw);
  if (!parsed.success) {
    return { status: "error", message: "Thông tin không hợp lệ" };
  }

  const { email, password } = parsed.data;

  const existing = await checkUser(email);
  if (existing) {
    return { status: "error", message: "Email đã được sử dụng" };
  }

  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      passwordHash: hashed,
    },
  });

  return { status: "success", email, password };
}
