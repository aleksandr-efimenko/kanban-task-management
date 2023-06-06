import { useRouter } from "next/router";
import { TaskColumn } from "@/components/TaskColumn";
import { NewColumnButton } from "@/components/Buttons/NewColumnButton";
import { BoardViewContainer } from "@/components/BoardViews/BoardView";
import Head from "next/head";
import { useBoards } from "@/context/BoardsContext";
import { EmptyBoard } from "@/components/BoardViews/EmptyBoard";
import { uuid } from "uuidv4";

export default function BoardView() {
  const router = useRouter();
  const boards = useBoards();

  const currentBoard = boards?.find((board) => board.id === router.query.id);
  const columns = currentBoard?.columns;

  const boardView = () => {
    // if user opens a board that doesn't exist
    if (!currentBoard || !router.query.id) {
      return (
        <BoardViewContainer columns={false}>
          <h1 className="text-heading-xl text-medium-gray">Board not found</h1>
        </BoardViewContainer>
      );
    }
    // if user opens a board that has no columns
    if (columns?.length === 0) {
      return (
        <BoardViewContainer columns={false}>
          <EmptyBoard boardId={currentBoard.id} />
        </BoardViewContainer>
      );
    }
    return (
      <BoardViewContainer columns={true}>
        {columns?.map((column) => (
          <TaskColumn key={column.id ? column.id : uuid()} column={column} />
        ))}
        <NewColumnButton boardId={currentBoard.id} />
      </BoardViewContainer>
    );
  };

  return (
    <>
      <Head>
        <title>
          Kanban task management web app | {currentBoard?.name || ""}
        </title>
        <meta name="description" content="Kanban task management web app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {boardView()}
    </>
  );
}
