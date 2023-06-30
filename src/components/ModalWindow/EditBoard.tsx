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
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { LoadingSpinner } from "../LoadingSpinner";

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

  const updateBoardMutation = api.boards.updateBoard.useMutation();
  const createColumnMutation = api.columns.createColumn.useMutation();
  const updateColumnMutation = api.columns.updateColumn.useMutation();
  const deleteColumnMutation = api.columns.deleteColumn.useMutation();
  const { data: session } = useSession();
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
  const SaveBoard = async () => {
    //add board to boards
    if (!boardsDispatch) return;
    if (!boardForm.title) {
      setBoardForm({
        ...boardForm,
        titleError: "Cant't be empty",
      });
      return;
    }
    if (session) {
      const columnsToDelete = currentBoard?.columns.filter((column) => {
        return !boardForm.columns.some((newColumn) => {
          return column.id === newColumn.id;
        });
      });
      if (columnsToDelete && columnsToDelete.length > 0) {
        await Promise.all(
          columnsToDelete.map(async (column) => {
            await deleteColumnMutation.mutateAsync({
              id: column.id,
            });
          })
        );
      }

      const columnsToUpdate = boardForm.columns.filter((column) => {
        return currentBoard?.columns.some((newColumn) => {
          return column.id === newColumn.id;
        });
      });
      if (columnsToUpdate && columnsToUpdate.length > 0) {
        await Promise.all(
          columnsToUpdate.map(async (column) => {
            await updateColumnMutation.mutateAsync({
              id: column.id,
              name: column.name,
            });
          })
        );
      }

      const columnsToAdd = boardForm.columns.filter((column) => {
        return !currentBoard?.columns.some((newColumn) => {
          return column.id === newColumn.id;
        });
      });
      if (columnsToAdd && columnsToAdd.length > 0) {
        await Promise.all(
          columnsToAdd.map(async (column) => {
            await createColumnMutation.mutateAsync({
              name: column.name,
              boardId: boardId,
            });
          })
        );
      }

      const newBoard = await updateBoardMutation.mutateAsync({
        id: boardId,
        name: boardForm.title,
      });

      boardsDispatch({
        type: "EDIT_BOARD",
        boardId: boardId,
        newBoardName: boardForm.title,
        columns: newBoard?.columns,
      });
    } else {
      boardsDispatch({
        type: "EDIT_BOARD",
        boardId: boardId,
        newBoardName: boardForm.title,
        columns: boardForm.columns,
      });
    }
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
      <ButtonPrimaryS
        onClick={() => {
          void SaveBoard();
        }}
      >
        Save Board
      </ButtonPrimaryS>
      {(updateBoardMutation.isLoading ||
        createColumnMutation.isLoading ||
        updateColumnMutation.isLoading ||
        deleteColumnMutation.isLoading) && <LoadingSpinner />}
    </>
  );
}
