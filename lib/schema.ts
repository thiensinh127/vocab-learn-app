import { z } from "zod";

export const vocabSchema = z.object({
  word: z.string().min(1, "Field is required"),
  meaning: z.string().min(2, "Field is invalid"),
  example: z.string().optional(),
  known: z.boolean().optional(),
  pronunciation: z.string().optional(),
  partOfSpeech: z.string().optional(),
  topic: z.string().optional(),
  image: z.string().optional(),
});

export type VocabFormData = z.infer<typeof vocabSchema>;

export const authSchema = z.object({
  email: z.string().email({ message: "Email is invalid" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type AuthFormData = z.infer<typeof authSchema>;
