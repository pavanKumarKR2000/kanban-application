import { nanoid } from "nanoid";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface Tag {
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
  date: string;
  order: number;
}

export interface Category {
  id: string;
  title: string;
  taskIds: string[];
  filteredTaskIds: string[];
}

interface KanbanState {
  currentSelectedTaskId: string | undefined;
  currentSelectedCategoryId: string | undefined;
  categories: Category[];
  tasks: Task[];
  tags: Tag[];
  draggedTask: string | undefined;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  setCurrentSelectedTaskId: (id: string | undefined) => void;
  setCurrentSelectedCategoryId: (id: string | undefined) => void;
  setDraggedTask: (id: string | undefined) => void;
  addCategory: (title: string) => void;
  deleteCategory: (categoryId: string) => void;
  updateCategory: (categoryId: string, updates: Partial<Category>) => void;
  addTask: (
    categoryId: string,
    title: string,
    description?: string,
    tagIds?: string[]
  ) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  moveTask: (taskId: string, toCategoryId: string, position?: number) => void;
  getTaskById: (id: string) => Task | undefined;
  getTagById: (id: string) => Tag | undefined;
  getCategoryById: (id: string) => Category | undefined;
  addTag: (label: string, color?: string) => void;
  assignTagToTask: (taskId: string, tagId: string) => void;
  removeTagFromTask: (taskId: string, tagId: string) => void;
  getTasksBySearch: (query: string) => void;
}

export const useKanbanStore = create<KanbanState>()(
  persist(
    devtools(
      immer((set, get) => ({
        categories: [],
        tasks: [],
        tags: [],
        draggedTask: undefined,
        currentSelectedTaskId: undefined,
        currentSelectedCategoryId: undefined,
        searchQuery: "",
        setSearchQuery: (searchQuery: string) =>
          set({ searchQuery: searchQuery }),
        setDraggedTask: (id) => set({ draggedTask: id }),
        setCurrentSelectedTaskId: (id: string | undefined) =>
          set({ currentSelectedTaskId: id }),
        setCurrentSelectedCategoryId: (id: string | undefined) =>
          set({ currentSelectedCategoryId: id }),
        addCategory: (title) =>
          set((state) => {
            const id = nanoid();
            state.categories.push({
              id,
              title,
              taskIds: [],
              filteredTaskIds: [],
            });
          }),
        updateCategory: (categoryId: string, updates: Partial<Category>) =>
          set((state) => {
            const index = state.categories.findIndex(
              (c) => c.id === categoryId
            );
            if (index !== -1) {
              state.categories[index] = {
                ...state.categories[index],
                ...updates,
              };
            }
          }),

        deleteCategory: (categoryId) =>
          set((state) => {
            state.categories = state.categories.filter(
              (c) => c.id !== categoryId
            );
            state.tasks = state.tasks.filter(
              (t) => t.categoryId !== categoryId
            );
          }),

        addTask: (categoryId, title, description, tagIds = []) =>
          set((state) => {
            const category = state.categories.find((c) => c.id === categoryId);
            if (!category) return;

            const id = nanoid();
            const order = category.taskIds.length;

            state.tasks.push({
              id,
              title,
              description,
              categoryId,
              tagIds,
              date: new Date().toISOString(),
              order,
            });

            category.taskIds.push(id);
            category.filteredTaskIds.push(id);
          }),

        updateTask: (taskId: string, updates: Partial<Task>) =>
          set((state) => {
            const index = state.tasks.findIndex((t) => t.id === taskId);
            if (index !== -1) {
              state.tasks[index] = {
                ...state.tasks[index],
                ...updates,
              };
            }
          }),
        deleteTask: (taskId) =>
          set((state) => {
            const task = state.tasks.find((t) => t.id === taskId);
            if (!task) return;
            const category = state.categories.find(
              (c) => c.id === task.categoryId
            );
            if (category) {
              category.taskIds = category.taskIds.filter((id) => id !== taskId);
              category.filteredTaskIds = category.filteredTaskIds.filter(
                (id) => id !== taskId
              );
            }
            state.tasks = state.tasks.filter((t) => t.id !== taskId);
          }),

        moveTask: (taskId, toCategoryId, position) =>
          set((state) => {
            const task = state.tasks.find((t) => t.id === taskId);
            if (!task) return;

            const oldCat = state.categories.find(
              (c) => c.id === task.categoryId
            );
            if (oldCat) {
              oldCat.taskIds = oldCat.taskIds.filter((id) => id !== taskId);
              oldCat.filteredTaskIds = [...oldCat.taskIds]; // sync here
            }

            const newCat = state.categories.find((c) => c.id === toCategoryId);
            if (newCat) {
              if (position != null) {
                newCat.taskIds.splice(position, 0, taskId);
              } else {
                newCat.taskIds.push(taskId);
              }

              task.categoryId = toCategoryId;
              task.order = position ?? newCat.taskIds.length - 1;

              newCat.filteredTaskIds = [...newCat.taskIds];
            }
          }),

        getTaskById: (id: string) => get().tasks.find((task) => task.id === id),
        getCategoryById: (id: string) =>
          get().categories.find((task) => task.id === id),

        getTagById: (id: string) => get().tags.find((tag) => tag.id === id),

        addTag: (label, color) =>
          set((state) => {
            const id = nanoid();
            state.tags.push({ id, label, color });
          }),

        assignTagToTask: (taskId, tagId) =>
          set((state) => {
            const task = state.tasks.find((t) => t.id === taskId);
            if (task && !task.tagIds.includes(tagId)) {
              task.tagIds.push(tagId);
            }
          }),

        removeTagFromTask: (taskId, tagId) =>
          set((state) => {
            const task = state.tasks.find((t) => t.id === taskId);
            if (task) {
              task.tagIds = task.tagIds.filter((id) => id !== tagId);
            }
          }),
        getTasksBySearch: (query: string) =>
          set((state) => {
            const lowerQuery = query.toLowerCase();
            state.categories.forEach((cat) => {
              const filtered = cat.taskIds.filter((taskId) => {
                const task = state.tasks.find((t) => t.id === taskId);
                if (!task) return false;

                const matchesTitle = task.title
                  .toLowerCase()
                  .includes(lowerQuery);

                const matchesTag = task.tagIds.some((tid) => {
                  const tag = state.tags.find((tg) => tg.id === tid);
                  return tag?.label.toLowerCase().includes(lowerQuery);
                });

                return matchesTitle || matchesTag;
              });
              cat.filteredTaskIds = filtered;
            });
          }),
      })),
      { name: "KanbanStore" }
    ),
    { name: "kanban-state" }
  )
);
