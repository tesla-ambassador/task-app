import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";

interface DeleteDialogInterface {
  title: string;
  type: "board" | "task";
  handleDelete: (id: string) => void;
}

export function DeleteDialog({
  title,
  type,
  handleDelete,
}: DeleteDialogInterface) {
  return (
    <div className="bg-white rounded-md p-2">
      <div className="space-y-6">
        <h2 className="font-semibold text-3xl text-[#EA5555]">
          Delete this {type}?
        </h2>
        {type === "board" ? (
          <p className="text-[#828FA3] leading-6.5">
            Are you sure you want to delete the &apos;{title}&apos; board? This
            action will remove all columns and tasks and cannot be reversed.
          </p>
        ) : (
          <p className="text-[#828FA3] leading-6.5">
            Are you sure you want to delete the &apos;{title}&apos; task and its
            subtasks? This action cannot be reversed
          </p>
        )}
      </div>
      <div className="mt-6 grid sm:grid-cols-2 gap-3">
        <Button
          className="bg-[#EA5555] hover:bg-[#FF9898] w-full rounded-full cursor-pointer py-6"
          onClick={() => {
            handleDelete(title);
          }}
        >
          Delete
        </Button>
        <DialogClose asChild>
          <Button className="w-full rounded-full cursor-pointer py-6 bg-[#E4EBFA] hover:bg-[#635FC7]/20 text-[#635FC7]">
            Cancel
          </Button>
        </DialogClose>
      </div>
    </div>
  );
}
