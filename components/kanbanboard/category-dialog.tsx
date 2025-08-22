import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDialogStore } from "@/lib/store/useDialogStore";
import { useKanbanStore } from "@/lib/store/useKanbanStore";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CategoryDialog() {
  const [category, setCategory] = useState("");
  const {
    addCategory,
    getCategoryById,
    updateCategory,
    currentSelectedCategoryId,
  } = useKanbanStore();
  const { categoryDialogOpen, setCategoryDialogOpen } = useDialogStore();

  function onCategoryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCategory(e.target.value);
  }

  function onAddCategory() {
    addCategory(category);
    setCategory("");
    toast.success("Category added successfully!");
    setCategoryDialogOpen(false);
  }

  function onEditCategory() {
    updateCategory(currentSelectedCategoryId as string, { title: category });
    setCategory("");
    toast.success("Category updated successfully!");
    setCategoryDialogOpen(false);
  }

  useEffect(() => {
    if (currentSelectedCategoryId) {
      setCategory(getCategoryById(currentSelectedCategoryId)?.title as string);
    }
  }, [currentSelectedCategoryId, getCategoryById]);

  return (
    <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mt-6 text-center">
            {currentSelectedCategoryId ? "Edit category" : "Add category"}
          </DialogTitle>
        </DialogHeader>
        <div>
          <Input
            placeholder="example-category"
            value={category}
            onChange={onCategoryChange}
          />
        </div>
        <DialogFooter className="flex items-center !justify-center gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={() =>
              currentSelectedCategoryId ? onEditCategory() : onAddCategory()
            }
            disabled={!category}
          >
            {currentSelectedCategoryId ? "Edit" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
