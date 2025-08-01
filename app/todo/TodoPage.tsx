"use client";

import type React from "react";

import { useState } from "react";
import { ArrowLeft, ListTodo, Calendar, Filter } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateStatusDialog } from "@/components/todo/CreateStatusDialog";
import { TodoColumn } from "@/components/todo/TodoColumn";
import { EditTodoDialog } from "@/components/todo/EditTodoDialog";
import { EditStatusDialog } from "@/components/todo/EditStatusDialog";

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

// Mock data
const initialStatuses: TodoStatus[] = [
  {
    id: "1",
    name: "To Do",
    color: "bg-gray-500",
    todos: [
      {
        id: "1",
        title: "Review Business English Flashcards",
        description:
          "Go through 50 business vocabulary flashcards and practice pronunciation",
        priority: "High",
        dueDate: "2024-02-15",
        tags: ["flashcards", "business", "pronunciation"],
        color: "border-l-red-500",
        createdAt: "2024-02-10",
      },
      {
        id: "2",
        title: "Complete IELTS Writing Practice",
        description: "Write a Task 2 essay on environmental topics",
        priority: "Medium",
        dueDate: "2024-02-16",
        tags: ["ielts", "writing", "essay"],
        color: "border-l-blue-500",
        createdAt: "2024-02-10",
      },
    ],
  },
  {
    id: "2",
    name: "In Progress",
    color: "bg-yellow-500",
    todos: [
      {
        id: "3",
        title: "Study Academic Vocabulary",
        description: "Learn 20 new academic words from the AWL list",
        priority: "Medium",
        dueDate: "2024-02-14",
        tags: ["academic", "vocabulary", "awl"],
        color: "border-l-yellow-500",
        createdAt: "2024-02-09",
      },
    ],
  },
  {
    id: "3",
    name: "Review",
    color: "bg-blue-500",
    todos: [
      {
        id: "4",
        title: "Grammar Quiz - Conditionals",
        description: "Take the online quiz on conditional sentences",
        priority: "Low",
        dueDate: "2024-02-17",
        tags: ["grammar", "conditionals", "quiz"],
        color: "border-l-green-500",
        createdAt: "2024-02-08",
      },
    ],
  },
  {
    id: "4",
    name: "Completed",
    color: "bg-green-500",
    todos: [
      {
        id: "5",
        title: "Daily Conversation Practice",
        description: "Practice common phrases with language exchange partner",
        priority: "Medium",
        dueDate: "2024-02-12",
        tags: ["conversation", "practice", "speaking"],
        color: "border-l-purple-500",
        createdAt: "2024-02-07",
      },
    ],
  },
];

