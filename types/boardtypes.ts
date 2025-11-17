export type Task = {
  title: string;
  description?: string;
  status?: string;
  subtasks: {
    title: string;
    isCompleted: boolean;
  }[];
};

export type Column = {
  name: string;
  tasks: Task[];
};

export type Board = {
  name: string;
  columns: Column[];
};

export type Subtasks = {
  title: string;
  isCompleted: boolean;
};
