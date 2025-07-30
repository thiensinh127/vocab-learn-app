"use client";

import { Check, X, SkipForward, Shuffle, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface FlashcardControlsProps {
  currentIndex: number;
  totalCards: number;
  onNext: () => void;
  onPrevious: () => void;
  onMarkKnown: () => void;
  onMarkUnknown: () => void;
  onShuffle: () => void;
  onSettings: () => void;
  progress: number;
}

export function FlashcardControls({
  currentIndex,
  totalCards,
  onNext,
  onPrevious,
  onMarkKnown,
  onMarkUnknown,
  onShuffle,
  onSettings,
  progress,
}: FlashcardControlsProps) {
  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Progress</span>
          <span>
            {currentIndex + 1} / {totalCards}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Main Controls */}
      <div className="flex justify-center space-x-4">
        <Button
          variant="outline"
          size="lg"
          onClick={onMarkUnknown}
          className="flex-1 bg-red-50 hover:bg-red-100 border-red-200 text-red-700 dark:bg-red-950 dark:hover:bg-red-900 dark:border-red-800 dark:text-red-300"
        >
          <X className="h-5 w-5 mr-2" />
          Don't Know
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={onMarkKnown}
          className="flex-1 bg-green-50 hover:bg-green-100 border-green-200 text-green-700 dark:bg-green-950 dark:hover:bg-green-900 dark:border-green-800 dark:text-green-300"
        >
          <Check className="h-5 w-5 mr-2" />
          Know It
        </Button>
      </div>

      {/* Secondary Controls */}
      <div className="flex justify-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevious}
          disabled={currentIndex === 0}
        >
          <SkipForward className="h-4 w-4 rotate-180" />
        </Button>

        <Button variant="ghost" size="icon" onClick={onShuffle}>
          <Shuffle className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="icon" onClick={onSettings}>
          <Settings className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          disabled={currentIndex === totalCards - 1}
        >
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
