"use client";

import type React from "react";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Word {
  id: string;
  word: string;
  pronunciation: string;
  meaning: string;
  example: string;
  partOfSpeech: string;
  difficulty: "Easy" | "Medium" | "Hard";
  isLearned: boolean;
}

interface AddWordDialogProps {
  onAddWord: (word: Omit<Word, "id" | "isLearned">) => void;
}

export function AddWordDialog({ onAddWord }: AddWordDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    word: "",
    pronunciation: "",
    meaning: "",
    example: "",
    partOfSpeech: "",
    difficulty: "Medium" as "Easy" | "Medium" | "Hard",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.word || !formData.meaning) return;

    onAddWord(formData);
    setFormData({
      word: "",
      pronunciation: "",
      meaning: "",
      example: "",
      partOfSpeech: "",
      difficulty: "Medium",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-indigo-purple hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          Add Word
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Word</DialogTitle>
          <DialogDescription>
            Add a new vocabulary word to this topic.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="word">Word *</Label>
                <Input
                  id="word"
                  value={formData.word}
                  onChange={(e) =>
                    setFormData({ ...formData, word: e.target.value })
                  }
                  placeholder="e.g., entrepreneur"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pronunciation">Pronunciation</Label>
                <Input
                  id="pronunciation"
                  value={formData.pronunciation}
                  onChange={(e) =>
                    setFormData({ ...formData, pronunciation: e.target.value })
                  }
                  placeholder="e.g., /ˌɑːntrəprəˈnɜːr/"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="meaning">Meaning *</Label>
              <Textarea
                id="meaning"
                value={formData.meaning}
                onChange={(e) =>
                  setFormData({ ...formData, meaning: e.target.value })
                }
                placeholder="Definition of the word..."
                rows={2}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="example">Example Sentence</Label>
              <Textarea
                id="example"
                value={formData.example}
                onChange={(e) =>
                  setFormData({ ...formData, example: e.target.value })
                }
                placeholder="Example sentence using this word..."
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="partOfSpeech">Part of Speech</Label>
                <Select
                  value={formData.partOfSpeech}
                  onValueChange={(value) =>
                    setFormData({ ...formData, partOfSpeech: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="noun">Noun</SelectItem>
                    <SelectItem value="verb">Verb</SelectItem>
                    <SelectItem value="adjective">Adjective</SelectItem>
                    <SelectItem value="adverb">Adverb</SelectItem>
                    <SelectItem value="preposition">Preposition</SelectItem>
                    <SelectItem value="conjunction">Conjunction</SelectItem>
                    <SelectItem value="interjection">Interjection</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      difficulty: value as "Easy" | "Medium" | "Hard",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-indigo-purple hover:opacity-90"
            >
              Add Word
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
