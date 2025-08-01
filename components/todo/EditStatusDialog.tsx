"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TodoStatus {
  id: string;
  name: string;
  color: string;
  todos: any[];
}

interface EditStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateStatus: (status: TodoStatus) => void;
  status: TodoStatus | null;
}

export function EditStatusDialog({
  open,
  onOpenChange,
  onUpdateStatus,
  status,
}: EditStatusDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    color: "bg-blue-500",
  });

  const colors = [
    { name: "Blue", value: "bg-blue-500" },
    { name: "Green", value: "bg-green-500" },
    { name: "Purple", value: "bg-purple-500" },
    { name: "Orange", value: "bg-orange-500" },
    { name: "Red", value: "bg-red-500" },
    { name: "Pink", value: "bg-pink-500" },
    { name: "Indigo", value: "bg-indigo-500" },
    { name: "Yellow", value: "bg-yellow-500" },
  ];

  useEffect(() => {
    if (status) {
      setFormData({
        name: status.name,
        color: status.color,
      });
    }
  }, [status]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !status) return;

    onUpdateStatus({
      ...status,
      ...formData,
    });
  };

  if (!status) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Status</DialogTitle>
          <DialogDescription>
            Update the status column details.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Status Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., In Review, Completed"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Color</Label>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, color: color.value })
                    }
                    className={`w-8 h-8 rounded-full ${color.value} ${
                      formData.color === color.value
                        ? "ring-2 ring-offset-2 ring-indigo-500"
                        : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-indigo-purple hover:opacity-90"
            >
              <Save className="h-4 w-4 mr-2" />
              Update Status
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
