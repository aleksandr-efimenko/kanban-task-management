import type { Task, Board, Column, Subtask } from "@prisma/client";
import { BoardWithColumnsAndTasks } from "./BoardsContext";

// An interface for our actions
export type BoardActions =
  | LoadBoardsAction
  | AddBoardAction
  | EditBoardAction
  | DeleteBoardAction
  | AddColumnAction
  | AddTaskAction
  | ChangeTaskAction
  | ChangeTaskStatusAction
  | DeleteTaskAction
  | ChangeSubtaskAction;

export type LoadBoardsAction = {
  type: "LOAD_BOARDS";
  boards: BoardWithColumnsAndTasks[];
};

export type AddBoardAction = {
  type: "ADD_BOARD";
  boardId: string;
  boardName: string;
  columns: Column[];
};

export type EditBoardAction = {
  type: "EDIT_BOARD";
  boardId: string;
  newBoardName: string;
  columns: Column[];
};

export type DeleteBoardAction = {
  type: "DELETE_BOARD";
  boardId: string;
};

export type AddColumnAction = {
  type: "ADD_COLUMN";
  boardId: string;
  newColumnId: string;
  columnName: string;
  color: string;
};

export type AddTaskAction = {
  type: "ADD_TASK";
  taskId: string;
  title: string;
  columnId: string;
  boardId: string;
  description: string;
  subtasks: Subtask[];
};

export type ChangeTaskAction = {
  type: "EDIT_TASK";
  taskId: string;
  newTaskName: string;
  newTaskDescription: string;
  newStatus: string;
  newSubtasks: Subtask[];
};

export type ChangeTaskStatusAction = {
  type: "CHANGE_TASK_STATUS";
  taskId: string;
  newStatus: string;
};

export type DeleteTaskAction = {
  type: "DELETE_TASK";
  taskId: string;
};

export type ChangeSubtaskAction = {
  type: "EDIT_SUBTASK";
  id: string;
  title: string;
  isCompleted: boolean;
};

// A function that will never be called, but will throw an error if it is
// called. This is used to ensure that we have a case for every action type
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const neverReached = (never: never) => {};
