import { Subtasks } from "@/types/boardtypes";

export function completeSubtasksCounter(subtasks: Subtasks[]): number {
  let counter = 0;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted === true) {
      counter += 1;
    }
  });
  return counter;
}
