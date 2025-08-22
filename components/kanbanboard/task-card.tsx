"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Task, useKanbanStore } from "@/lib/store/useKanbanStore";
import { cn, formatDate } from "@/lib/utils";
import { useState } from "react";
import TaskActionDropdown from "./task-action-dropdown";

interface TaskCardProps extends Task {}

function TaskCard({ id, title, categoryId, tagIds, date }: TaskCardProps) {
  const { setDraggedTask, getTagById } = useKanbanStore();
  const [dragging, setDragging] = useState(false);

  return (
    <Card
      className={cn(
        "w-full gap-2 select-none",
        dragging ? "cursor-grabbing" : "cursor-grab"
      )}
      draggable
      onDragStart={() => {
        setDraggedTask(id);
        setDragging(true);
      }}
      onDragEnd={() => {
        setDraggedTask(undefined);
        setDragging(false);
      }}
    >
      <CardHeader className="flex items-center justify-between text-gray-500 text-sm">
        <div className="flex items-center gap-2">
          <p>#8793</p>
          <span className="text-xl">&#183;</span>
          <p>{formatDate(date)}</p>
        </div>
        <TaskActionDropdown taskId={id} categoryId={categoryId} />
      </CardHeader>
      <CardContent>{title}</CardContent>
      <CardFooter>
        <div className="flex items-center gap-2 min-h-7">
          {tagIds.map((tagId) => {
            const tag = getTagById(tagId);
            if (!tag) return null;

            return (
              <Badge
                key={tag.id}
                variant="outline"
                style={{ background: tag.color }}
                className="text-white"
              >
                {tag.label}
              </Badge>
            );
          })}
        </div>
      </CardFooter>
    </Card>
  );
}

export default TaskCard;
