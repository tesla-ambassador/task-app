"use client";
import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import { type TaskCardStore, createTaskStore } from "@/store/task-store";

export type TaskStoreApi = ReturnType<typeof createTaskStore>;

export const TaskStoreContext = createContext<TaskStoreApi | undefined>(
  undefined
);

interface TaskStoreProviderProps {
  children: ReactNode;
}

export const TaskStoreProvider = ({ children }: TaskStoreProviderProps) => {
  const storeRef = useRef<TaskStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createTaskStore();
  }
  return (
    <TaskStoreContext.Provider value={storeRef.current}>
      {children}
    </TaskStoreContext.Provider>
  );
};

export const useTaskStore = <T,>(
  selector: (store: TaskCardStore) => T
): T => {
    const taskStoreContext = useContext(TaskStoreContext);

    if(!taskStoreContext) {
        throw new Error(`useTaskStore must be used within the TaskStoreProvider`)
    }

    return useStore(taskStoreContext, selector)
};
