"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function LearningChart() {
  // Mock data for the chart
  const data = [
    { day: "Mon", learned: 12, total: 20 },
    { day: "Tue", learned: 8, total: 15 },
    { day: "Wed", learned: 15, total: 18 },
    { day: "Thu", learned: 10, total: 25 },
    { day: "Fri", learned: 18, total: 22 },
    { day: "Sat", learned: 14, total: 16 },
    { day: "Sun", learned: 20, total: 24 },
  ];

  const maxValue = Math.max(...data.map((d) => d.total));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold tracking-wide">
          Weekly Learning Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-12 text-sm font-medium tracking-wide">
                {item.day}
              </div>
              <div className="flex-1">
                <div className="relative h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500"
                    style={{ width: `${(item.learned / maxValue) * 100}%` }}
                  />
                  <div
                    className="absolute left-0 top-0 h-full bg-gray-300 dark:bg-gray-600 rounded-full opacity-50"
                    style={{ width: `${(item.total / maxValue) * 100}%` }}
                  />
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {item.learned}/{item.total}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
