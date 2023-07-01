import { useBoardsDispatch } from "@/context/BoardsContext";
import { ModalContext } from "@/context/ModalContext";
import { useContext, useState } from "react";
import { ButtonPrimaryS } from "../Buttons/MainButtons";
import { LabelledTextField } from "../Inputs/LabelledTextField";
import { ModalWindowTitle } from "./ModalWindowTitle";
import { api } from "@/utils/api";
import { LoadingSpinner } from "../LoadingSpinner";
import { useSession } from "next-auth/react";
import { uuid } from "uuidv4";
import { generateColor } from "@/utils/generateColor";

export function AddColumnForm({ boardId }: { boardId: string }) {
  const dispatch = useBoardsDispatch();
  const { handleModal } = useContext(ModalContext);
  const [columnName, setColumnName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { data: session } = useSession();
  const createColumnMutation = api.columns.createColumn.useMutation();

  const handleColumnNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setErrorMessage("");
    setColumnName(e.currentTarget.value);
  };

  const addColumn = async (boardId: string, columnName: string) => {
    let newColumnId: string;
    let color: string;

    if (session) {
      const newColumn = await createColumnMutation.mutateAsync({
        boardId: boardId,
        name: columnName,
      });
      newColumnId = newColumn.id;
      color = newColumn.color || "blue";
    } else {
      newColumnId = uuid();
      color = generateColor();
    }
    if (!dispatch) return;
    dispatch({
      type: "ADD_COLUMN",
      boardId,
      columnName,
      newColumnId,
      color,
    });
  };

  const handleAddColumn = async () => {
    if (columnName === "") {
      setErrorMessage("Can't be empty");
      return;
    }
    if (!dispatch) return;

    await addColumn(boardId, columnName);

    setColumnName("");
    handleModal();
  };

  return (
    <>
      <ModalWindowTitle title="Add New Column" />
      <form
        className="flex flex-col gap-6"
        onSubmit={(e: React.FormEvent<HTMLFormElement>): void => {
          e.preventDefault();
          void handleAddColumn();
        }}
      >
        <LabelledTextField
          label="Board Name"
          type="text"
          placeholder="e.g. Web Design"
          value={columnName}
          onChange={handleColumnNameChange}
          errorMessage={errorMessage}
          inputType="textInput"
        />

        <ButtonPrimaryS>Create New Column</ButtonPrimaryS>
      </form>
      {createColumnMutation.isLoading && <LoadingSpinner />}
    </>
  );
}
