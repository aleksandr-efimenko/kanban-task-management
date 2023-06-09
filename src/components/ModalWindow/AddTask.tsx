import { useContext, useEffect, useState } from "react";
import { ButtonPrimaryS } from "../Buttons/MainButtons";
import { LabelledTextField } from "../Inputs/LabelledTextField";
import { ModalWindowTitle } from "./ModalWindowTitle";
import { MultiInputs } from "./MultiInputs";
import { useBoards, useBoardsDispatch } from "@/context/BoardsContext";
import { ModalContext } from "@/context/ModalContext";
import { uuid } from "uuidv4";
import { SelectInput } from "../Inputs/SelectInput";
import { api } from "@/utils/api";
import {
  addTaskFormFields,
  taskFormDefaultData,
} from "@/data/TaskFormDefaultData";
import { LoadingSpinner } from "../LoadingSpinner";

export default function AddTaskForm({ boardId }: { boardId: string }) {
  const [taskForm, setTaskForm] = useState(taskFormDefaultData);

  const boardsDispatch = useBoardsDispatch();
  const { handleModal } = useContext(ModalContext);
  const { boards } = useBoards();
  const currentBoard = boards?.find((board) => board.id === boardId);
  const columnNames = currentBoard?.columns.map((column) => column.name);
  useEffect(() => {
    if (!columnNames || !columnNames.length) return;
    if (taskForm.status) return;
    setTaskForm({
      ...taskForm,
      status: columnNames[0] || "",
    });
  }, [columnNames, taskForm]);

  const createTaskMutation = api.tasks.createTask.useMutation();
  // dispatch new task to boards
  const SaveTask = async () => {
    //add board to boards
    if (!boardsDispatch) return;
    if (!taskForm.title) {
      setTaskForm({
        ...taskForm,
        titleError: "Cant't be empty",
      });
      return;
    }
    taskForm.subtasks.map((subtask) => {
      if (!subtask.title) {
        setTaskForm({
          ...taskForm,
          subtasks: taskForm.subtasks.map((subtask) => {
            if (!subtask.title) {
              return { ...subtask, titleError: "Cant't be empty" };
            }
            return subtask;
          }),
        });
      }
    });
    if (taskForm.subtasks.some((subtask) => !subtask.title)) return;

    const columnId =
      currentBoard?.columns.find((column) => column.name === taskForm.status)
        ?.id || "";

    const newTaskInDb = await createTaskMutation.mutateAsync({
      title: taskForm.title,
      description: taskForm.description,
      columnId,
      boardId,
      subtasks: taskForm.subtasks.map((subtask) => subtask.title),
    });

    // create subtasks objects from subtask names remove empty subtasks
    // const subtasks: Subtask[] = taskForm.subtasks
    //   .filter((subtask) => subtask.title)
    //   .map((subtask) => {
    //     return {
    //       id: uuid(),
    //       title: subtask.title,
    //       isCompleted: false,
    //     };
    //   });

    boardsDispatch({
      type: "ADD_TASK",
      taskId: newTaskInDb.id,
      title: newTaskInDb.title,
      description: newTaskInDb.description || "",
      columnId: columnId,
      boardId,
      subtasks: newTaskInDb.subtasks.map((subtask) => {
        return {
          id: subtask.id,
          title: subtask.title,
          isCompleted: subtask.isCompleted,
        };
      }),
    });

    //close modal
    handleModal();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskForm({ ...taskForm, title: e.target.value, titleError: "" });
  };

  // handle subtask change in subtask array in taskForm state
  const handleSubtaskChange = (newName: string, id: string) => {
    const newSubtasks = taskForm.subtasks.map((subtask) => {
      if (subtask.id === id) {
        return {
          ...subtask,
          title: newName,
          titleError: "",
        };
      }
      return subtask;
    });
    setTaskForm({
      ...taskForm,
      subtasks: newSubtasks,
    });
  };

  const handleAddSubtask = () => {
    setTaskForm({
      ...taskForm,
      subtasks: [
        ...taskForm.subtasks,
        { title: "", id: uuid(), isCompleted: false, titleError: "" },
      ],
    });
  };

  const handleRemoveSubtask = (id: string) => {
    const newSubtasks = taskForm.subtasks.filter(
      (subtask) => subtask.id !== id
    );
    setTaskForm({
      ...taskForm,
      subtasks: newSubtasks,
    });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskForm({
      ...taskForm,
      description: e.target.value,
    });
  };
  return (
    <>
      <ModalWindowTitle title={addTaskFormFields.title} />
      <LabelledTextField
        label={addTaskFormFields.inputs.textInput.label}
        type="text"
        placeholder={addTaskFormFields.inputs.textInput.placeholder}
        value={taskForm.title}
        onChange={handleTitleChange}
        errorMessage={taskForm.titleError}
        inputType="textInput"
      />
      <LabelledTextField
        label={addTaskFormFields.inputs.textAreaInput.label}
        id={addTaskFormFields.inputs.textAreaInput.id}
        type="textarea"
        placeholder={addTaskFormFields.inputs.textAreaInput.placeholder}
        value={taskForm.description}
        onChange={handleDescriptionChange}
        inputType="textareaInput"
        rows={4}
      />

      <MultiInputs
        label={addTaskFormFields.multiInputs.label}
        buttonText={addTaskFormFields.multiInputs.buttonText}
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
        handleSelectOption={(selectedOption) =>
          setTaskForm({ ...taskForm, status: selectedOption })
        }
        label={addTaskFormFields.selectInput.label}
        options={columnNames || []}
      />

      <ButtonPrimaryS
        onClick={() => {
          void SaveTask();
        }}
      >
        {addTaskFormFields.button.text}
      </ButtonPrimaryS>
      {createTaskMutation.isLoading && <LoadingSpinner />}
    </>
  );
}
