"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { WordMatchGame } from "@/components/quick-game/WordMatchGame";
import { FillBlankGame } from "@/components/quick-game/FillBlankGame";
import { MultipleChoiceGame } from "@/components/quick-game/MultipleChoiceGame";

// Mock words data
const mockWords = [
  {
    id: "1",
    word: "Entrepreneur",
    meaning: "A person who starts and runs a business",
    example:
      "She became a successful entrepreneur after launching her tech startup.",
  },
  {
    id: "2",
    word: "Resilient",
    meaning: "Able to recover quickly from difficulties",
    example: "The resilient team bounced back from their initial failure.",
  },
  {
    id: "3",
    word: "Collaborate",
    meaning: "To work together with others on a project",
    example: "We need to collaborate with the marketing team on this campaign.",
  },
  {
    id: "4",
    word: "Innovation",
    meaning: "The introduction of new ideas or methods",
    example:
      "The company's innovation in renewable energy impressed investors.",
  },
  {
    id: "5",
    word: "Meticulous",
    meaning: "Showing great attention to detail",
    example: "Her meticulous planning ensured the event ran smoothly.",
  },
  {
    id: "6",
    word: "Versatile",
    meaning: "Able to adapt to many different functions",
    example: "He is a versatile player who can perform in multiple positions.",
  },
  {
    id: "7",
    word: "Ambitious",
    meaning: "Having a strong desire for success or achievement",
    example: "The ambitious young executive worked late every night.",
  },
  {
    id: "8",
    word: "Efficient",
    meaning: "Working in a well-organized way",
    example: "The new system is much more efficient than the old one.",
  },
];

interface GamePageProps {
  gameType: string;
}

export default function GamePage({ gameType }: GamePageProps) {
  const [gameComplete, setGameComplete] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [finalTime, setFinalTime] = useState(0);

  const handleGameComplete = (score: number, time: number) => {
    setFinalScore(score);
    setFinalTime(time);
    setGameComplete(true);
  };

  const getGameTitle = () => {
    switch (gameType) {
      case "word-match":
        return "Word Match";
      case "fill-blank":
        return "Fill in the Blanks";
      case "multiple-choice":
        return "Multiple Choice";
      default:
        return "Game";
    }
  };

  const renderGame = () => {
    switch (gameType) {
      case "word-match":
        return (
          <WordMatchGame
            words={mockWords}
            onGameComplete={handleGameComplete}
          />
        );
      case "fill-blank":
        return (
          <FillBlankGame
            words={mockWords}
            onGameComplete={handleGameComplete}
          />
        );
      case "multiple-choice":
        return (
          <MultipleChoiceGame
            words={mockWords}
            onGameComplete={handleGameComplete}
          />
        );
      default:
        return <div>Game not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pl-[112px] pt-6">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 mx-6 rounded-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/quick">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-wide">
                {getGameTitle()}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 font-light">
                Quick vocabulary game
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-4xl mx-auto">{renderGame()}</div>
      </main>
    </div>
  );
}
