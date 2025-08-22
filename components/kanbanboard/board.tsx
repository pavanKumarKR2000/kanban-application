"use client";
import { useKanbanStore } from "@/lib/store/useKanbanStore";
import CategoryColumn from "./category-column";
import Header from "./header";
import CategoryDialog from "./category-dialog";
import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { useDialogStore } from "@/lib/store/useDialogStore";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

function Board() {
  const { categories } = useKanbanStore();
  const { setCategoryDialogOpen } = useDialogStore();

  return (
    <div className="flex flex-1 flex-col mx-auto! container">
      <Header />
      <ScrollArea className="w-full flex-1 rounded-md flex mb-2">
        <div className="flex flex-1! max-w-screen  overflow-x-auto items-stretch min-h-[70vh]!">
          {categories.map((category) => (
            <CategoryColumn
              key={category.id}
              title={category.title}
              taskIds={category.taskIds}
              categoryId={category.id}
              filteredTaskIds={category.filteredTaskIds}
            />
          ))}
          <Button
            className="text-gray-500 w-[400px]! mt-4 text-lg"
            variant="secondary"
            onClick={() => setCategoryDialogOpen(true)}
          >
            <Plus className="size-5" />
            Add category
          </Button>
        </div>
        <ScrollBar orientation="horizontal" className="bg" />
      </ScrollArea>
    </div>
  );
}

export default Board;
