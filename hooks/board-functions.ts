import { Subtasks } from "@/types/boardtypes";

export function completeSubtasksCounter(subtasks: Subtasks[]): number {
  const counter: number = 0;
  subtasks.forEach((subtask) => subtask.isCompleted && counter + 1);
  return counter;
}
