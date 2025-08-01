"use client";

import type React from "react";

import { useState } from "react";
import { Plus, MoreVertical, Edit, Trash2 } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TodoItem } from "./TodoItem";
import { CreateTodoDialog } from "./CreateTodoDialog";

interface Todo {
  id: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  dueDate: string;
  tags: string[];
  color: string;
  createdAt: string;
}

interface TodoStatus {
  id: string;
  name: string;
  color: string;
  todos: Todo[];
}

interface TodoColumnProps {
  status: TodoStatus;
  onAddTodo: (statusId: string, todo: Omit<Todo, "id" | "createdAt">) => void;
  onEditTodo: (todo: Todo) => void;
  onDeleteTodo: (todoId: string) => void;
  onEditStatus: (status: TodoStatus) => void;
  onDeleteStatus: (statusId: string) => void;
  onDragStart: (e: React.DragEvent, todo: Todo) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, statusId: string) => void;
}

export function TodoColumn({
  status,
  onAddTodo,
  onEditTodo,
  onDeleteTodo,
  onEditStatus,
  onDeleteStatus,
  onDragStart,
  onDragOver,
  onDrop,
}: TodoColumnProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const handleAddTodo = (todoData: Omit<Todo, "id" | "createdAt">) => {
    onAddTodo(status.id, todoData);
    setShowCreateDialog(false);
  };

  return (
    <div
      className="flex-shrink-0 w-80"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, status.id)}
    >
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${status.color}`} />
              <h3 className="font-semibold tracking-wide">{status.name}</h3>
              <Badge variant="secondary" className="text-xs">
                {status.todos.length}
              </Badge>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setShowCreateDialog(true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEditStatus(status)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Status
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onDeleteStatus(status.id)}
                    className="text-red-600"
                    disabled={status.todos.length > 0}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Status
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3 min-h-[400px]">
            {status.todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onEdit={onEditTodo}
                onDelete={onDeleteTodo}
                onDragStart={onDragStart}
              />
            ))}
            {status.todos.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">No tasks yet</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCreateDialog(true)}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <CreateTodoDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onCreateTodo={handleAddTodo}
        statusName={status.name}
      />
    </div>
  );
}
