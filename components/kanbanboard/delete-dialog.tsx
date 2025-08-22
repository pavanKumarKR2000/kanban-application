import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDialogStore } from "@/lib/store/useDialogStore";
import { useKanbanStore } from "@/lib/store/useKanbanStore";
import { toast } from "sonner";

export default function DeleteDialog() {
  const { deleteDialogOpen, setDeleteDialogOpen } = useDialogStore();
  const {
    currentSelectedCategoryId,
    currentSelectedTaskId,
    deleteCategory,
    deleteTask,
  } = useKanbanStore();

  function onDelete() {
    if (currentSelectedTaskId) {
      deleteTask(currentSelectedTaskId);
      toast.success("Task deleted successfully!");
    } else if (currentSelectedCategoryId) {
      deleteCategory(currentSelectedCategoryId);
      toast.success("Category deleted successfully!");
    }
    setDeleteDialogOpen(false);
  }

  return (
    <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mt-6 text-center">{`Are you sure you want to delete this ${
            currentSelectedTaskId ? "task" : "category"
          }?`}</DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex items-center !justify-center gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={onDelete} variant="destructive">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
