import React from "react";
import z from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSidebarStore } from "@/providers/sidebar-provider";
import { CrossIcon } from "../icons/form-icons";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";

import {
  Select,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "../ui/select";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "../ui/form";

import { Input } from "../ui/input";

import { _minLength } from "zod/v4/core";
import { Textarea } from "../ui/textarea";
import { AddNewTaskMobileIcon } from "../icons/sidebar-icons";

const addNewTaskSchema = z.object({
  title: z.string(),
  description: z
    .string()
    .min(10, { message: "This can't be less than 10 characters." }),
  subTasks: z.array(z.string()).min(1, "This can't be empty"),
  status: z.string(),
  colName: z.string(),
});

const taskStatuses: string[] = ["To Do", "Doing", "Done"];
const columnNames: string[] = ["Col 1", "Col 2", "Col 3", "Col 4"];

export default function AddNewTaskDialog() {
  const { activeIndex, boards } = useSidebarStore((state) => state);
  const form = useForm<z.infer<typeof addNewTaskSchema>>({
    resolver: zodResolver(addNewTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      subTasks: [],
      status: "",
      colName: "",
    },
  });
  const { fields, remove, append } = useFieldArray({
    control: form.control,
    // @ts-ignore
    name: "subTasks",
  });

  React.useEffect(() => {
    // This is to make sure that at least one field of subTasks is shown after the page renders.
    append("");
  }, []);
  const onSubmit = (values: z.infer<typeof addNewTaskSchema>) => {
    // console.log(values);
    console.log("fields:", fields);
    console.log("fields.length:", fields.length);
    console.log("form values:", form.getValues());
  };
  // Function to add subTask Fields
  const addNewSubTask = () => {
    const currentSubTasks = form.getValues("subTasks") || [];
    form.setValue("subTasks", [...currentSubTasks, ""]);
  };

  // Function to delete subTask Fields
  const removeSubTask = (index: number) => {
    const currentSubTasks = form.getValues("subTasks") || [];
    if (currentSubTasks.length > 1) {
      form.setValue(
        "subTasks",
        currentSubTasks.filter((_, i) => i !== index)
      );
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        className="hidden md:block rounded-full py-2 px-4 lg:py-3 lg:px-7 bg-[#635FC7] cursor-pointer hover:bg-[#A8A4FF]"
        disabled={boards[activeIndex].columns.length === 0 ? true : false}
      >
        + Add New Task
      </DialogTrigger>
      <DialogTrigger
        disabled={boards[activeIndex].columns.length === 0 ? true : false}
        className="rounded-full p-3 bg-[#635FC7] cursor-pointer hover:bg-[#A8A4FF]"
      >
        <AddNewTaskMobileIcon />
      </DialogTrigger>
      <DialogHeader>
        <DialogTitle className="sr-only">Add New Task Form</DialogTitle>
        <DialogDescription className="sr-only">
          This is a form within a dialog component that enables you to add a new
          task.
        </DialogDescription>
      </DialogHeader>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is the title of your task
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={3} className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is the description of the task
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full mt-3 space-y-4">
              <h2 className="mb-2 text-sm font-semibold">Add SubTasks</h2>
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex w-full gap-3 items-center flex-row-reverse"
                >
                  <Button
                    className="bg-transparent hover:bg-transparent p-0 cursor-pointer shadow-none"
                    onClick={() => {
                      remove(index);
                    }}
                  >
                    <CrossIcon className="object-cover" />
                  </Button>
                  <FormField
                    name={`subTasks.${index}`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="sr-only">Status</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription className="sr-only">
                          This is where you can add subtasks to your task
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
            <Button
              type="button"
              //   disabled={fields.length === 0 ? true : false}
              onClick={() => {
                append("");
              }}
              className="bg-[#A8A4FF]/50 rounded-full px-4 w-full hover:bg-[#A8A4FF] cursor-pointer active:scale-[0.98]"
            >
              + Add New Subtask
            </Button>
            <div className="mt-3 space-y-6 sm:space-y-0 sm:flex gap-6 justify-between items-center w-full">
              <FormField
                name="status"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select task status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {taskStatuses.map((task, index) => (
                            <SelectItem key={index} value={task}>
                              {task}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                name="colName"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Column Name</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select column name" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {columnNames.map((column, index) => (
                            <SelectItem key={index} value={column}>
                              {column}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full bg-[#A8A4FF] hover:bg-[#A8A4FF] cursor-pointer active:scale-[0.98]">
              Add Task
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
