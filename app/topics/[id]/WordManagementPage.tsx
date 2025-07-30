"use client";

import { useState, useMemo } from "react";
import { ArrowLeft, BookOpen, Download } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AddWordDialog } from "@/components/topics/AddWordDialog";
import { ImportWordsDialog } from "@/components/topics/ImportWordsDialog";
import { WordFilters } from "@/components/topics/WordFilters";
import { WordCard } from "@/components/topics/WordCard";

interface Word {
  id: string;
  word: string;
  pronunciation: string;
  meaning: string;
  example: string;
  partOfSpeech: string;
  difficulty: "Easy" | "Medium" | "Hard";
  isLearned: boolean;
}

// Mock data
const initialWords: Word[] = [
  {
    id: "1",
    word: "Entrepreneur",
    pronunciation: "/ˌɑːntrəprəˈnɜːr/",
    meaning:
      "A person who starts and runs a business, taking financial risks in the hope of profit",
    example:
      "She became a successful entrepreneur after launching her tech startup in Silicon Valley.",
    partOfSpeech: "noun",
    difficulty: "Medium",
    isLearned: true,
  },
  {
    id: "2",
    word: "Resilient",
    pronunciation: "/rɪˈzɪliənt/",
    meaning: "Able to recover quickly from difficulties; tough and flexible",
    example:
      "The resilient team bounced back from their initial failure and eventually succeeded.",
    partOfSpeech: "adjective",
    difficulty: "Hard",
    isLearned: false,
  },
  {
    id: "3",
    word: "Collaborate",
    pronunciation: "/kəˈlæbəreɪt/",
    meaning: "To work together with others on a project or task",
    example:
      "We need to collaborate with the marketing team to launch this campaign successfully.",
    partOfSpeech: "verb",
    difficulty: "Easy",
    isLearned: true,
  },
];

interface WordManagementPageProps {
  topicId: string;
}

export default function WordManagementPage({
  topicId,
}: WordManagementPageProps) {
  const [words, setWords] = useState<Word[]>(initialWords);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [partOfSpeechFilter, setPartOfSpeechFilter] = useState("all");
  const [learnedFilter, setLearnedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("word");

  // Filter and sort words
  const filteredWords = useMemo(() => {
    const filtered = words.filter((word) => {
      const matchesSearch =
        word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.meaning.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty =
        difficultyFilter === "all" || word.difficulty === difficultyFilter;
      const matchesPartOfSpeech =
        partOfSpeechFilter === "all" ||
        word.partOfSpeech === partOfSpeechFilter;
      const matchesLearned =
        learnedFilter === "all" ||
        (learnedFilter === "learned" && word.isLearned) ||
        (learnedFilter === "unlearned" && !word.isLearned);

      return (
        matchesSearch &&
        matchesDifficulty &&
        matchesPartOfSpeech &&
        matchesLearned
      );
    });

    // Sort words
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "difficulty":
          const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case "partOfSpeech":
          return a.partOfSpeech.localeCompare(b.partOfSpeech);
        case "learned":
          return Number(b.isLearned) - Number(a.isLearned);
        default:
          return a.word.localeCompare(b.word);
      }
    });

    return filtered;
  }, [
    words,
    searchTerm,
    difficultyFilter,
    partOfSpeechFilter,
    learnedFilter,
    sortBy,
  ]);

  const handleAddWord = (newWordData: Omit<Word, "id" | "isLearned">) => {
    const newWord: Word = {
      ...newWordData,
      id: Date.now().toString(),
      isLearned: false,
    };
    setWords([...words, newWord]);
  };

  const handleImportWords = (importedWords: any[]) => {
    const newWords: Word[] = importedWords.map((word, index) => ({
      id: (Date.now() + index).toString(),
      word: word.word,
      pronunciation: word.pronunciation || "",
      meaning: word.meaning,
      example: word.example || "",
      partOfSpeech: word.partOfSpeech || "noun",
      difficulty: word.difficulty || "Medium",
      isLearned: false,
    }));
    setWords([...words, ...newWords]);
  };

  const handleEditWord = (word: Word) => {
    // TODO: Implement edit functionality
    console.log("Edit word:", word);
  };

  const handleDeleteWord = (id: string) => {
    setWords(words.filter((word) => word.id !== id));
  };

  const handleToggleLearned = (id: string) => {
    setWords(
      words.map((word) =>
        word.id === id ? { ...word, isLearned: !word.isLearned } : word
      )
    );
  };

  const handleSpeak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const handleExportWords = () => {
    const dataStr = JSON.stringify(words, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `topic-${topicId}-words.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const learnedWords = words.filter((word) => word.isLearned).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pl-[112px] pt-6">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 mx-6 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/topics" className="cursor-pointer">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-wide">
                Business English - Words
              </h1>
              <p className="text-gray-600 dark:text-gray-400 font-light">
                Manage vocabulary words for this topic
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex space-x-2">
              <AddWordDialog onAddWord={handleAddWord} />
              <ImportWordsDialog onImportWords={handleImportWords} />
            </div>
            <Button variant="outline" onClick={handleExportWords}>
              <Download className="h-4 w-4 mr-2" />
              Export Words
            </Button>
          </div>

          {/* Filters */}
          <WordFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            difficultyFilter={difficultyFilter}
            onDifficultyChange={setDifficultyFilter}
            partOfSpeechFilter={partOfSpeechFilter}
            onPartOfSpeechChange={setPartOfSpeechFilter}
            learnedFilter={learnedFilter}
            onLearnedChange={setLearnedFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalWords={words.length}
            learnedWords={learnedWords}
          />

          {/* Words Grid */}
          {filteredWords.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWords.map((word) => (
                <WordCard
                  key={word.id}
                  word={word}
                  onEdit={handleEditWord}
                  onDelete={handleDeleteWord}
                  onToggleLearned={handleToggleLearned}
                  onSpeak={handleSpeak}
                />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <div className="space-y-4">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
                <div>
                  <h3 className="text-lg font-semibold">No words found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm ||
                    difficultyFilter !== "all" ||
                    partOfSpeechFilter !== "all" ||
                    learnedFilter !== "all"
                      ? "Try adjusting your filters or search terms"
                      : "Add your first vocabulary word to this topic"}
                  </p>
                </div>
                {!searchTerm &&
                  difficultyFilter === "all" &&
                  partOfSpeechFilter === "all" &&
                  learnedFilter === "all" && (
                    <div className="flex justify-center space-x-2">
                      <AddWordDialog onAddWord={handleAddWord} />
                      <ImportWordsDialog onImportWords={handleImportWords} />
                    </div>
                  )}
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
