"use client";

import { useState } from "react";
import { Settings } from "lucide-react";

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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface StudySettingsDialogProps {
  settings: {
    autoFlip: boolean;
    autoFlipDelay: number;
    showPronunciation: boolean;
    shuffleCards: boolean;
    studyMode: string;
  };
  onSettingsChange: (settings: any) => void;
}

export function StudySettingsDialog({
  settings,
  onSettingsChange,
}: StudySettingsDialogProps) {
  const [open, setOpen] = useState(false);
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = () => {
    onSettingsChange(localSettings);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" variant="ghost" size="icon">
          <Settings className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Study Settings</DialogTitle>
          <DialogDescription>
            Customize your flashcard study experience.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-flip">Auto-flip cards</Label>
              <Switch
                id="auto-flip"
                checked={localSettings.autoFlip}
                onCheckedChange={(checked) =>
                  setLocalSettings({ ...localSettings, autoFlip: checked })
                }
              />
            </div>

            {localSettings.autoFlip && (
              <div className="space-y-2">
                <Label>Auto-flip delay: {localSettings.autoFlipDelay}s</Label>
                <Slider
                  value={[localSettings.autoFlipDelay]}
                  onValueChange={([value]) =>
                    setLocalSettings({ ...localSettings, autoFlipDelay: value })
                  }
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <Label htmlFor="pronunciation">Show pronunciation</Label>
              <Switch
                id="pronunciation"
                checked={localSettings.showPronunciation}
                onCheckedChange={(checked) =>
                  setLocalSettings({
                    ...localSettings,
                    showPronunciation: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="shuffle">Shuffle cards</Label>
              <Switch
                id="shuffle"
                checked={localSettings.shuffleCards}
                onCheckedChange={(checked) =>
                  setLocalSettings({ ...localSettings, shuffleCards: checked })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Study Mode</Label>
              <Select
                value={localSettings.studyMode}
                onValueChange={(value) =>
                  setLocalSettings({ ...localSettings, studyMode: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Words</SelectItem>
                  <SelectItem value="new">New Words Only</SelectItem>
                  <SelectItem value="review">Review Mode</SelectItem>
                  <SelectItem value="difficult">Difficult Words</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-indigo-purple hover:opacity-90"
          >
            Save Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
