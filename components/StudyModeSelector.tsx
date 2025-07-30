"use client";

import { useState } from "react";
import { Settings, BookOpen, RotateCcw, Target, Shuffle } from "lucide-react";

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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

interface StudySettings {
  studyMode: "all" | "new" | "review" | "difficult";
  shuffleCards: boolean;
  autoFlip: boolean;
  autoFlipDelay: number;
  showPronunciation: boolean;
  cardLimit: number;
}

interface StudyModeSelectorProps {
  topicName: string;
  totalWords: number;
  newWords: number;
  reviewWords: number;
  difficultWords: number;
  onStartStudy: (settings: StudySettings) => void;
}

export function StudyModeSelector({
  topicName,
  totalWords,
  newWords,
  reviewWords,
  difficultWords,
  onStartStudy,
}: StudyModeSelectorProps) {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<StudySettings>({
    studyMode: "all",
    shuffleCards: true,
    autoFlip: false,
    autoFlipDelay: 3,
    showPronunciation: true,
    cardLimit: totalWords,
  });

  const studyModes = [
    {
      id: "all",
      name: "All Words",
      description: "Study all words in this topic",
      icon: BookOpen,
      count: totalWords,
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    },
    {
      id: "new",
      name: "New Words",
      description: "Only words you haven't learned yet",
      icon: Shuffle,
      count: newWords,
      color:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    },
    {
      id: "review",
      name: "Review Mode",
      description: "Review words you've already learned",
      icon: RotateCcw,
      count: reviewWords,
      color:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    },
    {
      id: "difficult",
      name: "Difficult Words",
      description: "Focus on hard difficulty words",
      icon: Target,
      count: difficultWords,
      color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    },
  ];

  const handleStartStudy = () => {
    onStartStudy(settings);
    setOpen(false);
  };

  const selectedMode = studyModes.find(
    (mode) => mode.id === settings.studyMode
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-indigo-purple hover:opacity-90">
          <Settings className="h-4 w-4 mr-2" />
          Configure Study Session
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Study Session Settings</DialogTitle>
          <DialogDescription>
            Configure your flashcard study session for "{topicName}"
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Study Mode Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Study Mode</Label>
            <div className="grid grid-cols-1 gap-2">
              {studyModes.map((mode) => (
                <Card
                  key={mode.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    settings.studyMode === mode.id
                      ? "ring-2 ring-indigo-500 bg-indigo-50 dark:bg-indigo-950"
                      : "hover:shadow-md"
                  }`}
                  onClick={() =>
                    setSettings({ ...settings, studyMode: mode.id as any })
                  }
                >
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${mode.color}`}>
                        <mode.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{mode.name}</h4>
                          <span className="text-sm font-medium">
                            {mode.count} words
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {mode.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Study Settings */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Study Settings</Label>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="shuffle">Shuffle cards</Label>
                <Switch
                  id="shuffle"
                  checked={settings.shuffleCards}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, shuffleCards: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="pronunciation">Show pronunciation</Label>
                <Switch
                  id="pronunciation"
                  checked={settings.showPronunciation}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, showPronunciation: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="auto-flip">Auto-flip cards</Label>
                <Switch
                  id="auto-flip"
                  checked={settings.autoFlip}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, autoFlip: checked })
                  }
                />
              </div>

              {settings.autoFlip && (
                <div className="space-y-2">
                  <Label>Auto-flip delay: {settings.autoFlipDelay}s</Label>
                  <Slider
                    value={[settings.autoFlipDelay]}
                    onValueChange={([value]) =>
                      setSettings({ ...settings, autoFlipDelay: value })
                    }
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>Number of cards: {settings.cardLimit}</Label>
                <Slider
                  value={[settings.cardLimit]}
                  onValueChange={([value]) =>
                    setSettings({ ...settings, cardLimit: value })
                  }
                  max={selectedMode?.count || totalWords}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleStartStudy}
            className="bg-gradient-indigo-purple hover:opacity-90"
          >
            Start Study Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
