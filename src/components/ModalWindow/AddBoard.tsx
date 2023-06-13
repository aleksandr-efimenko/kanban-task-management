import { useContext, useState } from "react";
import { ButtonPrimaryS } from "../Buttons/MainButtons";
import { LabelledTextField } from "@/components/Inputs/LabelledTextField";
import { ModalWindowTitle } from "./ModalWindowTitle";
import { useBoardsDispatch } from "@/context/BoardsContext";
import { ModalContext } from "@/context/ModalContext";
import { MultiInputs } from "./MultiInputs";
import { useRouter } from "next/router";
import { uuid } from "uuidv4";

const initialBoardForm = {
  title: "",
  titleError: "",
  columns: [
    { title: "Todo", id: uuid() },
    { title: "Doing", id: uuid() },
  ],
};
export function AddBoard() {
  const [boardForm, setBoardForm] = useState(initialBoardForm);
  const boardsDispatch = useBoardsDispatch();
  const { handleModal } = useContext(ModalContext);
  const router = useRouter();

  const SaveBoard = () => {
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
      columns: boardForm.columns.map((column) => column.title),
    });

    //close modal
    handleModal();
    //go to new board
    void router.push(`/boards/${boardId}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardForm({ ...boardForm, title: e.target.value, titleError: "" });
  };

  const handleColumnAdd = () => {
    setBoardForm({
      ...boardForm,
      columns: [...boardForm.columns, { title: "", id: uuid() }],
    });
  };

  const handleColumnRemove = (id: string) => {
    const newColumns = boardForm.columns.filter((column) => column.id !== id);
    setBoardForm({
      ...boardForm,
      columns: newColumns,
    });
  };

  const handleColumnChange = (newValue: string, id: string) => {
    const newColumns = boardForm.columns.map((column) => {
      if (column.id === id) {
        return { ...column, title: newValue };
      }
      return column;
    });
    setBoardForm({
      ...boardForm,
      columns: newColumns,
    });
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
        inputs={boardForm.columns.map((column) => {
          return {
            value: column.title,
            id: column.id,
          };
        })}
        handleInputChange={handleColumnChange}
        handleRemoveInput={handleColumnRemove}
        handleAddInput={handleColumnAdd}
      />
      <ButtonPrimaryS onClick={SaveBoard}>Create New Board</ButtonPrimaryS>
    </>
  );
}
