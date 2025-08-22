import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect } from "react";

import { Plus } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TAG_COLORS } from "@/lib/constants";
import { useDialogStore } from "@/lib/store/useDialogStore";
import { useKanbanStore } from "@/lib/store/useKanbanStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { MultiSelect } from "../ui/multi-select";

const createTaskSchema = z.object({
  title: z.string().min(1, { message: "Task title is required" }),
  selectedTags: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .optional(),
  tag: z.string().optional(),
  tagColor: z.string().optional(),
});

export default function TaskDialog() {
  const {
    addTag,
    tags,
    addTask,
    getTaskById,
    getTagById,
    updateTask,
    currentSelectedTaskId,
    currentSelectedCategoryId,
    setSearchQuery,
  } = useKanbanStore();

  console.log(currentSelectedCategoryId);

  const { taskDialogOpen, setTaskDialogOpen } = useDialogStore();

  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: (() => {
      if (currentSelectedTaskId) {
        const { title, tagIds } = getTaskById(currentSelectedTaskId as string)!;
        const tags = tagIds.map((tagId) => ({
          value: tagId,
          label: getTagById(tagId)?.label ?? "",
        }));

        return {
          title,
          selectedTags: tags,
          tag: "",
          tagColor: "",
        };
      }

      return {
        title: "",
        selectedTags: [],
        tag: "",
        tagColor: TAG_COLORS[0],
      };
    })(),
  });

  function onAddTag() {
    if (form.getValues("tag")) {
      addTag(form.getValues("tag") as string, form.getValues("tagColor"));
      toast.success("Tag added successfully!");
    }
  }

  function onSubmit({ title, selectedTags }: z.infer<typeof createTaskSchema>) {
    if (!currentSelectedTaskId) {
      addTask(
        currentSelectedCategoryId as string,
        title,
        "",
        selectedTags?.map((selectedTag) => selectedTag.value)
      );
      toast.success("Task added successfully");
    } else {
      updateTask(currentSelectedTaskId, {
        title,
        tagIds: selectedTags?.map((selectedTag) => selectedTag.value),
      });
      toast.success("Task updated successfully");
    }
    setTaskDialogOpen(false);
  }

  useEffect(() => {
    setSearchQuery("");
  }, []);

  return (
    <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            {currentSelectedTaskId ? "Edit task" : "Add Task"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task</FormLabel>
                    <FormControl>
                      <Input placeholder="task1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-8 border rounded-md p-3">
                <FormField
                  control={form.control}
                  name="tag"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Create new tag
                        <span className="text-xs">(optional)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="tag-1"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tagColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Select tag color
                        <span className="text-xs">(optional)</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select tag color" />
                          </SelectTrigger>
                          <SelectContent>
                            {TAG_COLORS.map((color) => (
                              <SelectItem
                                key={color}
                                value={color}
                                style={{ backgroundColor: color }}
                              >
                                {color}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="button" onClick={onAddTag}>
                  Add tag
                </Button>
              </div>

              <FormField
                control={form.control}
                name="selectedTags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Tags</FormLabel>
                    <FormControl onClick={() => alert("hi")}>
                      <MultiSelect
                        options={tags.map((tag) => ({
                          value: tag.id,
                          label: tag.label,
                        }))}
                        selected={field.value ?? []}
                        onChange={field.onChange}
                        placeholder="Select tags"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="flex items-center !justify-center gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">
                  {currentSelectedTaskId ? "Edit task" : "Add Task"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
