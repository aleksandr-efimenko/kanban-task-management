// Generated by https://quicktype.io

export interface Board {
  id: string;
  name: string;
  columns: Column[];
}

export interface Column {
  name: string;
  color: string;
  tasks: Task[];
}

export interface Task {
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

export interface Subtask {
  title: string;
  isCompleted: boolean;
}
