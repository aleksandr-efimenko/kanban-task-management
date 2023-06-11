import { useContext, useState } from "react";
import { ButtonPrimaryS } from "../Buttons/MainButtons";
import { LabelledTextField } from "../Inputs/LabelledTextField";
import { ModalWindowTitle } from "./ModalWindowTitle";
import { MultiInputs } from "./MultiInputs";
import { useBoards, useBoardsDispatch } from "@/context/BoardsContext";
import { ModalContext } from "@/context/ModalContext";
import { uuid } from "uuidv4";
import { SelectInput } from "../Inputs/SelectInput";

const taskFormDefaultData = {
  title: "",
  titleError: "",
  description: "",
  descriptionError: "",
  subtasks: ["", ""],
  status: "",
};

export default function EditTask({ taskId }: { taskId: string }) {
  const [taskForm, setTaskForm] = useState({
    title: taskFormDefaultData.title,
    titleError: taskFormDefaultData.titleError,
    description: taskFormDefaultData.description,
    descriptionError: taskFormDefaultData.descriptionError,
    subtasks: taskFormDefaultData.subtasks,
    status: taskFormDefaultData.status,
  });

  const boardsDispatch = useBoardsDispatch();
  const { handleModal } = useContext(ModalContext);
  const boards = useBoards();
  if (!boards) return null;
  const currentBoard = boards.find((board) => board.id === boardId);
  if (!currentBoard) return null;
  const columns = currentBoard.columns.map((column) => column.name);

  const handleCreateBoard = () => {
    //add board to boards
    if (!boardsDispatch) return;
    if (!taskForm.title) {
      setTaskForm({
        ...taskForm,
        titleError: "Cant't be empty",
      });
      return;
    }

    const taskId = uuid();
    // boardsDispatch({
    //   type: "ADD_BOARD",
    //   boardName: boardForm.title,
    //   boardId: boardId,
    //   columns: boardForm.columns.filter((column) => column !== ""),
    // });

    //close modal
    handleModal();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskForm({ ...taskForm, title: e.target.value, titleError: "" });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskForm({
      ...taskForm,
      description: e.target.value,
      descriptionError: "",
    });
  };
  return (
    <>
      <ModalWindowTitle title="Add New Task" />
      <LabelledTextField
        label={taskDefaultData.inputs.textInput.label}
        type="text"
        placeholder={taskDefaultData.inputs.textInput.placeholder}
        value={taskForm.title}
        onChange={handleTitleChange}
        errorMessage={taskForm.titleError}
        inputType="textInput"
      />
      <LabelledTextField
        label={taskDefaultData.inputs.textAreaInput.label}
        type="textarea"
        placeholder={taskDefaultData.inputs.textAreaInput.placeholder}
        value={taskForm.description}
        onChange={handleDescriptionChange}
        errorMessage={taskForm.descriptionError}
        inputType="textareaInput"
        rows={4}
      />

      <MultiInputs
        label={taskDefaultData.multiInputs.label}
        buttonText={taskDefaultData.multiInputs.buttonText}
        initialInputs={taskFormDefaultData.subtasks}
        inputs={taskForm.subtasks}
        setInputs={(subtasks) => setTaskForm({ ...taskForm, subtasks })}
      />
      <SelectInput
        currentOption={taskForm.status}
        value={taskForm.status}
        onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value })}
        label={taskDefaultData.selectInput.label}
        options={columns.map((column) => column)}
      />

      <ButtonPrimaryS onClick={handleCreateBoard}>
        {taskDefaultData.button.text}
      </ButtonPrimaryS>
    </>
  );
}
