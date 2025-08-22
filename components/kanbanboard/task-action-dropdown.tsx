import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";

interface TaskActionDropdownProps {
  onDeleteTaskDialogOpen: (open: boolean) => void;
  onEditTaskDialogOpen: (open: boolean) => void;
}

export default function TaskActionDropdown({
  onDeleteTaskDialogOpen,
  onEditTaskDialogOpen,
}: TaskActionDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Ellipsis className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit" align="start">
        <DropdownMenuItem onClick={() => onEditTaskDialogOpen(true)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDeleteTaskDialogOpen(true)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
