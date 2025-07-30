"use client";

import { Search, Filter } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface WordFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  difficultyFilter: string;
  onDifficultyChange: (value: string) => void;
  partOfSpeechFilter: string;
  onPartOfSpeechChange: (value: string) => void;
  learnedFilter: string;
  onLearnedChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  totalWords: number;
  learnedWords: number;
}

export function WordFilters({
  searchTerm,
  onSearchChange,
  difficultyFilter,
  onDifficultyChange,
  partOfSpeechFilter,
  onPartOfSpeechChange,
  learnedFilter,
  onLearnedChange,
  sortBy,
  onSortChange,
  totalWords,
  learnedWords,
}: WordFiltersProps) {
  const clearFilters = () => {
    onSearchChange("");
    onDifficultyChange("all");
    onPartOfSpeechChange("all");
    onLearnedChange("all");
    onSortChange("word");
  };

  const hasActiveFilters =
    searchTerm ||
    difficultyFilter !== "all" ||
    partOfSpeechFilter !== "all" ||
    learnedFilter !== "all";

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="flex items-center space-x-4">
        <Badge
          variant="secondary"
          className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
        >
          Total: {totalWords}
        </Badge>
        <Badge
          variant="secondary"
          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
        >
          Learned: {learnedWords}
        </Badge>
        <Badge
          variant="secondary"
          className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
        >
          Remaining: {totalWords - learnedWords}
        </Badge>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search words..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Select value={difficultyFilter} onValueChange={onDifficultyChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={partOfSpeechFilter}
            onValueChange={onPartOfSpeechChange}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Part of Speech" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="noun">Noun</SelectItem>
              <SelectItem value="verb">Verb</SelectItem>
              <SelectItem value="adjective">Adjective</SelectItem>
              <SelectItem value="adverb">Adverb</SelectItem>
            </SelectContent>
          </Select>

          <Select value={learnedFilter} onValueChange={onLearnedChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Words</SelectItem>
              <SelectItem value="learned">Learned</SelectItem>
              <SelectItem value="unlearned">Not Learned</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="word">Word A-Z</SelectItem>
              <SelectItem value="difficulty">Difficulty</SelectItem>
              <SelectItem value="partOfSpeech">Part of Speech</SelectItem>
              <SelectItem value="learned">Learned Status</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button variant="outline" onClick={clearFilters}>
              <Filter className="h-4 w-4 mr-2" />
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
