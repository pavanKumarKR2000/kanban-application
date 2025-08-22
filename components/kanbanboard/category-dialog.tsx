import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useKanbanStore } from "@/lib/store/useKanbanStore";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface CategoryDialogProps {
  dialogTitle: string;
  id?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CategoryDialog({
  dialogTitle,
  id,
  onOpenChange,
  open,
}: CategoryDialogProps) {
  const [category, setCategory] = useState("");
  const { addCategory, getCategoryById, updateCategory } = useKanbanStore();

  useEffect(() => {
    if (id) {
      setCategory(getCategoryById(id)?.title as string);
    }
  }, [id]);

  function onCategoryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCategory(e.target.value);
  }

  function onAddCategory() {
    addCategory(category);
    setCategory("");
    toast.success("Category added successfully!");
    onOpenChange(false);
  }

  function onEditCategory() {
    updateCategory(id as string, { title: category });
    setCategory("");
    toast.success("Category updated successfully!");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {!id && (
        <DialogTrigger className="cursor-pointer mt-4" asChild>
          <Button
            variant="secondary"
            className="flex items-center gap-2 w-96 text-gray-500"
          >
            <Plus className="size-5" />
            <p className="text-lg">{dialogTitle}</p>
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mt-6 text-center">{dialogTitle}</DialogTitle>
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
            onClick={() => (id ? onEditCategory() : onAddCategory())}
            disabled={!category}
          >
            {id ? "Edit" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
