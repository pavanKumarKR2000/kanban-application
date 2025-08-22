"use client";
import { useKanbanStore } from "@/lib/store/useKanbanStore";
import CategoryColumn from "./category-column";
import Header from "./header";
import CategoryDialog from "./category-dialog";
import { useState } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

function Board() {
  const { categories, tasks } = useKanbanStore();
  const [AddCategoryDialogOpen, setAddCategoryDialogOpen] = useState(false);

  function onAddCategoryDialogOpen(open: boolean) {
    setAddCategoryDialogOpen(open);
  }

  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <ScrollArea className="w-full flex-1 rounded-md flex size-auto!">
        <div className="flex h-full">
          {categories.map((category) => (
            <CategoryColumn
              key={category.id}
              title={category.title}
              taskIds={category.taskIds}
              categoryId={category.id}
            />
          ))}
          <CategoryDialog
            dialogTitle="Add category"
            open={AddCategoryDialogOpen}
            onOpenChange={onAddCategoryDialogOpen}
          />
        </div>
        <ScrollBar orientation="horizontal" color="black" />
      </ScrollArea>
    </div>
  );
}

export default Board;
