import { useBoards, useBoardsDispatch } from "@/context/BoardsContext";
import { ModalContext } from "@/context/ModalContext";
import { useState, useContext, useEffect } from "react";
import { uuid } from "uuidv4";
import { ButtonPrimaryS } from "../Buttons/MainButtons";
import { LabelledTextField } from "../Inputs/LabelledTextField";
import { ModalWindowTitle } from "./ModalWindowTitle";
import { type InputObject, MultiInputs } from "./MultiInputs";
import { type Column } from "@/utils/DataTypes";

export function EditBoard({ boardId }: { boardId: string }) {
  const [boardForm, setBoardForm] = useState({
    title: "",
    titleError: "",
    columns: [
      { id: uuid(), name: "", color: "", tasks: [] },
      { id: uuid(), name: "", color: "", tasks: [] },
    ] as Column[],
  });
  const boardsDispatch = useBoardsDispatch();
  const { handleModal } = useContext(ModalContext);
  const boards = useBoards();
  const currentBoard = boards?.find((board) => board.id === boardId);

  useEffect(() => {
    if (!currentBoard) return;
    setBoardForm({
      titleError: "",
      title: currentBoard?.name,
      columns: currentBoard?.columns,
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
      columns: boardForm.columnNames.filter((column) => column !== ""),
    });

    //close modal
    handleModal();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardForm({ ...boardForm, title: e.target.value, titleError: "" });
  };
  const handleColumnChange = (newColumnsFromInputs: InputObject[]) => {
    console.log(newColumnsFromInputs);
    console.log(boardForm.columns);
    //change the column object with the same name from input
    const newColumns = boardForm.columns.map((column) => {
      const newColumn = newColumnsFromInputs.find(
        (newColumn) => newColumn.id === column.id
      );
      if (!newColumn) return column;
      return {
        ...column,
        name: newColumn.value,
      };
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
            value: column.name,
            id: column.id,
          };
        })}
        setInputs={handleColumnChange}
      />
      <ButtonPrimaryS onClick={handleCreateBoard}>Save Board</ButtonPrimaryS>
    </>
  );
}
