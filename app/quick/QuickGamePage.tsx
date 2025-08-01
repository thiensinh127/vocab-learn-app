"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Gamepad2,
  Target,
  PenTool,
  CheckSquare,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GameCard } from "@/components/quick-game/GameCard";

// Mock games data
const games = [
  {
    id: "word-match",
    name: "Word Match",
    description: "Match words with their meanings as quickly as possible",
    icon: Target,
    difficulty: "Easy" as const,
    estimatedTime: "2-3 min",
    color: "bg-gradient-blue-cyan",
    stats: {
      bestScore: 85,
      averageScore: 72,
      timesPlayed: 12,
      bestTime: "1:45",
    },
  },
  {
    id: "fill-blank",
    name: "Fill in the Blanks",
    description: "Complete sentences by filling in the missing words",
    icon: PenTool,
    difficulty: "Medium" as const,
    estimatedTime: "3-4 min",
    color: "bg-gradient-green-emerald",
    stats: {
      bestScore: 92,
      averageScore: 78,
      timesPlayed: 8,
      bestTime: "2:15",
    },
  },
  {
    id: "multiple-choice",
    name: "Multiple Choice",
    description: "Choose the correct meaning from multiple options",
    icon: CheckSquare,
    difficulty: "Hard" as const,
    estimatedTime: "4-5 min",
    color: "bg-gradient-purple-pink",
    stats: {
      bestScore: 88,
      averageScore: 65,
      timesPlayed: 15,
      bestTime: "3:20",
    },
  },
];

export default function QuickGamesPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const handlePlayGame = (gameId: string) => {
    // Navigation is handled by the Link in GameCard
  };

  const filteredGames = games.filter(
    (game) =>
      selectedDifficulty === "all" || game.difficulty === selectedDifficulty
  );

  const totalGamesPlayed = games.reduce(
    (sum, game) => sum + game.stats.timesPlayed,
    0
  );
  const averageScore = Math.round(
    games.reduce((sum, game) => sum + game.stats.averageScore, 0) / games.length
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pl-[112px] pt-6">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 mx-6 rounded-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-wide">
                Quick Games
              </h1>
              <p className="text-gray-600 dark:text-gray-400 font-light">
                Fun vocabulary games to test your knowledge
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Gamepad2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Games Played
                    </p>
                    <p className="text-2xl font-bold">{totalGamesPlayed}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Target className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Average Score
                    </p>
                    <p className="text-2xl font-bold">{averageScore}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <CheckSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Available Games
                    </p>
                    <p className="text-2xl font-bold">{games.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filter */}
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">Filter by difficulty:</span>
            <div className="flex space-x-2">
              {["all", "Easy", "Medium", "Hard"].map((difficulty) => (
                <Button
                  key={difficulty}
                  variant={
                    selectedDifficulty === difficulty ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={
                    selectedDifficulty === difficulty
                      ? "bg-gradient-indigo-purple"
                      : ""
                  }
                >
                  {difficulty === "all" ? "All" : difficulty}
                </Button>
              ))}
            </div>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} onPlay={handlePlayGame} />
            ))}
          </div>

          {/* How to Play */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">How to Play</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <h4 className="font-medium">Word Match</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Match words with their correct meanings by clicking on
                    pairs. Complete all matches before time runs out!
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <PenTool className="h-5 w-5 text-green-600" />
                    <h4 className="font-medium">Fill in the Blanks</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Read the definition and complete the sentence by typing the
                    missing word. Use context clues to help you!
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckSquare className="h-5 w-5 text-purple-600" />
                    <h4 className="font-medium">Multiple Choice</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Choose the correct meaning from four options. Think
                    carefully - there's only one right answer!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
