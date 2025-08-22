"use client";
import TaskCard from "@/components/kanbanboard/task-card";
import { useKanbanStore } from "@/lib/store/useKanbanStore";
import Image from "next/image";

export default function Home() {
  const tasks = useKanbanStore((state) => state.tasks);

  return <div>home page</div>;
}
