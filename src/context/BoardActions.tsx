import { type Subtask } from "@/utils/DataTypes";

// An interface for our actions
export type BoardActions =
  | AddBoardAction
  | ChangeBoardAction
  | DeleteBoardAction
  | AddColumnAction
  | AddTaskAction
  | ChangeTaskAction
  | ChangeTaskStatusAction
  | DeleteTaskAction
  | ChangeSubtaskAction;

type AddBoardAction = {
  type: "ADD_BOARD";
  boardId: string;
  boardName: string;
  columns: string[];
};

type ChangeBoardAction = {
  type: "EDIT_BOARD";
  boardId: string;
  boardName: string;
  columns: string[];
};

type DeleteBoardAction = {
  type: "DELETE_BOARD";
  boardId: string;
};

type AddColumnAction = {
  type: "ADD_COLUMN";
  boardId: string;
  columnName: string;
};

type AddTaskAction = {
  type: "ADD_TASK";
  taskId: string;
  taskName: string;
  columnId: string;
  boardId: string;
  taskDescription: string;
  subtasks: Subtask[];
};

type ChangeTaskAction = {
  type: "EDIT_TASK";
  boardId: string;
  columnId: string;
  taskId: string;
  taskName: string;
  taskDescription: string;
  subtasks: Subtask[];
};

type ChangeTaskStatusAction = {
  type: "CHANGE_TASK_STATUS";
  taskId: string;
  newStatus: string;
};

type DeleteTaskAction = {
  type: "DELETE_TASK";
  boardId: string;
  columnId: string;
  taskId: string;
};

type ChangeSubtaskAction = {
  type: "EDIT_SUBTASK";
  subtaskId: string;
  subtaskName: string;
  isCompleted: boolean;
};

// A function that will never be called, but will throw an error if it is
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const neverReached = (never: never) => {};
