import { useContext, useState } from "react";
import { ButtonPrimaryS } from "../Buttons";
import { TextField } from "../Inputs/LabelledTextField";
import { ModalWindowTitle } from "./ModalWindowTitle";
import { ActionKind, useBoardsDispatch } from "@/context/BoardsContext";
import { ModalContext } from "@/context/ModalContext";

export function AddBoard() {
  const [board, setBoard] = useState({
    title: "",
    columns: [],
  });

  const boardsDispatch = useBoardsDispatch();
  const { handleModal } = useContext(ModalContext);

  const handleCreateBoard = () => {
    //add board to boards
    console.log(boardsDispatch);
    if (!boardsDispatch) return;
    if (!board.title) return;
    boardsDispatch({
      type: ActionKind.ADD_BOARD,
      boardName: board.title,
    });

    //close modal
    handleModal(null);
  };

  return (
    <>
      <ModalWindowTitle title="Add New Board" />
      <TextField
        label="Name"
        id="board-name"
        type="text"
        placeholder="e.g. Web Design"
        value={board.title}
        setValue={(value) => setBoard({ ...board, title: value })}
      />
      <ButtonPrimaryS onClick={handleCreateBoard}>
        Create New Board
      </ButtonPrimaryS>
    </>
  );
}
