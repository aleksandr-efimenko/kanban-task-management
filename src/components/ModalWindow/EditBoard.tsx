import { useBoards, useBoardsDispatch } from "@/context/BoardsContext";
import { ModalContext } from "@/context/ModalContext";
import { useState, useContext, useEffect } from "react";
import { uuid } from "uuidv4";
import { ButtonPrimaryS } from "../Buttons/MainButtons";
import { LabelledTextField } from "../Inputs/LabelledTextField";
import { ModalWindowTitle } from "./ModalWindowTitle";
import { MultiInputs } from "./MultiInputs";
import { type Column } from "@/utils/DataTypes";
import { generateColor } from "@/utils/generateColor";

const initialBoardForm = {
  title: "",
  titleError: "",
  columns: [
    { id: uuid(), name: "", color: "", tasks: [] },
    { id: uuid(), name: "", color: "", tasks: [] },
  ] as Column[],
};

/**
 *  Edit board modal window
 *
 * @param param0  boardId
 * @returns  Edit board modal window
 *
 * @example
 * <EditBoard boardId={boardId} />
 *
 */
export function EditBoard({ boardId }: { boardId: string }) {
  const [boardForm, setBoardForm] = useState(initialBoardForm);
  const boardsDispatch = useBoardsDispatch();
  const { handleModal } = useContext(ModalContext);
  const { boards } = useBoards();
  const currentBoard = boards?.find((board) => board.id === boardId);

  //fill form with current board data
  useEffect(() => {
    if (!currentBoard) return;
    setBoardForm({
      titleError: "",
      title: currentBoard?.name,
      columns: currentBoard?.columns,
    });
  }, [boardId, boards, currentBoard]);

  // change column name in form state
  const handleColumnChange = (newName: string, id: string) => {
    const newColumns = boardForm.columns.map((input) => {
      if (input.id === id) {
        return { ...input, name: newName };
      }
      return input;
    });
    setBoardForm({
      ...boardForm,
      columns: newColumns,
    });
  };

  // add new column to form state
  const handleColumnAdd = () => {
    setBoardForm({
      ...boardForm,
      columns: [
        ...boardForm.columns,
        { id: uuid(), name: "", color: generateColor(), tasks: [] },
      ],
    });
  };

  // remove column from form state by id
  const handleColumnRemove = (id: string) => {
    const newColumns = boardForm.columns.filter((column) => column.id !== id);
    setBoardForm({
      ...boardForm,
      columns: newColumns,
    });
  };

  // dispatch action to add new board
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

    boardsDispatch({
      type: "EDIT_BOARD",
      boardId: boardId,
      newBoardName: boardForm.title,
      columns: boardForm.columns,
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
        inputs={boardForm.columns.map((column) => {
          return {
            value: column.name,
            id: column.id,
          };
        })}
        handleInputChange={handleColumnChange}
        handleAddInput={handleColumnAdd}
        handleRemoveInput={handleColumnRemove}
      />
      <ButtonPrimaryS onClick={SaveBoard}>Save Board</ButtonPrimaryS>
    </>
  );
}
