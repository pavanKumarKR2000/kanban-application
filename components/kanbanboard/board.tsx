"use client";
import { useKanbanStore } from "@/lib/store/useKanbanStore";
import React from "react";
import Header from "./header";
import CategoryColumn from "./category-column";

function Board() {
  const { categories, tasks } = useKanbanStore();

  return (
    <div className="flex flex-1 flex-col gap-4">
      <Header />
      <div className="flex flex-1 items-stretch">
        {Object.values(categories).map((category) => (
          <CategoryColumn
            key={category.id}
            title={category.title}
            taskIds={category.taskIds}
          />
        ))}
      </div>
    </div>
  );
}

export default Board;
