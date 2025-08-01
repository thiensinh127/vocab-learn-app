"use client";

import { useState, useEffect } from "react";
import { Check, X, RotateCcw, Trophy, ArrowRight, Play } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Word {
  id: string;
  word: string;
  meaning: string;
}

interface MultipleChoiceGameProps {
  words: Word[];
  onGameComplete: (score: number, time: number) => void;
}

export function MultipleChoiceGame({
  words,
  onGameComplete,
}: MultipleChoiceGameProps) {
  const [gameWords, setGameWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [answers, setAnswers] = useState<
    { word: string; selectedAnswer: string; correct: boolean }[]
  >([]);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    // Initialize game with random 10 words
    const shuffledWords = [...words]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    setGameWords(shuffledWords);
  }, [words]);

  useEffect(() => {
    if (gameWords.length > 0 && currentIndex < gameWords.length) {
      generateOptions();
    }
  }, [currentIndex, gameWords]);

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameEnded) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 || currentIndex >= gameWords.length) {
      setGameEnded(true);
      onGameComplete(score, 120 - timeLeft);
    }
  }, [
    timeLeft,
    gameStarted,
    gameEnded,
    currentIndex,
    gameWords.length,
    score,
    onGameComplete,
  ]);

  const generateOptions = () => {
    if (currentIndex >= gameWords.length) return;

    const currentWord = gameWords[currentIndex];
    const wrongOptions = words
      .filter((w) => w.id !== currentWord.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((w) => w.meaning);

    const allOptions = [currentWord.meaning, ...wrongOptions].sort(
      () => Math.random() - 0.5
    );
    setOptions(allOptions);
  };

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const currentWord = gameWords[currentIndex];
    const correct = selectedAnswer === currentWord.meaning;

    setIsCorrect(correct);
    setShowResult(true);

    const newAnswer = {
      word: currentWord.word,
      selectedAnswer,
      correct,
    };
    setAnswers([...answers, newAnswer]);

    if (correct) {
      setScore(score + 10);
    }

    setTimeout(() => {
      if (currentIndex < gameWords.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setGameEnded(true);
      }
    }, 2000);
  };

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(120);
    setScore(0);
    setCurrentIndex(0);
    setAnswers([]);
    setGameEnded(false);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameEnded(false);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTimeLeft(120);
    setAnswers([]);
  };

  if (!gameStarted) {
    return (
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Multiple Choice</h2>
          <p className="text-muted-foreground">
            Choose the correct meaning for each word!
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            ⏱️ Time Limit: 2 minutes
          </p>
          <p className="text-sm text-muted-foreground">
            ❓ Questions: {gameWords.length} words
          </p>
          <p className="text-sm text-muted-foreground">
            💯 Points: 10 per correct answer
          </p>
        </div>
        <Button
          onClick={startGame}
          className="bg-gradient-indigo-purple hover:opacity-90"
        >
          <Play className="h-4 w-4 mr-2" />
          Start Game
        </Button>
      </div>
    );
  }

  if (gameEnded) {
    const accuracy =
      gameWords.length > 0
        ? Math.round(
            (answers.filter((a) => a.correct).length / gameWords.length) * 100
          )
        : 0;

    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <Trophy className="h-12 w-12 mx-auto text-yellow-500" />
          <h2 className="text-2xl font-bold">Game Complete!</h2>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-indigo-600">{score}</p>
              <p className="text-sm text-muted-foreground">Score</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{accuracy}%</p>
              <p className="text-sm text-muted-foreground">Accuracy</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">
                {120 - timeLeft}s
              </p>
              <p className="text-sm text-muted-foreground">Time</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex space-x-2 justify-center">
          <Button onClick={resetGame} variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Play Again
          </Button>
          <Button onClick={() => window.history.back()}>Back to Games</Button>
        </div>
      </div>
    );
  }

  const currentWord = gameWords[currentIndex];
  const progress = ((currentIndex + 1) / gameWords.length) * 100;

  return (
    <div className="space-y-6">
      {/* Game Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Multiple Choice</h2>
          <p className="text-sm text-muted-foreground">
            Question {currentIndex + 1} of {gameWords.length}
          </p>
        </div>
        <div className="text-right space-y-1">
          <p className="text-2xl font-bold">{timeLeft}s</p>
          <p className="text-sm text-muted-foreground">Score: {score}</p>
        </div>
      </div>

      {/* Progress */}
      <Progress value={progress} className="h-2" />

      {/* Question Card */}
      <Card className="p-6">
        <CardContent className="space-y-6">
          {/* Word */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              What does this word mean?
            </p>
            <h3 className="text-4xl font-bold text-indigo-600">
              {currentWord.word}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {options.map((option, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-200 ${
                  showResult
                    ? option === currentWord.meaning
                      ? "bg-green-100 border-green-300 dark:bg-green-900 dark:border-green-700"
                      : selectedAnswer === option
                      ? "bg-red-100 border-red-300 dark:bg-red-900 dark:border-red-700"
                      : ""
                    : selectedAnswer === option
                    ? "bg-indigo-100 border-indigo-300 dark:bg-indigo-900 dark:border-indigo-700"
                    : "hover:shadow-md"
                }`}
                onClick={() => handleAnswerSelect(option)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">{option}</p>
                    {showResult && option === currentWord.meaning && (
                      <Check className="h-4 w-4 text-green-600" />
                    )}
                    {showResult &&
                      selectedAnswer === option &&
                      option !== currentWord.meaning && (
                        <X className="h-4 w-4 text-red-600" />
                      )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Submit Button */}
          {!showResult && (
            <Button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className="w-full bg-gradient-indigo-purple hover:opacity-90"
            >
              Submit Answer
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
