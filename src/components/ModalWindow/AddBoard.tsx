import { useContext, useState } from "react";
import { ButtonPrimaryS } from "../Buttons";
import { LabelledTextField } from "@/components/Inputs/LabelledTextField";
import { ModalWindowTitle } from "./ModalWindowTitle";
import { useBoardsDispatch } from "@/context/BoardsContext";
import { ModalContext } from "@/context/ModalContext";
import { MultiInputs } from "./MultiInputs";
import { useRouter } from "next/router";
import { uuid } from "uuidv4";

export function AddBoard() {
  const [boardForm, setBoardForm] = useState({
    title: "",
    titleError: "",
    columns: ["Todo", "Doing"],
  });
  const boardsDispatch = useBoardsDispatch();
  const { handleModal } = useContext(ModalContext);
  const router = useRouter();

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

    const boardId = uuid();
    boardsDispatch({
      type: "ADD_BOARD",
      boardName: boardForm.title,
      boardId: boardId,
      columns: boardForm.columns.filter((column) => column !== ""),
    });

    //close modal
    handleModal();
    void router.push(`/boards/${boardId}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardForm({ ...boardForm, title: e.target.value, titleError: "" });
  };

  return (
    <>
      <ModalWindowTitle title="Add New Board" />
      <LabelledTextField
        label="Board Name"
        id="board-name"
        type="text"
        placeholder="e.g. Web Design"
        value={boardForm.title}
        onChange={handleInputChange}
        errorMessage={boardForm.titleError}
      />

      <MultiInputs
        label="Columns"
        buttonText="+ Add Column"
        initialInputs={["Todo", "Doing"]}
        inputs={boardForm.columns}
        setInputs={(columns) => setBoardForm({ ...boardForm, columns })}
      />
      <ButtonPrimaryS onClick={handleCreateBoard}>
        Create New Board
      </ButtonPrimaryS>
    </>
  );
}