export default function TodoPage() {
  const [statuses, setStatuses] = useState<TodoStatus[]>(initialStatuses);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editingStatus, setEditingStatus] = useState<TodoStatus | null>(null);
  const [draggedTodo, setDraggedTodo] = useState<Todo | null>(null);
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterTag, setFilterTag] = useState("all");

  // Get all unique tags
  const allTags = Array.from(
    new Set(
      statuses.flatMap((status) => status.todos.flatMap((todo) => todo.tags))
    )
  );

  // Filter todos based on selected filters
  const getFilteredStatuses = () => {
    return statuses.map((status) => ({
      ...status,
      todos: status.todos.filter((todo) => {
        const matchesPriority =
          filterPriority === "all" || todo.priority === filterPriority;
        const matchesTag = filterTag === "all" || todo.tags.includes(filterTag);
        return matchesPriority && matchesTag;
      }),
    }));
  };

  const handleCreateStatus = (statusData: Omit<TodoStatus, "id" | "todos">) => {
    const newStatus: TodoStatus = {
      ...statusData,
      id: Date.now().toString(),
      todos: [],
    };
    setStatuses([...statuses, newStatus]);
  };

  const handleUpdateStatus = (updatedStatus: TodoStatus) => {
    setStatuses(
      statuses.map((status) =>
        status.id === updatedStatus.id ? updatedStatus : status
      )
    );
    setEditingStatus(null);
  };

  const handleDeleteStatus = (statusId: string) => {
    setStatuses(statuses.filter((status) => status.id !== statusId));
  };

  const handleAddTodo = (
    statusId: string,
    todoData: Omit<Todo, "id" | "createdAt">
  ) => {
    const newTodo: Todo = {
      ...todoData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    };

    setStatuses(
      statuses.map((status) =>
        status.id === statusId
          ? { ...status, todos: [...status.todos, newTodo] }
          : status
      )
    );
  };

  const handleUpdateTodo = (updatedTodo: Todo) => {
    setStatuses(
      statuses.map((status) => ({
        ...status,
        todos: status.todos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        ),
      }))
    );
    setEditingTodo(null);
  };

  const handleDeleteTodo = (todoId: string) => {
    setStatuses(
      statuses.map((status) => ({
        ...status,
        todos: status.todos.filter((todo) => todo.id !== todoId),
      }))
    );
  };

  const handleDragStart = (e: React.DragEvent, todo: Todo) => {
    setDraggedTodo(todo);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetStatusId: string) => {
    e.preventDefault();
    if (!draggedTodo) return;

    // Remove todo from current status
    const sourceStatus = statuses.find((status) =>
      status.todos.some((todo) => todo.id === draggedTodo.id)
    );
    if (!sourceStatus || sourceStatus.id === targetStatusId) {
      setDraggedTodo(null);
      return;
    }

    // Update statuses
    setStatuses(
      statuses.map((status) => {
        if (status.id === sourceStatus.id) {
          return {
            ...status,
            todos: status.todos.filter((todo) => todo.id !== draggedTodo.id),
          };
        }
        if (status.id === targetStatusId) {
          return {
            ...status,
            todos: [...status.todos, draggedTodo],
          };
        }
        return status;
      })
    );

    setDraggedTodo(null);
  };

  const filteredStatuses = getFilteredStatuses();
  const totalTodos = statuses.reduce(
    (sum, status) => sum + status.todos.length,
    0
  );
  const completedTodos =
    statuses.find((s) => s.name === "Completed")?.todos.length || 0;
  const overdueTodos = statuses
    .flatMap((s) => s.todos)
    .filter(
      (todo) => todo.dueDate && new Date(todo.dueDate) < new Date()
    ).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pl-[112px] pt-6">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 mx-6 rounded-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-wide">
                Learning Tasks
              </h1>
              <p className="text-gray-600 dark:text-gray-400 font-light">
                Organize your vocabulary learning activities
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-full mx-auto space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <ListTodo className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Tasks
                    </p>
                    <p className="text-2xl font-bold">{totalTodos}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Completed
                    </p>
                    <p className="text-2xl font-bold">{completedTodos}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                    <Calendar className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Overdue
                    </p>
                    <p className="text-2xl font-bold">{overdueTodos}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <Filter className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Categories
                    </p>
                    <p className="text-2xl font-bold">{statuses.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-4">
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterTag} onValueChange={setFilterTag}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Tags" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tags</SelectItem>
                  {allTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <CreateStatusDialog onCreateStatus={handleCreateStatus} />
          </div>

          {/* Kanban Board */}
          <div className="flex space-x-6 overflow-x-auto pb-6">
            {filteredStatuses.map((status) => (
              <TodoColumn
                key={status.id}
                status={status}
                onAddTodo={handleAddTodo}
                onEditTodo={setEditingTodo}
                onDeleteTodo={handleDeleteTodo}
                onEditStatus={setEditingStatus}
                onDeleteStatus={handleDeleteStatus}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Edit Dialogs */}
      <EditTodoDialog
        open={!!editingTodo}
        onOpenChange={(open) => !open && setEditingTodo(null)}
        onUpdateTodo={handleUpdateTodo}
        todo={editingTodo}
      />

      <EditStatusDialog
        open={!!editingStatus}
        onOpenChange={(open) => !open && setEditingStatus(null)}
        onUpdateStatus={handleUpdateStatus}
        status={editingStatus}
      />
    </div>
  );
}
