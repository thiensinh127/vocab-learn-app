"use client";

import type React from "react";

import { Play, Trophy, Clock, Target } from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface GameStats {
  bestScore: number;
  averageScore: number;
  timesPlayed: number;
  bestTime: string;
}

interface Game {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  difficulty: "Easy" | "Medium" | "Hard";
  estimatedTime: string;
  color: string;
  stats: GameStats;
}

interface GameCardProps {
  game: Game;
  onPlay: (gameId: string) => void;
}

export function GameCard({ game, onPlay }: GameCardProps) {
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
    <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-xl ${game.color}`}>
              <game.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg tracking-wide">
                {game.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {game.description}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-3">
          <Badge
            variant="secondary"
            className={getDifficultyColor(game.difficulty)}
          >
            {game.difficulty}
          </Badge>
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            {game.estimatedTime}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center space-x-1 text-muted-foreground mb-1">
                <Trophy className="h-3 w-3" />
                <span className="text-xs">Best</span>
              </div>
              <p className="text-sm font-medium">{game.stats.bestScore}</p>
            </div>
            <div>
              <div className="flex items-center justify-center space-x-1 text-muted-foreground mb-1">
                <Target className="h-3 w-3" />
                <span className="text-xs">Average</span>
              </div>
              <p className="text-sm font-medium">{game.stats.averageScore}</p>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Played</div>
              <p className="text-sm font-medium">{game.stats.timesPlayed}x</p>
            </div>
          </div>

          {/* Play Button */}
          <Link href={`/quick/${game.id}`}>
            <Button className="w-full bg-gradient-indigo-purple hover:opacity-90">
              <Play className="h-4 w-4 mr-2" />
              Play Game
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
