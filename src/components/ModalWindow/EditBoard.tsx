import { useBoards, useBoardsDispatch } from "@/context/BoardsContext";
import { ModalContext } from "@/context/ModalContext";
import { useState, useContext, useEffect } from "react";
import { uuid } from "uuidv4";
import { ButtonPrimaryS } from "../Buttons/MainButtons";
import { LabelledTextField } from "../Inputs/LabelledTextField";
import { ModalWindowTitle } from "./ModalWindowTitle";
import { MultiInputs } from "./MultiInputs";

export function EditBoard({ boardId }: { boardId: string }) {
  const [boardForm, setBoardForm] = useState({
    title: "",
    titleError: "",
    columns: ["", ""],
  });
  const boardsDispatch = useBoardsDispatch();
  const { handleModal } = useContext(ModalContext);
  const boards = useBoards();

  useEffect(() => {
    const currendBoard = boards?.find((board) => board.id === boardId);
    if (!currendBoard) return;
    setBoardForm({
      titleError: "",
      title: currendBoard?.name,
      columns: currendBoard?.columns.map((col) => col.name),
    });
  }, [boardId, boards]);

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
      type: "EDIT_BOARD",
      boardId: boardId,
      boardName: boardForm.title,
      columns: boardForm.columns.filter((column) => column !== ""),
    });

    //close modal
    handleModal();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardForm({ ...boardForm, title: e.target.value, titleError: "" });
  };
  return (
    <>
      <ModalWindowTitle title="Add New Board" />
      <LabelledTextField
        label="Board Name"
        type="text"
        placeholder="e.g. Web Design"
        value={boardForm.title}
        onChange={handleInputChange}
        errorMessage={boardForm.titleError}
        inputType="textInput"
      />

      <MultiInputs
        label="Columns"
        buttonText="+ Add Column"
        initialInputs={["Todo", "Doing"]}
        inputs={boardForm.columns}
        setInputs={(columns) => setBoardForm({ ...boardForm, columns })}
      />
      <ButtonPrimaryS onClick={handleCreateBoard}>Save Board</ButtonPrimaryS>
    </>
  );
}
