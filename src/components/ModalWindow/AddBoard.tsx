import { useContext, useState } from "react";
import { ButtonPrimaryS } from "../Buttons";
import { TextField } from "../Inputs/LabelledTextField";
import { ModalWindowTitle } from "./ModalWindowTitle";
import { useBoardsDispatch } from "@/context/BoardsContext";
import { ModalContext } from "@/context/ModalContext";

export function AddBoard() {
  const [boardForm, setBoardForm] = useState({
    title: "",
    titleError: "",
    columns: [],
  });

  const boardsDispatch = useBoardsDispatch();
  const { handleModal } = useContext(ModalContext);

  const handleCreateBoard = () => {
    //add board to boards
    if (!boardsDispatch) return;
    if (!boardForm.title) {
      setBoardForm({
        ...boardForm,
        titleError: "Cant't be empty",
      });
      return;
    }
    boardsDispatch({
      type: "ADD_BOARD",
      boardName: boardForm.title,
    });

    //close modal
    handleModal(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardForm({ ...boardForm, title: e.target.value, titleError: "" });
  };

  return (
    <>
      <ModalWindowTitle title="Add New Board" />
      <TextField
        label="Board Name"
        id="board-name"
        type="text"
        placeholder="e.g. Web Design"
        value={boardForm.title}
        onChange={handleInputChange}
        errorMessage={boardForm.titleError}
      />
      <ButtonPrimaryS onClick={handleCreateBoard}>
        Create New Board
      </ButtonPrimaryS>
    </>
  );
}
