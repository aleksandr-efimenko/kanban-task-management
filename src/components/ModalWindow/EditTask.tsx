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
  getColumnDataFromTaskId,
  getTaskInfoFromId,
} from "@/utils/getBoardData";
import { api } from "@/utils/api";

export default function EditTask({ taskId }: { taskId: string }) {
  const [taskForm, setTaskForm] = useState(taskFormDefaultData);
  const boardsDispatch = useBoardsDispatch();
  const { handleModal } = useContext(ModalContext);
  const { boards } = useBoards();
  const currentBoard = getBoardDataFromTaskId(taskId, boards || []);
  const currentTask = getTaskInfoFromId(taskId, boards || []);
  const columnNames = currentBoard?.columns.map((column) => column.name);
  const currentColumn = currentBoard?.columns.find(
    (col) => col.id === getColumnDataFromTaskId(taskId, boards || [])?.id
  )?.name;
  const updateTaskMutation = api.tasks.updateTask.useMutation();

  //fill form with current board data
  useEffect(() => {
    const currentColumn = currentBoard?.columns.find(
      (col) => col.id === getColumnDataFromTaskId(taskId, boards || [])?.id
    )?.name;
    const currentStatus = currentColumn;
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
    currentColumn,
    currentTask?.title,
    currentTask?.description,
    currentTask?.subtasks,
  ]);

  // change column name in form state
  const handleSubtaskChange = (newName: string, id: string) => {
    const newSubtasks = taskForm.subtasks.map((input) => {
      if (input.id === id) {
        return { ...input, title: newName, titleError: "" };
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
        { id: uuid(), title: "", isCompleted: false, titleError: "" },
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
  const SaveTask = async () => {
    //add board to boards
    if (!boardsDispatch) return;
    // check if title is empty then show error
    if (!taskForm.title) {
      setTaskForm({
        ...taskForm,
        titleError: "Cant't be empty",
      });
      return;
    }
    // check if subtask title is empty then show error
    taskForm.subtasks.forEach((subtask) => {
      if (!subtask.title) {
        setTaskForm({
          ...taskForm,
          subtasks: taskForm.subtasks.map((input) => {
            if (input.id === subtask.id) {
              return { ...input, titleError: "Cant't be empty" };
            }
            return input;
          }),
        });
      }
    });
    if (taskForm.subtasks.some((subtask) => !subtask.title)) return;

    //save changes to db
    await updateTaskMutation.mutateAsync({
      id: taskId,
      newTitle: taskForm.title,
      newDescription: taskForm.description,
      newStatus: taskForm.status,
      newColumnId: taskForm.status,
    });

    // save changes to context
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
        newColumnId: taskForm.status,
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
          errorMessage: subtask.titleError,
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

      <ButtonPrimaryS
        onClick={() => {
          void SaveTask();
        }}
      >
        {editTaskFormFields.button.text}
      </ButtonPrimaryS>
    </>
  );
}
