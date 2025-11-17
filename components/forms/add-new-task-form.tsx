"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";

import {
  Form,
  FormField,
  FormDescription,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage,
} from "../ui/form";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { CrossIcon } from "../icons/form-icons";

import { deleteSubtaskField } from "@/hooks/form-hooks";
import { rect } from "motion/react-m";

const formSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  subtasks: z
    .array(
      z.object({
        value: z.string().min(1, "Field cannot be empty"),
      }),
    )
    .min(1, "At least one item is required."),
  status: z.string().nonempty(),
});

export function AddTaskForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      subtasks: [{ value: "" }],
      status: "",
    },
  });

  // Setting up Field arrays for dynamic inputs.

  const { remove, append, fields } = useFieldArray({
    control: form.control,
    name: "subtasks",
  });

  const [subTaskArrayCounter, setSubTaskArrayCounter] =
    React.useState<number>(1);
  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
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
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {fields.map((field, index) => (
          <FormField
            key={field.id}
            control={form.control}
            name={`subtasks.${index}.value`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex gap-4 items-center">
                    <Input {...field} placeholder={`Item ${index + 1}`} />
                    <Button
                      type="button"
                      disabled={fields.length === 1}
                      onClick={() => fields.length > 1 && remove(index)}
                    >
                      <CrossIcon />
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="button" onClick={() => append({ value: "" })}>
          <span>+ Add New Subtask</span>
        </Button>
      </form>
    </Form>
  );
}
