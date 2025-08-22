import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Plus } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useKanbanStore } from "@/lib/store/useKanbanStore";
import { Label } from "../ui/label";
import ColorSelector from "../ui/color-selector";
import { TAG_COLORS } from "@/lib/constants";
import { MultiSelect } from "../ui/multi-select";
import { toast } from "sonner";

const createTaskSchema = z.object({
  title: z.string().min(1, { message: "Task title is required" }),
  selectedTags: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .optional(),
  tag: z.string().optional(),
  tagColor: z.string().optional(),
});

interface CreateTaskDialogProps {
  categoryId: string;
  dialogTitle: string;
  id?: string;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}

export default function TaskDialog({
  categoryId,
  dialogTitle,
  id,
  onOpenChange,
  open,
}: CreateTaskDialogProps) {
  const { addTag, tags, addTask, getTaskById, getTagById, updateTask } =
    useKanbanStore();

  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: (() => {
      if (id) {
        const { title, tagIds } = getTaskById(id)!;
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
        tagColor: "",
      };
    })(),
  });

  function onSubmit({ title, selectedTags }: z.infer<typeof createTaskSchema>) {
    console.log(title);
    if (!id) {
      addTask(
        categoryId,
        title,
        "",
        selectedTags?.map((selectedTag) => selectedTag.value)
      );
      toast.success("Task added successfully");
    } else {
      updateTask(id, {
        title,
        tagIds: selectedTags?.map((selectedTag) => selectedTag.value),
      });
      toast.success("Task updated successfully");
    }
  }

  useEffect(() => {
    console.log(form.formState.errors);
  }, [form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {!id && (
        <DialogTrigger className="cursor-pointer " asChild>
          <Button variant="ghost">
            <Plus className="size-5" />
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">{dialogTitle}</DialogTitle>
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
              <FormField
                control={form.control}
                name="tag"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Create tag <span className="text-xs">(optional)</span>
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
                <Button type="submit">{id ? "Edit Task" : "Add Task"}</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
