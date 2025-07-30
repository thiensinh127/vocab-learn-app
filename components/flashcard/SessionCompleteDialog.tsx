"use client";

import { Trophy, Target, Clock, BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

interface SessionCompleteDialogProps {
  open: boolean;
  onClose: () => void;
  onRestart: () => void;
  onReviewMistakes: () => void;
  stats: {
    totalCards: number;
    correctAnswers: number;
    sessionTime: string;
    accuracy: number;
    newWordsLearned: number;
  };
}

export function SessionCompleteDialog({
  open,
  onClose,
  onRestart,
  onReviewMistakes,
  stats,
}: SessionCompleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="p-4 bg-gradient-indigo-purple rounded-full">
              <Trophy className="h-8 w-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            Session Complete!
          </DialogTitle>
          <DialogDescription className="text-center">
            Great job! Here's how you performed in this study session.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold">{stats.accuracy}%</p>
              <p className="text-sm text-muted-foreground">Accuracy</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold">{stats.sessionTime}</p>
              <p className="text-sm text-muted-foreground">Time Spent</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <BookOpen className="h-6 w-6 mx-auto mb-2 text-purple-600" />
              <p className="text-2xl font-bold">
                {stats.correctAnswers}/{stats.totalCards}
              </p>
              <p className="text-sm text-muted-foreground">Correct</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="h-6 w-6 mx-auto mb-2 text-orange-600" />
              <p className="text-2xl font-bold">{stats.newWordsLearned}</p>
              <p className="text-sm text-muted-foreground">New Words</p>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="flex-col space-y-2">
          <div className="flex space-x-2 w-full">
            <Button
              variant="outline"
              onClick={onReviewMistakes}
              className="flex-1 bg-transparent"
            >
              Review Mistakes
            </Button>
            <Button
              onClick={onRestart}
              className="flex-1 bg-gradient-indigo-purple hover:opacity-90"
            >
              Study Again
            </Button>
          </div>
          <Button variant="ghost" onClick={onClose} className="w-full">
            Back to Topics
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
