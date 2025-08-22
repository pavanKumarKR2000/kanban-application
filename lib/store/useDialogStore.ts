import { create } from "zustand";

interface DialogStore {
  taskDialogOpen: boolean;
  setTaskDialogOpen: (open: boolean) => void;
  categoryDialogOpen: boolean;
  setCategoryDialogOpen: (open: boolean) => void;
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
}

export const useDialogStore = create<DialogStore>((set) => ({
  taskDialogOpen: false,
  setTaskDialogOpen: (open) => set({ taskDialogOpen: open }),
  categoryDialogOpen: false,
  setCategoryDialogOpen: (open) => set({ categoryDialogOpen: open }),
  deleteDialogOpen: false,
  setDeleteDialogOpen: (open) => set({ deleteDialogOpen: open }),
}));
