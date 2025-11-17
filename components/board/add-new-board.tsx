import React from "react";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "../ui/dialog";

import { Input } from "../ui/input";
import { CrossIcon } from "../icons/form-icons";
import { BoardIcon } from "../icons/sidebar-icons";
import { Button } from "../ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormMessage,
  FormItem,
  FormField,
  FormLabel,
} from "../ui/form";

const createNewBoardSchema = z.object({
  boardName: z.string().nonempty("The board name is required."),
  columns: z.array(z.string()),
});

export function AddNewBoard() {
  const form = useForm<z.infer<typeof createNewBoardSchema>>({
    resolver: zodResolver(createNewBoardSchema),
    defaultValues: {
      boardName: "",
      columns: [],
    },
  });
  const { fields, remove, append } = useFieldArray({
    control: form.control,
    // @ts-ignore
    name: "columns",
  });

  const onSubmit = (values: z.infer<typeof createNewBoardSchema>) => {
    console.log(values);
  };

  React.useEffect(() => {
    // This is to make sure that at least one field of subTasks is shown after the page renders.
    append("");
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="hover:bg-[#A8A4FF]/50 overflow-hidden rounded-r-full px-4">
          <Button className="bg-transparent w-full py-6 gap-4 cursor-pointer hover:bg-transparent justify-start">
            <BoardIcon className="fill-[#635FC7]" />{" "}
            <span className="text-[#635FC7]">+ Create New Board</span>
          </Button>
        </div>
      </DialogTrigger>
      <DialogHeader>
        <DialogTitle className="sr-only">Add New Board</DialogTitle>
        <DialogDescription className="sr-only">
          This dialog contains the form for creating a new board
        </DialogDescription>
      </DialogHeader>
      <DialogContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <h2 className="font-semibold text-xl">Add New Board</h2>
            <FormField
              name="boardName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Web Design" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This field is where you input the name of the new board you
                    are creating.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-3 space-y-4 w-full">
              <h2 className="mb-2 text-sm font-semibold">Add Columns</h2>
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
                    name={`columns.${index}`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="sr-only">Add Columns</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription className="sr-only">
                          This is where you can add columns to your board.
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
              + Add New Column
            </Button>
            <Button className="mt-3 w-full bg-[#635FC7] hover:bg-[#635FC7]/80 cursor-pointer active:scale-[0.98]">
              Add Task
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
