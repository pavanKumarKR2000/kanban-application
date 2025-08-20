import { useKanbanStore } from "@/lib/store/useKanbanStore";
import { Ellipsis, Plus } from "lucide-react";
import React from "react";
import TaskCard from "./task-card";
import { Button } from "../ui/button";
import CreateTaskDialog from "./create-task-dialog";

interface CategoryColumnProps {
  title: string;
  taskIds: string[];
}

function CategoryColumn({ title, taskIds }: CategoryColumnProps) {
  const tasks = useKanbanStore((state) => state.tasks);

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h3>{title}</h3>
        <div className="flex items-center gap-2 text-gray-400">
          <Button variant="ghost">
            <Ellipsis className="size-5" />
          </Button>
          <CreateTaskDialog />
        </div>
      </div>
      <div className="space-y-2">
        {taskIds.map((taskId) => (
          <TaskCard key={taskId} {...tasks[taskId]} />
        ))}
      </div>
    </div>
  );
}

export default CategoryColumn;
