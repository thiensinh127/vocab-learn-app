"use client";

import { useState } from "react";
import { Volume2, RotateCcw } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Word {
  id: string;
  word: string;
  pronunciation: string;
  meaning: string;
  example: string;
  partOfSpeech: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

interface FlashcardProps {
  word: Word;
  isFlipped: boolean;
  onFlip: () => void;
  onSpeak: (text: string) => void;
}

export function Flashcard({
  word,
  isFlipped,
  onFlip,
  onSpeak,
}: FlashcardProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onFlip();
      setIsAnimating(false);
    }, 150);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Card
        className={`h-80 cursor-pointer transition-all duration-300 hover:shadow-xl ${
          isAnimating ? "scale-95" : "scale-100"
        }`}
        onClick={handleFlip}
      >
        <CardContent className="p-0 h-full">
          <div className="relative h-full flex flex-col justify-center items-center p-8 text-center">
            {/* Difficulty Badge */}
            <div className="absolute top-4 right-4">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                  word.difficulty
                )}`}
              >
                {word.difficulty}
              </span>
            </div>

            {/* Flip Indicator */}
            <div className="absolute top-4 left-4">
              <RotateCcw className="h-4 w-4 text-muted-foreground" />
            </div>

            {!isFlipped ? (
              // Front Side - Word
              <div className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-wide">
                    {word.word}
                  </h2>
                  <p className="text-lg text-muted-foreground font-light">
                    {word.pronunciation}
                  </p>
                  <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 rounded-full text-sm font-medium">
                    {word.partOfSpeech}
                  </span>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSpeak(word.word);
                  }}
                  className="mt-4"
                >
                  <Volume2 className="h-5 w-5" />
                </Button>

                <p className="text-sm text-muted-foreground mt-6">
                  Click to see meaning
                </p>
              </div>
            ) : (
              // Back Side - Meaning
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {word.meaning}
                  </h3>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground font-medium">
                      Example:
                    </p>
                    <p className="text-base italic text-gray-700 dark:text-gray-300 leading-relaxed">
                      &quot;{word.example}&quot;
                    </p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSpeak(word.example);
                  }}
                  className="mt-4"
                >
                  <Volume2 className="h-5 w-5" />
                </Button>

                <p className="text-sm text-muted-foreground mt-6">
                  Click to see word
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
