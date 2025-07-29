"use client";

import { BookOpen, Brain, Clock, Target, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LearningChart } from "@/components/dashboard/LearningChart";
import { TopicOverview } from "@/components/dashboard/TopicOverview";
import { StatsCard } from "@/components/dashboard/StatsCard";

export default function Dashboard() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 pl-[112px]">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Section */}
            <Card className="bg-gradient-indigo-purple text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2 tracking-wide">
                      Keep up the great work! 🎉
                    </h2>
                    <p className="text-indigo-100 font-light">
                      You're on a 7-day learning streak
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold tracking-wider">7</div>
                    <div className="text-indigo-100 font-light tracking-wide">
                      Day Streak
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Words Learned"
                value="346"
                change="+12 today"
                icon={BookOpen}
                gradient="bg-gradient-blue-cyan"
              />
              <StatsCard
                title="Study Time"
                value="8h 30m"
                change="+45m today"
                icon={Clock}
                gradient="bg-gradient-green-emerald"
              />
              <StatsCard
                title="Accuracy Rate"
                value="89%"
                change="+3% this week"
                icon={Target}
                gradient="bg-gradient-purple-pink"
              />
              <StatsCard
                title="Active Topics"
                value="4"
                change="2 completed"
                icon={Brain}
                gradient="bg-gradient-orange-red"
              />
            </div>

            {/* Charts and Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LearningChart />
              <TopicOverview />
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="h-20 bg-gradient-indigo-purple hover:opacity-90">
                    <div className="text-center">
                      <Brain className="h-6 w-6 mx-auto mb-2" />
                      <div>Start Flashcards</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-20 bg-transparent">
                    <div className="text-center">
                      <Zap className="h-6 w-6 mx-auto mb-2" />
                      <div>Quick Game</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-20 bg-transparent">
                    <div className="text-center">
                      <BookOpen className="h-6 w-6 mx-auto mb-2" />
                      <div>Browse Topics</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      action: "Completed",
                      item: "Business English - Lesson 5",
                      time: "2 hours ago",
                      icon: "✅",
                    },
                    {
                      action: "Started",
                      item: "IELTS Vocabulary - Advanced",
                      time: "4 hours ago",
                      icon: "🚀",
                    },
                    {
                      action: "Achieved",
                      item: "7-day learning streak",
                      time: "Today",
                      icon: "🔥",
                    },
                    {
                      action: "Mastered",
                      item: "25 new words in Daily Conversation",
                      time: "Yesterday",
                      icon: "🎯",
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                    >
                      <div className="text-2xl">{activity.icon}</div>
                      <div className="flex-1">
                        <p className="font-medium">
                          <span className="text-indigo-600 dark:text-indigo-400">
                            {activity.action}
                          </span>{" "}
                          {activity.item}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
