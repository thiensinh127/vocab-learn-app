"use client";

import { useState, useEffect } from "react";
import { Check, X, RotateCcw, Trophy, Play } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Word {
  id: string;
  word: string;
  meaning: string;
}

interface WordMatchGameProps {
  words: Word[];
  onGameComplete: (score: number, time: number) => void;
}

export function WordMatchGame({ words, onGameComplete }: WordMatchGameProps) {
  const [gameWords, setGameWords] = useState<Word[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedMeaning, setSelectedMeaning] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [wrongPairs, setWrongPairs] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    // Initialize game with random 6 words
    const shuffledWords = [...words]
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);
    setGameWords(shuffledWords);
  }, [words]);

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameEnded) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 || matchedPairs.size === gameWords.length) {
      setGameEnded(true);
      onGameComplete(score, 60 - timeLeft);
    }
  }, [
    timeLeft,
    gameStarted,
    gameEnded,
    matchedPairs.size,
    gameWords.length,
    score,
    onGameComplete,
  ]);

  const handleWordClick = (wordId: string) => {
    if (matchedPairs.has(wordId) || wrongPairs.has(wordId)) return;

    if (selectedWord === wordId) {
      setSelectedWord(null);
    } else {
      setSelectedWord(wordId);
      if (selectedMeaning) {
        checkMatch(wordId, selectedMeaning);
      }
    }
  };

  const handleMeaningClick = (wordId: string) => {
    if (matchedPairs.has(wordId) || wrongPairs.has(wordId)) return;

    if (selectedMeaning === wordId) {
      setSelectedMeaning(null);
    } else {
      setSelectedMeaning(wordId);
      if (selectedWord) {
        checkMatch(selectedWord, wordId);
      }
    }
  };

  const checkMatch = (wordId: string, meaningId: string) => {
    if (wordId === meaningId) {
      setMatchedPairs(new Set([...matchedPairs, wordId]));
      setScore(score + 10);
    } else {
      setWrongPairs(new Set([...wrongPairs, wordId, meaningId]));
      setTimeout(() => {
        setWrongPairs(new Set());
      }, 1000);
    }
    setSelectedWord(null);
    setSelectedMeaning(null);
  };

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(60);
    setScore(0);
    setMatchedPairs(new Set());
    setWrongPairs(new Set());
    setGameEnded(false);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameEnded(false);
    setSelectedWord(null);
    setSelectedMeaning(null);
    setMatchedPairs(new Set());
    setWrongPairs(new Set());
    setScore(0);
    setTimeLeft(60);
  };

  if (!gameStarted) {
    return (
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Word Match</h2>
          <p className="text-muted-foreground">
            Match words with their meanings as quickly as possible!
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            ⏱️ Time Limit: 60 seconds
          </p>
          <p className="text-sm text-muted-foreground">
            🎯 Goal: Match all {gameWords.length} pairs
          </p>
          <p className="text-sm text-muted-foreground">
            💯 Points: 10 per correct match
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
    const finalScore = score;
    const accuracy =
      gameWords.length > 0
        ? Math.round((matchedPairs.size / gameWords.length) * 100)
        : 0;

    return (
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <Trophy className="h-12 w-12 mx-auto text-yellow-500" />
          <h2 className="text-2xl font-bold">Game Complete!</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-indigo-600">{finalScore}</p>
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
                {60 - timeLeft}s
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

  const progress = (matchedPairs.size / gameWords.length) * 100;

  return (
    <div className="space-y-6">
      {/* Game Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Word Match</h2>
          <p className="text-sm text-muted-foreground">
            Match words with their meanings
          </p>
        </div>
        <div className="text-right space-y-1">
          <p className="text-2xl font-bold">{timeLeft}s</p>
          <p className="text-sm text-muted-foreground">Score: {score}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>
            {matchedPairs.size}/{gameWords.length} pairs
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-2 gap-6">
        {/* Words Column */}
        <div className="space-y-3">
          <h3 className="font-semibold text-center">Words</h3>
          {gameWords.map((word) => (
            <Card
              key={`word-${word.id}`}
              className={`cursor-pointer transition-all duration-200 ${
                matchedPairs.has(word.id)
                  ? "bg-green-100 border-green-300 dark:bg-green-900 dark:border-green-700"
                  : wrongPairs.has(word.id)
                  ? "bg-red-100 border-red-300 dark:bg-red-900 dark:border-red-700"
                  : selectedWord === word.id
                  ? "bg-indigo-100 border-indigo-300 dark:bg-indigo-900 dark:border-indigo-700"
                  : "hover:shadow-md"
              }`}
              onClick={() => handleWordClick(word.id)}
            >
              <CardContent className="p-4 text-center">
                <p className="font-semibold">{word.word}</p>
                {matchedPairs.has(word.id) && (
                  <Check className="h-4 w-4 mx-auto mt-2 text-green-600" />
                )}
                {wrongPairs.has(word.id) && (
                  <X className="h-4 w-4 mx-auto mt-2 text-red-600" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Meanings Column */}
        <div className="space-y-3">
          <h3 className="font-semibold text-center">Meanings</h3>
          {gameWords
            .sort(() => Math.random() - 0.5)
            .map((word) => (
              <Card
                key={`meaning-${word.id}`}
                className={`cursor-pointer transition-all duration-200 ${
                  matchedPairs.has(word.id)
                    ? "bg-green-100 border-green-300 dark:bg-green-900 dark:border-green-700"
                    : wrongPairs.has(word.id)
                    ? "bg-red-100 border-red-300 dark:bg-red-900 dark:border-red-700"
                    : selectedMeaning === word.id
                    ? "bg-indigo-100 border-indigo-300 dark:bg-indigo-900 dark:border-indigo-700"
                    : "hover:shadow-md"
                }`}
                onClick={() => handleMeaningClick(word.id)}
              >
                <CardContent className="p-4 text-center">
                  <p className="text-sm">{word.meaning}</p>
                  {matchedPairs.has(word.id) && (
                    <Check className="h-4 w-4 mx-auto mt-2 text-green-600" />
                  )}
                  {wrongPairs.has(word.id) && (
                    <X className="h-4 w-4 mx-auto mt-2 text-red-600" />
                  )}
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
