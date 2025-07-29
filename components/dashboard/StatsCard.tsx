import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  gradient: string;
}

export function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  gradient,
}: StatsCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground tracking-wide">
              {title}
            </p>
            <p className="text-2xl font-semibold tracking-wide">{value}</p>
            <p className="text-xs text-green-600 dark:text-green-400 font-light">
              {change}
            </p>
          </div>
          <div className={`rounded-full p-3 ${gradient}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
