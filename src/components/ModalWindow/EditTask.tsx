import { useContext, useEffect, useState } from "react";
import { ButtonPrimaryS } from "../Buttons/MainButtons";
import { LabelledTextField } from "../Inputs/LabelledTextField";
import { ModalWindowTitle } from "./ModalWindowTitle";
import { MultiInputs } from "./MultiInputs";
import { useBoards, useBoardsDispatch } from "@/context/BoardsContext";
import { ModalContext } from "@/context/ModalContext";
import { uuid } from "uuidv4";
import { SelectInput } from "../Inputs/SelectInput";
import { taskFormDefaultData } from "./AddTask";
import {
  getBoardDataFromTaskId,
  getTaskInfoFromId,
} from "@/utils/getBoardData";

const editTaskFormFields = {
  title: "Edit Task",
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
    placeholders: ["e.g. Make coffee", "e.g. Drink coffee & smile"],
  },
  selectInput: {
    label: "Status",
    id: "task-status",
  },
  button: {
    text: "Save Changes",
  },
};

export default function EditTask({ taskId }: { taskId: string }) {
  const [taskForm, setTaskForm] = useState(taskFormDefaultData);
  const boardsDispatch = useBoardsDispatch();
  const { handleModal } = useContext(ModalContext);
  const boards = useBoards();
  const currentBoard = getBoardDataFromTaskId(taskId, boards || []);
  const columnNames = currentBoard?.columns.map((column) => column.name);
  //fill form with current board data
  useEffect(() => {
    if (!boards) return;

    const currentTask = getTaskInfoFromId(taskId, boards);
    if (!currentTask) return;
    setTaskForm({
      ...taskForm,
      title: currentTask.title,
      description: currentTask.description,
      subtasks: currentTask.subtasks,
    });
  }, [taskId, boards, taskForm]);

  // change column name in form state
  const handleSubtaskChange = (newName: string, id: string) => {
    const newSubtasks = taskForm.subtasks.map((input) => {
      if (input.id === id) {
        return { ...input, name: newName };
      }
      return input;
    });
    setTaskForm({
      ...taskForm,
      subtasks: newSubtasks,
    });
  };

  // add new column to form state
  const handleAddSubtask = () => {
    setTaskForm({
      ...taskForm,
      subtasks: [
        ...taskForm.subtasks,
        { id: uuid(), title: "", isCompleted: false },
      ],
    });
  };

  // remove column from form state by id
  const handleRemoveSubtask = (id: string) => {
    const newSubtasks = taskForm.subtasks.filter(
      (subtask) => subtask.id !== id
    );
    setTaskForm({
      ...taskForm,
      subtasks: newSubtasks,
    });
  };

  // dispatch action to add new board
  const SaveTask = () => {
    //add board to boards
    if (!boardsDispatch) return;
    if (!taskForm.title) {
      setTaskForm({
        ...taskForm,
        titleError: "Cant't be empty",
      });
      return;
    }

    boardsDispatch({
      type: "EDIT_TASK",
      taskId: taskId,
      newTaskName: taskForm.title,
      newTaskDescription: taskForm.description,
      newSubtasks: taskForm.subtasks,
    });

    //close modal
    handleModal();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskForm({ ...taskForm, title: e.target.value, titleError: "" });
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskForm({ ...taskForm, description: e.target.value });
  };

  return (
    <>
      <ModalWindowTitle title={editTaskFormFields.title} />
      <LabelledTextField
        label={editTaskFormFields.inputs.textInput.label}
        type="text"
        placeholder={editTaskFormFields.inputs.textInput.placeholder}
        value={taskForm.title}
        onChange={handleTitleChange}
        errorMessage={taskForm.titleError}
        inputType="textInput"
      />
      <LabelledTextField
        label={editTaskFormFields.inputs.textAreaInput.label}
        id={editTaskFormFields.inputs.textAreaInput.id}
        type="textarea"
        placeholder={editTaskFormFields.inputs.textAreaInput.placeholder}
        value={taskForm.description}
        onChange={handleDescriptionChange}
        inputType="textareaInput"
        rows={4}
      />

      <MultiInputs
        label={editTaskFormFields.multiInputs.label}
        buttonText={editTaskFormFields.multiInputs.buttonText}
        inputs={taskForm.subtasks.map((subtask) => ({
          value: subtask.title,
          id: subtask.id,
        }))}
        handleInputChange={handleSubtaskChange}
        handleAddInput={handleAddSubtask}
        handleRemoveInput={handleRemoveSubtask}
      />
      <SelectInput
        currentOption={taskForm.status}
        handleSelectOption={(selectedOption) =>
          setTaskForm({ ...taskForm, status: selectedOption })
        }
        label={editTaskFormFields.selectInput.label}
        options={columnNames || []}
      />

      <ButtonPrimaryS onClick={SaveTask}>
        {editTaskFormFields.button.text}
      </ButtonPrimaryS>
    </>
  );
}
