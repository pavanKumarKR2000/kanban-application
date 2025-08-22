import { useDialogStore } from "@/lib/store/useDialogStore";
import { useKanbanStore } from "@/lib/store/useKanbanStore";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import CategoryActionDropdown from "./category-action-dropdown";
import TaskCard from "./task-card";

interface CategoryColumnProps {
  title: string;
  taskIds: string[];
  categoryId: string;
  filteredTaskIds: string[];
}

function CategoryColumn({
  title,
  taskIds,
  categoryId,
  filteredTaskIds,
}: CategoryColumnProps) {
  const setTaskDialogOpen = useDialogStore((state) => state.setTaskDialogOpen);

  const [drop, setDrop] = useState(false);

  const {
    draggedTask,
    setDraggedTask,
    moveTask,
    getTaskById,
    deleteCategory,
    setCurrentSelectedCategoryId,
  } = useKanbanStore();

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
        "p-4 flex flex-col gap-6 border-2 border-dashed border-transparent w-[400px]",
        drop && "border-gray-400"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-lg">
          <h3>{title}</h3>
          <p className="text-gray-400">{taskIds.length}</p>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <CategoryActionDropdown categoryId={categoryId} />
          <Button
            variant="ghost"
            onClick={() => {
              setCurrentSelectedCategoryId(categoryId);
              setTaskDialogOpen(true);
            }}
          >
            <Plus className="size-5" />
          </Button>
        </div>
      </div>
      <div
        className="space-y-2 flex-1 "
        onDragOver={handleOnDragOver}
        onDragLeave={handleOnDragLeave}
        onDrop={handleDrop}
      >
        {filteredTaskIds.map((taskId) => {
          const task = getTaskById(taskId);
          return task ? <TaskCard key={task.id} {...task} /> : null;
        })}
      </div>
    </div>
  );
}

export default CategoryColumn;
