import { useContext, useState } from "react";
import { ButtonPrimaryS } from "../Buttons/MainButtons";
import { LabelledTextField } from "../Inputs/LabelledTextField";
import { ModalWindowTitle } from "./ModalWindowTitle";
import { MultiInputs } from "./MultiInputs";
import { useBoards, useBoardsDispatch } from "@/context/BoardsContext";
import { ModalContext } from "@/context/ModalContext";
import { uuid } from "uuidv4";
import { SelectInput } from "../Inputs/SelectInput";

const taskDefaultData = {
  title: "Add New Task",

  inputs: {
    textInput: {
      label: "Title",
      id: "task-name",
      placeholder: "e.g. Take coffee break",
    },
    textAreaInput: {
      label: "Description",
      id: "task-description",
      type: "textarea",
      placeholder:
        "e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.",
    },
  },
  multiInputs: {
    label: "Subtasks",
    buttonText: "+ Add New Subtask",
  },
  selectInput: {
    label: "Current Status",
    id: "task-status",
  },
  button: {
    text: "Create Task",
  },
};

const taskFormDefaultData = {
  title: "",
  titleError: "",
  description: "",
  descriptionError: "",
  subtasks: ["", ""],
  status: "",
};

export default function AddTask({ boardId }: { boardId: string }) {
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
        id={taskDefaultData.inputs.textAreaInput.id}
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
