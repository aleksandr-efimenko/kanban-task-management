import { useBoardsDispatch } from "@/context/BoardsContext";
import { ModalContext } from "@/context/ModalContext";
import { useContext, useState } from "react";
import { ButtonPrimaryS } from "../Buttons";
import { LabelledTextField } from "../Inputs/LabelledTextField";
import { ModalWindowTitle } from "./ModalWindowTitle";

export function AddColumn({ boardId }: { boardId: string }) {
  const dispatch = useBoardsDispatch();
  const { handleModal } = useContext(ModalContext);
  const [columnName, setColumnName] = useState("");
  const [errorMesage, setErrorMessage] = useState("");

  const handleAddColumn = () => {
    if (columnName === "") {
      setErrorMessage("Cannot be empty");
      return;
    }

    if (!dispatch) return;
    dispatch({
      type: "ADD_COLUMN",
      boardId: boardId,
      columnName: columnName,
    });
    setColumnName("");
    handleModal();
  };

  return (
    <>
      <>
        <ModalWindowTitle title="Add New Column" />
        <LabelledTextField
          label="Board Name"
          id="board-name"
          type="text"
          placeholder="e.g. Web Design"
          value={columnName}
          onChange={(e) => setColumnName(e.target.value)}
          errorMessage={errorMesage}
        />

        <ButtonPrimaryS onClick={handleAddColumn}>
          Create New Column
        </ButtonPrimaryS>
      </>
    </>
  );
}
