import { create } from "zustand";
import { nanoid } from "nanoid";
import { immer } from "zustand/middleware/immer";
import { mockCategories, mockTags, mockTasks } from "@/data";

interface Tag {
  id: string;
  label: string;
  color?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  categoryId: string;
  tagIds: string[];
  date: string; // new
  order: number; // new
}

interface Category {
  id: string;
  title: string;
  taskIds: string[];
}

interface KanbanState {
  categories: Record<string, Category>;
  tasks: Record<string, Task>;
  tags: Record<string, Tag>;
  draggedTask: string | undefined;
  setDraggedTask: (id: string) => void;

  addCategory: (title: string) => void;
  deleteCategory: (categoryId: string) => void;

  addTask: (categoryId: string, title: string, description?: string) => void;
  updateTask: (taskId: string, updates: Partial<Omit<Task, "id">>) => void;
  deleteTask: (taskId: string) => void;

  moveTask: (taskId: string, toCategoryId: string, position?: number) => void;

  addTag: (label: string, color?: string) => void;
  assignTagToTask: (taskId: string, tagId: string) => void;
  removeTagFromTask: (taskId: string, tagId: string) => void;
}

export const useKanbanStore = create<KanbanState>()(
  immer((set) => ({
    categories: mockCategories,
    tasks: mockTasks,
    tags: mockTags,
    draggedTask: undefined,

    setDraggedTask: (id) =>
      set({
        draggedTask: id,
      }),

    addCategory: (title) =>
      set((state) => {
        const id = nanoid();
        state.categories[id] = { id, title, taskIds: [] };
      }),

    deleteCategory: (categoryId) =>
      set((state) => {
        const category = state.categories[categoryId];
        if (category) {
          category.taskIds.forEach((taskId) => {
            delete state.tasks[taskId];
          });
          delete state.categories[categoryId];
        }
      }),

    addTask: (categoryId, title, description) =>
      set((state) => {
        const id = nanoid();
        const order = state.categories[categoryId]?.taskIds.length || 0;
        state.tasks[id] = {
          id,
          title,
          description,
          categoryId,
          tagIds: [],
          date: new Date().toISOString(), // store date as ISO string
          order, // set order based on current index
        };
        state.categories[categoryId]?.taskIds.push(id);
      }),

    updateTask: (taskId, updates) =>
      set((state) => {
        const task = state.tasks[taskId];
        if (task) {
          Object.assign(task, updates);
        }
      }),

    deleteTask: (taskId) =>
      set((state) => {
        const task = state.tasks[taskId];
        if (task) {
          const category = state.categories[task.categoryId];
          if (category) {
            category.taskIds = category.taskIds.filter((id) => id !== taskId);
          }
          delete state.tasks[taskId];
        }
      }),

    moveTask: (taskId, toCategoryId, position) =>
      set((state) => {
        const task = state.tasks[taskId];
        if (!task) return;

        const oldCat = state.categories[task.categoryId];
        if (oldCat) {
          oldCat.taskIds = oldCat.taskIds.filter((id) => id !== taskId);
        }

        const newCat = state.categories[toCategoryId];
        if (newCat) {
          if (position != null) {
            newCat.taskIds.splice(position, 0, taskId);
          } else {
            newCat.taskIds.push(taskId);
          }

          // update task
          task.categoryId = toCategoryId;
          task.order = position ?? newCat.taskIds.length - 1;
        }
      }),

    addTag: (label, color) =>
      set((state) => {
        const id = nanoid();
        state.tags[id] = { id, label, color };
      }),

    assignTagToTask: (taskId, tagId) =>
      set((state) => {
        const task = state.tasks[taskId];
        if (task && !task.tagIds.includes(tagId)) {
          task.tagIds.push(tagId);
        }
      }),

    removeTagFromTask: (taskId, tagId) =>
      set((state) => {
        const task = state.tasks[taskId];
        if (task) {
          task.tagIds = task.tagIds.filter((id) => id !== tagId);
        }
      }),
  }))
);
