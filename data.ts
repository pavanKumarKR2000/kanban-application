import { Category, Tag, Task } from "./lib/store/useKanbanStore";

export const mockCategories: Category[] = [
  {
    id: "todo",
    title: "To Do",
    taskIds: ["task-1", "task-2"],
  },
  {
    id: "in-progress",
    title: "In Progress",
    taskIds: ["task-3"],
  },
  {
    id: "done",
    title: "Done",
    taskIds: [],
  },
];

export const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Set up project",
    description: "Initialize repo and install dependencies",
    categoryId: "todo",
    tagIds: ["tag-1"],
    date: new Date().toISOString(),
    order: 0,
  },
  {
    id: "task-2",
    title: "Create UI layout",
    description: "Basic kanban layout with Tailwind",
    categoryId: "todo",
    tagIds: ["tag-2"],
    date: new Date().toISOString(),
    order: 1,
  },
  {
    id: "task-3",
    title: "Implement drag & drop",
    description: "Allow moving tasks between categories",
    categoryId: "in-progress",
    tagIds: ["tag-3"],
    date: new Date().toISOString(),
    order: 0,
  },
];

export const mockTags: Tag[] = [
  { id: "tag-1", label: "Bug", color: "#ef4444" }, // red
  { id: "tag-2", label: "Feature", color: "#3b82f6" }, // blue
  { id: "tag-3", label: "UI", color: "#22c55e" }, // green
];
