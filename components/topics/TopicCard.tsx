"use client";

import {
  BookOpen,
  Clock,
  Edit,
  MoreVertical,
  Play,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface Topic {
  id: string;
  name: string;
  description: string;
  totalWords: number;
  learnedWords: number;
  timeSpent: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  lastStudied: string;
  color: string;
}

interface TopicCardProps {
  topic: Topic;
  onEdit: (topic: Topic) => void;
  onDelete: (id: string) => void;
  onStudy: (id: string) => void;
}

export function TopicCard({
  topic,
  onEdit,
  onDelete,
  onStudy,
}: TopicCardProps) {
  const progress = (topic.learnedWords / topic.totalWords) * 100;

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

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${topic.color}`} />
              <h3 className="font-semibold text-lg tracking-wide">
                {topic.name}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {topic.description}
            </p>
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <Badge
                variant="secondary"
                className={getDifficultyColor(topic.difficulty)}
              >
                {topic.difficulty}
              </Badge>
              <span>{topic.category}</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(topic)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Topic
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(topic.id)}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Topic
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center space-x-1 text-muted-foreground mb-1">
                <BookOpen className="h-3 w-3" />
                <span className="text-xs">Words</span>
              </div>
              <p className="text-sm font-medium">
                {topic.learnedWords}/{topic.totalWords}
              </p>
            </div>
            <div>
              <div className="flex items-center justify-center space-x-1 text-muted-foreground mb-1">
                <Clock className="h-3 w-3" />
                <span className="text-xs">Time</span>
              </div>
              <p className="text-sm font-medium">{topic.timeSpent}</p>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">
                Last Study
              </div>
              <p className="text-sm font-medium">{topic.lastStudied}</p>
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={() => onStudy(topic.id)}
            className="w-full bg-gradient-indigo-purple hover:opacity-90"
          >
            <Play className="h-4 w-4 mr-2" />
            Continue Learning
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
