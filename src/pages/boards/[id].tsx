import { useRouter } from "next/router";
import { TaskColumn } from "@/components/TaskColumn";
import { type Column } from "@/utils/DataTypes";
import { NewColumnButton } from "@/components/NewColumnButton";
import { useContext } from "react";

import { BoardViewContainer } from "@/components/BoardView";
import Head from "next/head";
import { useBoards } from "@/context/BoardsContext";

export default function BoardView() {
  const router = useRouter();
  const boards = useBoards();
  const currentBoard = boards.find((board) => board.id === router.query.id);
  console.log(currentBoard);
  console.log(router.query.id);
  if (!currentBoard) {
    return (
      <BoardViewContainer>
        <h1 className="text-heading-xl text-medium-gray">Board not found</h1>
      </BoardViewContainer>
    );
  }

  const columns = currentBoard.columns;
  if (!router.query.id) {
    return (
      <BoardViewContainer>
        <h1 className="text-heading-xl text-medium-gray">No board selected</h1>
      </BoardViewContainer>
    );
  }

  return (
    <>
      <Head>
        <title>Kanban task management web app | {currentBoard.name}</title>
        <meta name="description" content="Kanban task management web app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BoardViewContainer>
        {columns &&
          columns.map((column) => (
            <TaskColumn key={column.name} column={column} />
          ))}
        <NewColumnButton />
      </BoardViewContainer>
    </>
  );
}
