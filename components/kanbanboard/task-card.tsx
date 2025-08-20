"use client";
import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Task, useKanbanStore } from "@/lib/store/useKanbanStore";
import { formatDate } from "@/lib/utils";

interface TaskCardProps extends Task {}

function TaskCard({
  id,
  title,
  description,
  categoryId,
  tagIds,
  order,
  date,
}: TaskCardProps) {
  const { deleteTask, setDraggedTask, tags } = useKanbanStore();

  return (
    <Card
      className="w-96 gap-2"
      draggable
      onDragStart={() => {
        setDraggedTask(id);
      }}
    >
      <CardHeader className="flex items-center gap-2 text-gray-400 text-sm">
        <p>#8793</p>
        <span className="text-xl">&#183;</span>
        <p>{formatDate(date)}</p>
      </CardHeader>
      <CardContent>{title}</CardContent>
      <CardFooter>
        <div className="flex items-center gap-2">
          {Object.values(tags).map((tag) => (
            <Badge key={tag.id} variant="outline">
              {tag.label}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}

export default TaskCard;
