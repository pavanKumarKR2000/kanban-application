"use client";

import React, { useEffect } from "react";
import { LogoutButton } from "../logout-button";
import SearchFilter from "./search-filter";
import { useKanbanStore } from "@/lib/store/useKanbanStore";
import { useDialogStore } from "@/lib/store/useDialogStore";

function Header() {
  const { taskDialogOpen, deleteDialogOpen, categoryDialogOpen } =
    useDialogStore();
  const { setCurrentSelectedCategoryId, setCurrentSelectedTaskId } =
    useKanbanStore();

  useEffect(() => {
    if (!taskDialogOpen) {
      setCurrentSelectedTaskId(undefined);
      setCurrentSelectedCategoryId(undefined);
    }
  }, [taskDialogOpen]);

  useEffect(() => {
    if (!deleteDialogOpen) {
      setCurrentSelectedTaskId(undefined);
      setCurrentSelectedCategoryId(undefined);
    }
  }, [deleteDialogOpen]);

  useEffect(() => {
    if (!categoryDialogOpen) {
      setCurrentSelectedCategoryId(undefined);
    }
  }, [categoryDialogOpen]);

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-3xl">Project1</h2>
        <div>
          <LogoutButton />
        </div>
      </div>
      <SearchFilter />
    </div>
  );
}

export default Header;
