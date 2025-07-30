"use client";

import { useState } from "react";
import { Play, BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Topic {
  id: string;
  name: string;
  description: string;
  totalWords: number;
  learnedWords: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  color: string;
}

interface TopicSelectionDialogProps {
  topics: Topic[];
  onSelectTopic: (topicId: string) => void;
}

export function TopicSelectionDialog({
  topics,
  onSelectTopic,
}: TopicSelectionDialogProps) {
  const [open, setOpen] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const handleSelectTopic = (topicId: string) => {
    onSelectTopic(topicId);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-indigo-purple hover:opacity-90">
          <Play className="h-4 w-4 mr-2" />
          Start Flashcards
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Select Topic to Study</DialogTitle>
          <DialogDescription>
            Choose a topic to start your flashcard study session.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[400px] overflow-y-auto space-y-3">
          {topics.map((topic) => {
            const progress =
              topic.totalWords > 0
                ? (topic.learnedWords / topic.totalWords) * 100
                : 0;
            const remainingWords = topic.totalWords - topic.learnedWords;

            return (
              <Card
                key={topic.id}
                className="cursor-pointer hover:shadow-md transition-all duration-200"
                onClick={() => handleSelectTopic(topic.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <div
                          className={`w-3 h-3 rounded-full ${topic.color}`}
                        />
                        <h3 className="font-semibold tracking-wide">
                          {topic.name}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {topic.description}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant="secondary"
                          className={getDifficultyColor(topic.difficulty)}
                        >
                          {topic.difficulty}
                        </Badge>
                        <Badge variant="secondary">{topic.category}</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        <BookOpen className="h-3 w-3 inline mr-1" />
                        {topic.totalWords} words
                      </span>
                      <span>{remainingWords} remaining</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
