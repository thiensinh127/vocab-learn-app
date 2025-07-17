export interface Vocabulary {
  id: string;
  word: string;
  meaning: string;
  pronunciation?: string | null;
  partOfSpeech?: string | null;
  example?: string | null;
  known?: boolean | null;
  topic?: string | null;
  userId: string;
  createdAt: Date;
  image?: string | null;
}
