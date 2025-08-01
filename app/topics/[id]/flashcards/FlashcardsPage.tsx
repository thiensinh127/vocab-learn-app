"use client";

import { useCallback, useEffect, useState } from "react";

import { FlashcardControls } from "@/components/flashcard/FlashcardControls";
import { SessionCompleteDialog } from "@/components/flashcard/SessionCompleteDialog";
import { StudySessionHeader } from "@/components/flashcard/StudySessionHeader";
import { Flashcard } from "@/components/flashcard/FlashCard";

// Mock data
const mockWords = [
  {
    id: "1",
    word: "Entrepreneur",
    pronunciation: "/ˌɑːntrəprəˈnɜːr/",
    meaning: "A person who starts and runs a business, taking financial risks",
    example:
      "She became a successful entrepreneur after launching her tech startup.",
    partOfSpeech: "noun",
    difficulty: "Medium" as const,
  },
  {
    id: "2",
    word: "Resilient",
    pronunciation: "/rɪˈzɪliənt/",
    meaning: "Able to recover quickly from difficulties; tough",
    example: "The resilient team bounced back from their initial failure.",
    partOfSpeech: "adjective",
    difficulty: "Hard" as const,
  },
  {
    id: "3",
    word: "Collaborate",
    pronunciation: "/kəˈlæbəreɪt/",
    meaning: "To work together with others on a project or task",
    example: "We need to collaborate with the marketing team on this campaign.",
    partOfSpeech: "verb",
    difficulty: "Easy" as const,
  },
  {
    id: "4",
    word: "Innovation",
    pronunciation: "/ˌɪnəˈveɪʃən/",
    meaning: "The introduction of new ideas, methods, or products",
    example:
      "The company's innovation in renewable energy impressed investors.",
    partOfSpeech: "noun",
    difficulty: "Medium" as const,
  },
  {
    id: "5",
    word: "Meticulous",
    pronunciation: "/məˈtɪkjələs/",
    meaning: "Showing great attention to detail; very careful and precise",
    example: "Her meticulous planning ensured the event ran smoothly.",
    partOfSpeech: "adjective",
    difficulty: "Hard" as const,
  },
];

export default function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [words, setWords] = useState(mockWords);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [streak, setStreak] = useState(0);
  const [sessionStartTime] = useState(Date.now());
  const [sessionTime, setSessionTime] = useState("00:00");
  const [showComplete, setShowComplete] = useState(false);
  const [settings, setSettings] = useState({
    autoFlip: false,
    autoFlipDelay: 3,
    showPronunciation: true,
    shuffleCards: false,
    studyMode: "all",
  });

  // Update session time
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000);
      const minutes = Math.floor(elapsed / 60);
      const seconds = elapsed % 60;
      setSessionTime(
        `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionStartTime]);

  // Auto-flip functionality
  useEffect(() => {
    if (settings.autoFlip && !isFlipped) {
      const timer = setTimeout(() => {
        setIsFlipped(true);
      }, settings.autoFlipDelay * 1000);

      return () => clearTimeout(timer);
    }
  }, [settings.autoFlip, settings.autoFlipDelay, isFlipped, currentIndex]);

  // Text-to-speech
  const handleSpeak = useCallback((text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  }, []);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      setShowComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleMarkKnown = () => {
    setCorrectAnswers(correctAnswers + 1);
    setTotalAnswered(totalAnswered + 1);
    setStreak(streak + 1);
    handleNext();
  };

  const handleMarkUnknown = () => {
    setTotalAnswered(totalAnswered + 1);
    setStreak(0);
    handleNext();
  };

  const handleShuffle = () => {
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    setWords(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setCorrectAnswers(0);
    setTotalAnswered(0);
    setStreak(0);
    setShowComplete(false);
  };

  const handleReviewMistakes = () => {
    // TODO: Implement review mistakes functionality
    setShowComplete(false);
  };

  const progress = ((currentIndex + 1) / words.length) * 100;

  const sessionStats = {
    totalCards: words.length,
    correctAnswers,
    sessionTime,
    accuracy:
      totalAnswered > 0
        ? Math.round((correctAnswers / totalAnswered) * 100)
        : 0,
    newWordsLearned: correctAnswers,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pl-[112px]">
      {/* Header */}
      <header className="bg-gray-50 dark:bg-gray-900  px-6 py-4">
        <div className="flex items- justify-between">
          <div className="flex-1">
            <StudySessionHeader
              topicName="Business English"
              sessionTime={sessionTime}
              correctAnswers={correctAnswers}
              totalAnswered={totalAnswered}
              streak={streak}
              settings={settings}
              onSettingsChange={setSettings}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 ">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Flashcard */}
          <div className="flex justify-center">
            <Flashcard
              word={words[currentIndex]}
              isFlipped={isFlipped}
              onFlip={handleFlip}
              onSpeak={handleSpeak}
            />
          </div>

          {/* Controls */}
          <FlashcardControls
            currentIndex={currentIndex}
            totalCards={words.length}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onMarkKnown={handleMarkKnown}
            onMarkUnknown={handleMarkUnknown}
            onShuffle={handleShuffle}
            onSettings={() => {}}
            progress={progress}
          />
        </div>
      </main>

      {/* Session Complete Dialog */}
      <SessionCompleteDialog
        open={showComplete}
        onClose={() => setShowComplete(false)}
        onRestart={handleRestart}
        onReviewMistakes={handleReviewMistakes}
        stats={sessionStats}
      />
    </div>
  );
}
