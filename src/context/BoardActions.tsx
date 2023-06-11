import { type Subtask } from "@/utils/DataTypes";

// An interface for our actions
export type BoardActions =
  | AddBoardAction
  | ChangeBoardAction
  | DeleteBoardAction
  | AddColumnAction
  | ChangeColumnAction
  | DeleteColumnAction
  | AddTaskAction
  | ChangeTaskAction
  | DeleteTaskAction
  | ChangeSubtaskAction;

type AddBoardAction = {
  type: "ADD_BOARD";
  boardId: string;
  boardName: string;
  columns: string[];
};

type ChangeBoardAction = {
  type: "CHANGE_BOARD";
  boardId: string;
  boardName: string;
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

type ChangeColumnAction = {
  type: "CHANGE_COLUMN";
  boardId: string;
  columnId: string;
  columnName: string;
};

type DeleteColumnAction = {
  type: "DELETE_COLUMN";
  boardId: string;
  columnId: string;
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
  type: "CHANGE_TASK";
  boardId: string;
  columnId: string;
  taskId: string;
  taskName: string;
  taskDescription: string;
  subtasks: Subtask[];
};

type DeleteTaskAction = {
  type: "DELETE_TASK";
  boardId: string;
  columnId: string;
  taskId: string;
};

type ChangeSubtaskAction = {
  type: "CHANGE_SUBTASK";
  subtaskId: string;
  subtaskName: string;
  isCompleted: boolean;
};

// A function that will never be called, but will throw an error if it is
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const neverReached = (never: never) => {};
