"use client";

import { BookOpen } from "lucide-react";
import { useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { CreateTopicDialog } from "@/components/topics/CreateTopicDialog";
import { TopicFilters } from "@/components/topics/TopicFilters";
import { TopicCard } from "@/components/topics/TopicCard";

// Mock data
const initialTopics = [
  {
    id: "1",
    name: "Business English",
    description:
      "Essential vocabulary for professional communication and business meetings",
    totalWords: 150,
    learnedWords: 89,
    timeSpent: "2h 30m",
    difficulty: "Intermediate" as const,
    category: "Business",
    lastStudied: "2 hours ago",
    color: "bg-gradient-blue-cyan",
  },
  {
    id: "2",
    name: "IELTS Vocabulary",
    description: "High-frequency words for IELTS exam preparation",
    totalWords: 200,
    learnedWords: 134,
    timeSpent: "3h 15m",
    difficulty: "Advanced" as const,
    category: "IELTS",
    lastStudied: "1 day ago",
    color: "bg-gradient-green-emerald",
  },
  {
    id: "3",
    name: "Daily Conversation",
    description: "Common words and phrases for everyday conversations",
    totalWords: 100,
    learnedWords: 78,
    timeSpent: "1h 45m",
    difficulty: "Beginner" as const,
    category: "Daily Life",
    lastStudied: "3 hours ago",
    color: "bg-gradient-purple-pink",
  },
  {
    id: "4",
    name: "Academic Writing",
    description: "Formal vocabulary for essays and academic papers",
    totalWords: 180,
    learnedWords: 45,
    timeSpent: "45m",
    difficulty: "Advanced" as const,
    category: "Academic",
    lastStudied: "1 week ago",
    color: "bg-gradient-orange-red",
  },
];

export default function TopicsPage() {
  const [topics, setTopics] = useState(initialTopics);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Filter and sort topics
  const filteredTopics = useMemo(() => {
    const filtered = topics.filter((topic) => {
      const matchesSearch =
        topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty =
        difficultyFilter === "all" || topic.difficulty === difficultyFilter;
      const matchesCategory =
        categoryFilter === "all" || topic.category === categoryFilter;

      return matchesSearch && matchesDifficulty && matchesCategory;
    });

    // Sort topics
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "progress":
          return b.learnedWords / b.totalWords - a.learnedWords / a.totalWords;
        case "recent":
          // Simple sorting by last studied (would need proper date parsing in real app)
          return a.lastStudied.localeCompare(b.lastStudied);
        case "difficulty":
          const difficultyOrder = { Beginner: 1, Intermediate: 2, Advanced: 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [topics, searchTerm, difficultyFilter, categoryFilter, sortBy]);

  const handleCreateTopic = (newTopic: any) => {
    setTopics([...topics, newTopic]);
  };

  const handleEditTopic = (topic: any) => {
    // TODO: Implement edit functionality
    console.log("Edit topic:", topic);
  };

  const handleDeleteTopic = (id: string) => {
    setTopics(topics.filter((topic) => topic.id !== id));
  };

  const handleStudyTopic = (id: string) => {
    // TODO: Navigate to flashcard/study page
    console.log("Study topic:", id);
  };

  // Calculate stats
  const totalWords = topics.reduce((sum, topic) => sum + topic.totalWords, 0);
  const learnedWords = topics.reduce(
    (sum, topic) => sum + topic.learnedWords,
    0
  );
  const averageProgress =
    topics.length > 0 ? Math.round((learnedWords / totalWords) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pl-[112px]">
      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-indigo-600" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Topics
                    </p>
                    <p className="text-2xl font-bold">{topics.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <div className="h-5 w-5 bg-gradient-blue-cyan rounded" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Words
                    </p>
                    <p className="text-2xl font-bold">{totalWords}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <div className="h-5 w-5 bg-gradient-green-emerald rounded" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Words Learned
                    </p>
                    <p className="text-2xl font-bold">{learnedWords}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <div className="h-5 w-5 bg-gradient-purple-pink rounded" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Average Progress
                    </p>
                    <p className="text-2xl font-bold">{averageProgress}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions and Filters */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CreateTopicDialog onCreateTopic={handleCreateTopic} />
            <TopicFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              difficultyFilter={difficultyFilter}
              onDifficultyChange={setDifficultyFilter}
              categoryFilter={categoryFilter}
              onCategoryChange={setCategoryFilter}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>

          {/* Topics Grid */}
          {filteredTopics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTopics.map((topic) => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  onEdit={handleEditTopic}
                  onDelete={handleDeleteTopic}
                  onStudy={handleStudyTopic}
                />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <div className="space-y-4">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
                <div>
                  <h3 className="text-lg font-semibold">No topics found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm ||
                    difficultyFilter !== "all" ||
                    categoryFilter !== "all"
                      ? "Try adjusting your filters or search terms"
                      : "Create your first topic to start learning vocabulary"}
                  </p>
                </div>
                {!searchTerm &&
                  difficultyFilter === "all" &&
                  categoryFilter === "all" && (
                    <CreateTopicDialog onCreateTopic={handleCreateTopic} />
                  )}
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
