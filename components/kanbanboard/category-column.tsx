import { useKanbanStore } from "@/lib/store/useKanbanStore";
import { Ellipsis, Plus } from "lucide-react";
import React, { useState } from "react";
import TaskCard from "./task-card";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import TaskDialog from "./task-dialog";
import CategoryActionDropdown from "./category-action-dropdown";
import DeleteDialog from "./delete-dialog";
import { toast } from "sonner";
import CategoryDialog from "./category-dialog";

interface CategoryColumnProps {
  title: string;
  taskIds: string[];
  categoryId: string;
}

function CategoryColumn({ title, taskIds, categoryId }: CategoryColumnProps) {
  const [deleteCategoryDialogOpen, setDeleteCategoryDialogOpen] =
    useState(false);
  const [EditCategoryDialogOpen, setEditCategoryDialogOpen] = useState(false);

  const [drop, setDrop] = useState(false);

  const { draggedTask, setDraggedTask, moveTask, getTaskById, deleteCategory } =
    useKanbanStore();

  function onDeleteCategoryDialogOpen(open: boolean) {
    setDeleteCategoryDialogOpen(open);
  }

  function onEditCategoryDialogOpen(open: boolean) {
    setEditCategoryDialogOpen(open);
  }

  function onDeleteTask() {
    deleteCategory(categoryId);
    toast.success("Category deleted successfully!");
  }

  const handleDrop = () => {
    setDraggedTask(undefined);
    moveTask(draggedTask as string, categoryId, 1);
    setDrop(false);
  };

  const handleOnDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrop(false);
  };

  const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrop(true);
  };

  return (
    <div
      className={cn(
        "p-4 flex flex-col gap-6 border-2 border-dashed border-transparent flex-1!",
        drop && "border-gray-400"
      )}
    >
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-1 text-lg">
          <h3>{title}</h3>
          <p className="text-gray-400">{taskIds.length}</p>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <CategoryActionDropdown
            onDeleteCategoryDialogOpen={onDeleteCategoryDialogOpen}
            onEditCategoryDialogOpen={onEditCategoryDialogOpen}
          />
          <TaskDialog categoryId={categoryId} dialogTitle="Create task" />
        </div>
      </div>
      <div
        className="space-y-2 flex-1 w-96"
        onDragOver={handleOnDragOver}
        onDragLeave={handleOnDragLeave}
        onDrop={handleDrop}
      >
        {taskIds.map((taskId) => {
          const task = getTaskById(taskId);
          return task ? <TaskCard key={task.id} {...task} /> : null;
        })}
      </div>
      {
        <DeleteDialog
          onOpenChange={onDeleteCategoryDialogOpen}
          open={deleteCategoryDialogOpen}
          title="Are you sure you want to delete this category?"
          action={onDeleteTask}
        />
      }
      {EditCategoryDialogOpen && (
        <CategoryDialog
          dialogTitle="Edit category"
          id={categoryId}
          open={EditCategoryDialogOpen}
          onOpenChange={onEditCategoryDialogOpen}
        />
      )}
    </div>
  );
}

export default CategoryColumn;
