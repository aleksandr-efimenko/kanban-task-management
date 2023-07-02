import { useRouter } from "next/router";
import { TaskColumn, TaskColumnSkeleton } from "@/components/TaskColumn";
import { NewColumnButton } from "@/components/Buttons/NewColumnButton";
import { BoardViewContainer } from "@/components/BoardViews/BoardView";
import Head from "next/head";
import { useBoards } from "@/context/BoardsContext";
import { EmptyBoard } from "@/components/BoardViews/EmptyBoard";
import { uuid } from "uuidv4";
import BoardsLayout from "@/components/Layouts/BoardsLayout";
import React from "react";

// if boards are loading
const skeletonBoardView = (
  <BoardViewContainer columns={true}>
    <TaskColumnSkeleton />
  </BoardViewContainer>
);
// if board is not found in the context
const boardNotFound = (
  <BoardViewContainer columns={false}>
    <h1 className="text-heading-xl text-medium-gray">Board not found</h1>
  </BoardViewContainer>
);

export default function BoardView() {
  const router = useRouter();
  const { boards, loading } = useBoards();

  const currentBoard = boards?.find((board) => board.id === router.query.id);
  const columns = currentBoard?.columns;

  const emptyBoard = (
    <BoardViewContainer columns={false}>
      <EmptyBoard boardId={currentBoard?.id || ""} />
    </BoardViewContainer>
  );

  const boardWithColumns = (
    <BoardViewContainer columns={true}>
      {columns?.map((column) => (
        <TaskColumn key={column.id} column={column} />
      ))}
      <NewColumnButton boardId={currentBoard?.id || ""} />
    </BoardViewContainer>
  );

  const boardView = () => {
    if (loading) {
      return skeletonBoardView;
    }
    // if user opens a board that doesn't exist
    if (!currentBoard || !router.query.id) {
      return boardNotFound;
    }
    // if user opens a board that has no columns
    if (columns?.length === 0) {
      return emptyBoard;
    }
    return boardWithColumns;
  };

  const boardName = currentBoard?.name || "";
  return (
    <BoardsLayout>
      <Head>
        <title>Kanban task management web app | {boardName}</title>
        <meta name="description" content="Kanban task management web app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {boardView()}
    </BoardsLayout>
  );
}
