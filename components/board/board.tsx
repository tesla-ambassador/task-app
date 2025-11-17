"use client";
import { Column, Task } from "@/types/boardtypes";
import { completeSubtasksCounter } from "@/hooks/board-functions";
import { useSidebarStore } from "@/providers/sidebar-provider";
import { Button } from "../ui/button";

import { EditBoard } from "./edit-board";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";

export function Board() {
  const { boards, activeIndex } = useSidebarStore((state) => state);
  if (boards[activeIndex].columns.length === 0) {
    return <EmptyBoard />;
  } else
    return (
      <div className="flex gap-4">
        <div className="flex gap-4 space-y-8">
          {boards[activeIndex].columns.map((column, index) => (
            <div key={index}>
              <BoardColumn column={column} />
            </div>
          ))}
        </div>
        <EmptyColumn />
      </div>
    );
}
interface ColumnProps {
  column: Column;
}
export function BoardColumn({ column }: ColumnProps) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-4">
        <ColumnStatusBar task={column.tasks[0]} />
        <span>
          {column.name}({column.tasks.length})
        </span>
      </div>
      <div className="mt-6 space-y-4 w-full">
        {column.tasks.length !== 0 ? (
          column.tasks.map((task, index) => (
            <div
              key={index}
              className="bg-white w-[280px] py-6 px-4 rounded-md shadow-md"
            >
              <h2 className="font-bold text-[0.938rem]">{task.title}</h2>
              <span className="text-[#828FA3] font-bold text-[0.75rem]">
                {completeSubtasksCounter(task.subtasks)} of{" "}
                {task.subtasks.length} subtasks
              </span>
            </div>
          ))
        ) : (
          <div className="bg-white w-full max-w-[280px] sm:min-w-[280px] py-6 px-4 rounded-md shadow-md text-center mx-auto">
            <h2 className="text-[0.938rem] font-bold">No tasks yet</h2>
            <Button
              variant={"link"}
              className="cursor-pointer px-7 rounded-lg text-[#635FC7]"
            >
              + Add Task
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

interface ColumnStatusBarProps {
  task: Task;
}

export function ColumnStatusBar({ task }: ColumnStatusBarProps) {
  return (
    <div>
      {task?.status === "Todo" && (
        <div className="w-[20px] h-[20px] rounded-full bg-[#49C4E5]" />
      )}
      {task?.status === "Doing" && (
        <div className="w-[20px] h-[20px] rounded-full bg-[#8471F2]" />
      )}
      {task?.status === "Done" && (
        <div className="w-[20px] h-[20px] rounded-full bg-[#67E2AE]" />
      )}
      {task?.status === undefined && (
        <div className="w-[20px] h-[20px] rounded-full bg-gray-500" />
      )}
      {task?.status === "" && (
        <div className="w-[20px] h-[20px] rounded-full bg-gray-500" />
      )}
    </div>
  );
}

export function EmptyColumn() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full min-h-screen h-full max-w-[280px] rounded-md text-[#828FA3] bg-[#E4EBFA] hover:bg-[#E4EBFA] cursor-pointer">
          + New Column
        </Button>
      </DialogTrigger>
      <DialogHeader className="sr-only">
        <DialogTitle>Create New Column</DialogTitle>
        <DialogDescription>
          This dialog is triggered by the button for creating a new column. It
          contains the form for editing an existing board.
        </DialogDescription>
      </DialogHeader>
      <DialogContent>
        <EditBoard />
      </DialogContent>
    </Dialog>
  );
}

export function EmptyBoard() {
  return (
    <div className="text-center w-full max-w-[500px] flex flex-col items-center justify-center gap-8 bg-[#F4F7FD]">
      <div>
        <h2 className="text-[1.125rem] text-[#828FA3]">
          This board is empty. Create a new column to get started
        </h2>
      </div>
      <div>
        <Button className="rounded-l-full rounded-r-full py-6 bg-[#635FC7] cursor-pointer hover:bg-[#A8A4FF]">
          <span>+ Add New Column</span>
        </Button>
      </div>
    </div>
  );
}
