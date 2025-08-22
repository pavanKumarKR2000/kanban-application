"use client";
import { useDialogStore } from "@/lib/store/useDialogStore";
import { useKanbanStore } from "@/lib/store/useKanbanStore";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import CategoryColumn from "./category-column";
import Header from "./header";

function Board() {
  const { categories } = useKanbanStore();
  const { setCategoryDialogOpen } = useDialogStore();

  return (
    <div className="flex flex-1 flex-col mx-auto! container">
      <Header />
      <ScrollArea className="flex-1 rounded-md flex mb-2 whitespace-nowrap w-full ">
        <div className="flex flex-1!  items-stretch min-h-[70vh]!  overflow-hidden! gap-6">
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
