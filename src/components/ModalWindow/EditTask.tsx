import { useContext, useEffect, useState } from "react";
import { ButtonPrimaryS } from "../Buttons/MainButtons";
import { LabelledTextField } from "../Inputs/LabelledTextField";
import { ModalWindowTitle } from "./ModalWindowTitle";
import { MultiInputs } from "./MultiInputs";
import { useBoards, useBoardsDispatch } from "@/context/BoardsContext";
import { ModalContext } from "@/context/ModalContext";
import { uuid } from "uuidv4";
import { SelectInput } from "../Inputs/SelectInput";
import {
  editTaskFormFields,
  taskFormDefaultData,
} from "@/data/TaskFormDefaultData";
import {
  getBoardDataFromTaskId,
  getColumnIdByTaskId,
  getTaskInfoFromId,
} from "@/utils/getBoardData";

export default function EditTask({ taskId }: { taskId: string }) {
  const [taskForm, setTaskForm] = useState(taskFormDefaultData);
  const boardsDispatch = useBoardsDispatch();
  const { handleModal } = useContext(ModalContext);
  const boards = useBoards();
  const currentBoard = getBoardDataFromTaskId(taskId, boards || []);
  const currentTask = getTaskInfoFromId(taskId, boards || []);
  const columnNames = currentBoard?.columns.map((column) => column.name);
  //fill form with current board data
  useEffect(() => {
    const currentColumn = currentBoard?.columns.find(
      (col) => col.id === getColumnIdByTaskId(taskId, boards || [])
    )?.name;
    const currentStatus = currentTask?.status
      ? currentTask?.status
      : currentColumn;
    setTaskForm({
      title: currentTask?.title || "",
      titleError: "",
      description: currentTask?.description || "",
      subtasks: currentTask?.subtasks || [],
      status: currentStatus || "",
    });
  }, [
    taskId,
    boards,
    currentBoard?.columns,
    currentTask?.status,
    currentTask?.title,
    currentTask?.description,
    currentTask?.subtasks,
  ]);

  // change column name in form state
  const handleSubtaskChange = (newName: string, id: string) => {
    const newSubtasks = taskForm.subtasks.map((input) => {
      if (input.id === id) {
        return { ...input, title: newName };
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
    // save changes
    boardsDispatch({
      type: "EDIT_TASK",
      taskId: taskId,
      newTaskName: taskForm.title,
      newTaskDescription: taskForm.description,
      newSubtasks: taskForm.subtasks,
      newStatus: taskForm.status,
    });

    // change task status if needed
    if (taskForm.status !== currentTask?.status) {
      boardsDispatch({
        type: "CHANGE_TASK_STATUS",
        taskId: taskId,
        newStatus: taskForm.status,
      });
    }
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
        handleSelectOption={(selectedOption) => {
          console.log(selectedOption);
          setTaskForm({ ...taskForm, status: selectedOption });
        }}
        label={editTaskFormFields.selectInput.label}
        options={columnNames || []}
      />

      <ButtonPrimaryS onClick={SaveTask}>
        {editTaskFormFields.button.text}
      </ButtonPrimaryS>
    </>
  );
}
