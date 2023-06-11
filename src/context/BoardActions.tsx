import { Subtask } from "@/utils/DataTypes";

// An enum with all the types of actions to use in our reducer
export enum ActionKind {
  ADD_COLUMN,
  CHANGE_COLUMN,
  DELETE_COLUMN,
  ADD_TASK,
  CHANGE_TASK,
  DELETE_TASK,
  ADD_SUBTASK,
  CHANGE_SUBTASK,
  DELETE_SUBTASK,
}

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
  | AddSubtaskAction
  | ChangeSubtaskAction
  | DeleteSubtaskAction;

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
  subtasks?: Subtask[];
};

type ChangeTaskAction = {
  type: "CHANGE_TASK";
  boardId: string;
  columnId: string;
  taskId: string;
  taskName: string;
};

type DeleteTaskAction = {
  type: "DELETE_TASK";
  boardId: string;
  columnId: string;
  taskId: string;
};

type AddSubtaskAction = {
  type: "ADD_SUBTASK";
  boardId: string;
  columnId: string;
  taskId: string;
  subtaskName: string;
};

type ChangeSubtaskAction = {
  type: "CHANGE_SUBTASK";
  subtaskId: string;
  subtaskName: string;
  isCompleted: boolean;
};

type DeleteSubtaskAction = {
  type: "DELETE_SUBTASK";
  boardId: string;
  columnId: string;
  taskId: string;
  subtaskId: string;
};

// A function that will never be called, but will throw an error if it is
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const neverReached = (never: never) => {};
