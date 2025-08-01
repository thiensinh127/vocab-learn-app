"use client";

import { ArrowLeft, Clock, Target, Trophy } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { StudySettingsDialog } from "./StudySettingsDialog";
import Link from "next/link";
import { Button } from "../ui/button";

interface StudySessionHeaderProps {
  topicName: string;
  sessionTime: string;
  correctAnswers: number;
  totalAnswered: number;
  streak: number;
  settings: {
    autoFlip: boolean;
    autoFlipDelay: number;
    showPronunciation: boolean;
    shuffleCards: boolean;
    studyMode: string;
  };
  onSettingsChange: (settings: any) => void;
}

export function StudySessionHeader({
  topicName,
  sessionTime,
  correctAnswers,
  totalAnswered,
  streak,
  settings,
  onSettingsChange,
}: StudySessionHeaderProps) {
  const accuracy =
    totalAnswered > 0 ? Math.round((correctAnswers / totalAnswered) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between ">
        <div className="flex items-center space-x-4 justify-between w-full bg-white dark:bg-gray-800 py-4 px-6 rounded-2xl">
          <div className="flex items-center space-x-4 ">
            <Link href="/topics">
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-wide">
                {topicName}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 font-light">
                Flashcard Study Session
              </p>
            </div>
          </div>

          <StudySettingsDialog
            settings={settings}
            onSettingsChange={onSettingsChange}
          />
        </div>
      </div>

      {/* Session Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Session Time</p>
                <p className="text-lg font-semibold">{sessionTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Target className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Accuracy</p>
                <p className="text-lg font-semibold">{accuracy}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Trophy className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Streak</p>
                <p className="text-lg font-semibold">{streak}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
