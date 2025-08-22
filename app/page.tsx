"use client";
import TaskCard from "@/components/kanbanboard/task-card";
import { useKanbanStore } from "@/lib/store/useKanbanStore";
import Image from "next/image";

export default function Home() {
  const tasks = useKanbanStore((state) => state.tasks);

  return (
    <div>
      <h2 className="text-5xl font-bold text-center">Kanban board</h2>
      {Object.values(tasks).map((task) => (
        <TaskCard key={task.id} {...task} />
      ))}
    </div>
  );
}
