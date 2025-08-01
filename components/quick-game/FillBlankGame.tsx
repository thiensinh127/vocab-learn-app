"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Check, X, RotateCcw, Trophy, ArrowRight, Play } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

interface Word {
  id: string;
  word: string;
  meaning: string;
  example: string;
}

interface FillBlankGameProps {
  words: Word[];
  onGameComplete: (score: number, time: number) => void;
}

export function FillBlankGame({ words, onGameComplete }: FillBlankGameProps) {
  const [gameWords, setGameWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [answers, setAnswers] = useState<
    { word: string; userAnswer: string; correct: boolean }[]
  >([]);

  useEffect(() => {
    // Initialize game with random 8 words
    const shuffledWords = [...words]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);
    setGameWords(shuffledWords);
  }, [words]);

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameEnded) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 || currentIndex >= gameWords.length) {
      setGameEnded(true);
      onGameComplete(score, 90 - timeLeft);
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

  const createBlankSentence = (example: string, word: string) => {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    return example.replace(regex, "______");
  };

  const handleSubmit = () => {
    const currentWord = gameWords[currentIndex];
    const correct =
      userAnswer.toLowerCase().trim() === currentWord.word.toLowerCase();

    setIsCorrect(correct);
    setShowResult(true);

    const newAnswer = {
      word: currentWord.word,
      userAnswer: userAnswer.trim(),
      correct,
    };
    setAnswers([...answers, newAnswer]);

    if (correct) {
      setScore(score + 10);
    }

    setTimeout(() => {
      if (currentIndex < gameWords.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setUserAnswer("");
        setShowResult(false);
      } else {
        setGameEnded(true);
      }
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && userAnswer.trim() && !showResult) {
      handleSubmit();
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(90);
    setScore(0);
    setCurrentIndex(0);
    setAnswers([]);
    setGameEnded(false);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameEnded(false);
    setCurrentIndex(0);
    setUserAnswer("");
    setShowResult(false);
    setScore(0);
    setTimeLeft(90);
    setAnswers([]);
  };

  if (!gameStarted) {
    return (
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Fill in the Blanks</h2>
          <p className="text-muted-foreground">
            Complete the sentences by filling in the missing words!
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            ⏱️ Time Limit: 90 seconds
          </p>
          <p className="text-sm text-muted-foreground">
            📝 Questions: {gameWords.length} sentences
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
                {90 - timeLeft}s
              </p>
              <p className="text-sm text-muted-foreground">Time</p>
            </CardContent>
          </Card>
        </div>

        {/* Review Answers */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Review Your Answers</h3>
            <div className="space-y-3">
              {answers.map((answer, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  {answer.correct ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <X className="h-4 w-4 text-red-600" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">Correct:</span>{" "}
                      {answer.word}
                    </p>
                    {!answer.correct && (
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Your answer:</span>{" "}
                        {answer.userAnswer || "(empty)"}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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
          <h2 className="text-2xl font-bold">Fill in the Blanks</h2>
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
          {/* Word Definition */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Definition:</p>
            <p className="text-lg font-medium">{currentWord.meaning}</p>
          </div>

          {/* Sentence with Blank */}
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Complete the sentence:
            </p>
            <div className="text-lg leading-relaxed p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              {createBlankSentence(currentWord.example, currentWord.word)}
            </div>
          </div>

          {/* Answer Input */}
          <div className="space-y-4">
            <Input
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your answer here..."
              className="text-center text-lg"
              disabled={showResult}
            />

            {showResult && (
              <div
                className={`text-center p-4 rounded-lg ${
                  isCorrect
                    ? "bg-green-100 dark:bg-green-900"
                    : "bg-red-100 dark:bg-red-900"
                }`}
              >
                {isCorrect ? (
                  <div className="space-y-2">
                    <Check className="h-6 w-6 mx-auto text-green-600" />
                    <p className="font-semibold text-green-800 dark:text-green-300">
                      Correct!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <X className="h-6 w-6 mx-auto text-red-600" />
                    <p className="font-semibold text-red-800 dark:text-red-300">
                      Incorrect. The answer is:{" "}
                      <span className="underline">{currentWord.word}</span>
                    </p>
                  </div>
                )}
              </div>
            )}

            {!showResult && (
              <Button
                onClick={handleSubmit}
                disabled={!userAnswer.trim()}
                className="w-full bg-gradient-indigo-purple hover:opacity-90"
              >
                Submit Answer
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
