import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDialogStore } from "@/lib/store/useDialogStore";
import { useKanbanStore } from "@/lib/store/useKanbanStore";
import { Ellipsis } from "lucide-react";

interface TaskActionDropdownProps {
  taskId: string;
  categoryId: string;
}

export default function TaskActionDropdown({
  taskId,
  categoryId,
}: TaskActionDropdownProps) {
  const { setTaskDialogOpen, setDeleteDialogOpen } = useDialogStore();
  const { setCurrentSelectedTaskId, setCurrentSelectedCategoryId } =
    useKanbanStore();

  function onEditClick() {
    setTaskDialogOpen(true);
    setCurrentSelectedTaskId(taskId);
    setCurrentSelectedCategoryId(categoryId);
  }

  function onDeleteClick() {
    setDeleteDialogOpen(true);
    setCurrentSelectedTaskId(taskId);
    setCurrentSelectedCategoryId(categoryId);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Ellipsis className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit" align="start">
        <DropdownMenuItem onClick={onEditClick}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={onDeleteClick}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
