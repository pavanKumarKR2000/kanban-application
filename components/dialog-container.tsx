"use client";

import React from "react";
import TaskDialog from "./kanbanboard/task-dialog";
import CategoryDialog from "./kanbanboard/category-dialog";
import DeleteDialog from "./kanbanboard/delete-dialog";
import { useDialogStore } from "@/lib/store/useDialogStore";

function DialogContainer() {
  const { taskDialogOpen, deleteDialogOpen, categoryDialogOpen } =
    useDialogStore();

  return (
    <>
      {taskDialogOpen && <TaskDialog />}
      {categoryDialogOpen && <CategoryDialog />}
      {deleteDialogOpen && <DeleteDialog />}
    </>
  );
}

export default DialogContainer;
