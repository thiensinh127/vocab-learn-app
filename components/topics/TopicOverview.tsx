import { BookOpen, Clock } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const topics = [
  {
    name: "Business English",
    totalWords: 150,
    learnedWords: 89,
    timeSpent: "2h 30m",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "IELTS Vocabulary",
    totalWords: 200,
    learnedWords: 134,
    timeSpent: "3h 15m",
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Daily Conversation",
    totalWords: 100,
    learnedWords: 78,
    timeSpent: "1h 45m",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Academic Writing",
    totalWords: 180,
    learnedWords: 45,
    timeSpent: "45m",
    color: "from-orange-500 to-red-500",
  },
];

export function TopicOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold tracking-wide">
          Topic Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {topics.map((topic, index) => {
            const progress = (topic.learnedWords / topic.totalWords) * 100;
            return (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium tracking-wide">{topic.name}</h4>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(progress)}%
                  </span>
                </div>

                <Progress value={progress} className="h-2" />

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>
                        {topic.learnedWords}/{topic.totalWords}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{topic.timeSpent}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
