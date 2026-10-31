import { createStore } from "zustand";
import { Column, Task } from "@/types/boardtypes";
import data from "@/data.json";

import { sidebarStore } from "@/providers/sidebar-provider";

const activeIndex = sidebarStore.getState().activeIndex;
// const taskArray: Task[] = data.boards[activeIndex].columns.flatMap(
//   (column) => column.tasks
// );

export type TaskCardState = {
  columns: Column[];
};

export type TaskCardActions = {
  addTask: (newTask: Task, colName: string) => void;
  removeTask: (taskName: string, colName: string) => void;
  updateTask: (taskName: string, updatedTask: Task, colName: string) => void;
  toggleSubTask: (taskName: string, subTaskName: string) => void;
  setStatus: (taskName: string, newStatus: string) => void;
};

export type TaskCardStore = TaskCardState & TaskCardActions;

const defaultState: TaskCardState = {
  columns: data.boards[activeIndex].columns,
};

export const createTaskStore = (initState: TaskCardState = defaultState) => {
  return createStore<TaskCardStore>()((set) => ({
    ...initState,
    addTask: (newTask, colName) =>
      set((state) => {
        const colToAddTo = state.columns.find((col) => col.name === colName);
        if (!colToAddTo) {
          return state;
        }

        return {
          columns: state.columns.map((col) =>
            col === colToAddTo
              ? { ...col, tasks: [...col.tasks, newTask] }
              : col
          ),
        };
      }),
    removeTask: (taskName, colName) =>
      set((state) => {
        const colToDeleteFrom = state.columns.find(
          (col) => col.name === colName
        );
        if (!colToDeleteFrom) {
          return state;
        }

        return {
          columns: state.columns.map((col) =>
            col === colToDeleteFrom
              ? {
                  ...col,
                  tasks: col.tasks.filter((task) => task.title === taskName),
                }
              : col
          ),
        };
      }),
    updateTask: (taskName, updatedTask, colName) =>
      set((state) => {
        const colToUpdate = state.columns.find((col) => col.name === colName);
        if (!colToUpdate) {
          return state;
        }
        return {
          columns: state.columns.map((col) =>
            col === colToUpdate
              ? {
                  ...col,
                  tasks: col.tasks.map((task) =>
                    task.title === taskName ? { ...updatedTask } : task
                  ),
                }
              : col
          ),
        };
      }),
    setStatus: (taskName, newStatus) =>
      set((state) => {
        console.log({
          columns: state.columns.map((col) => ({
            ...col,
            tasks: col.tasks.map((task) =>
              task.title === taskName ? { ...task, status: newStatus } : task
            ),
          })),
        });

        return {
          columns: state.columns.map((col) => ({
            ...col,
            tasks: col.tasks.map((task) =>
              task.title === taskName ? { ...task, status: newStatus } : task
            ),
          })),
        };
      }),
    toggleSubTask: (taskName, subTaskName) =>
      set((state) => ({
        columns: state.columns.map((col) => ({
          ...col,
          tasks: col.tasks.map((task) =>
            task.title === taskName
              ? {
                  ...task,
                  subtasks: task.subtasks.map((subTask) =>
                    subTask.title === subTaskName
                      ? { ...subTask, isCompleted: !subTask.isCompleted }
                      : subTask
                  ),
                }
              : task
          ),
        })),
      })),
  }));
};
