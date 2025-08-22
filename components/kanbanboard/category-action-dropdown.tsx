import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";

interface CategoryActionDropdownProps {
  onDeleteCategoryDialogOpen: (open: boolean) => void;
  onEditCategoryDialogOpen: (open: boolean) => void;
}

export default function CategoryActionDropdown({
  onDeleteCategoryDialogOpen,
  onEditCategoryDialogOpen,
}: CategoryActionDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Ellipsis className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit" align="start">
        <DropdownMenuItem onClick={() => onEditCategoryDialogOpen(true)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDeleteCategoryDialogOpen(true)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
