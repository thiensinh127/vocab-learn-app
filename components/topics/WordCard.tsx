"use client";

import { useState } from "react";
import { Edit, Trash2, Volume2, MoreVertical, Check, X } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

interface WordCardProps {
  word: Word;
  onEdit: (word: Word) => void;
  onDelete: (id: string) => void;
  onToggleLearned: (id: string) => void;
  onSpeak: (text: string) => void;
}

export function WordCard({
  word,
  onEdit,
  onDelete,
  onToggleLearned,
  onSpeak,
}: WordCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

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

  const getPartOfSpeechColor = (pos: string) => {
    const colors: { [key: string]: string } = {
      noun: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      verb: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      adjective:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      adverb: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
    };
    return (
      colors[pos] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    );
  };

  return (
    <Card
      className={`group hover:shadow-lg transition-all duration-200 ${
        word.isLearned
          ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
          : ""
      }`}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-lg font-semibold tracking-wide">
                  {word.word}
                </h3>
                {word.pronunciation && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => onSpeak(word.word)}
                  >
                    <Volume2 className="h-3 w-3" />
                  </Button>
                )}
                {word.isLearned && <Check className="h-4 w-4 text-green-600" />}
              </div>
              {word.pronunciation && (
                <p className="text-sm text-muted-foreground font-light">
                  {word.pronunciation}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 ${
                  word.isLearned ? "text-green-600" : "text-gray-400"
                }`}
                onClick={() => onToggleLearned(word.id)}
              >
                {word.isLearned ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <X className="h-4 w-4" />
                )}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(word)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Word
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onDelete(word.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Word
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Badges */}
          <div className="flex items-center space-x-2">
            <Badge
              variant="secondary"
              className={getDifficultyColor(word.difficulty)}
            >
              {word.difficulty}
            </Badge>
            {word.partOfSpeech && (
              <Badge
                variant="secondary"
                className={getPartOfSpeechColor(word.partOfSpeech)}
              >
                {word.partOfSpeech}
              </Badge>
            )}
          </div>

          {/* Meaning */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {word.meaning}
            </p>

            {word.example && (
              <div
                className={`space-y-1 ${
                  !isExpanded && word.example.length > 100
                    ? "cursor-pointer"
                    : ""
                }`}
                onClick={() =>
                  word.example.length > 100 && setIsExpanded(!isExpanded)
                }
              >
                <p className="text-xs text-muted-foreground font-medium">
                  Example:
                </p>
                <p className="text-sm italic text-gray-700 dark:text-gray-300 leading-relaxed">
                  &quot;
                  {isExpanded || word.example.length <= 100
                    ? word.example
                    : word.example.substring(0, 100) + "..."}
                  &quot;
                </p>
                {!isExpanded && word.example.length > 100 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-xs text-indigo-600"
                  >
                    Show more
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
