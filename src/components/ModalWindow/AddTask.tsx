import { useContext, useEffect, useState } from "react";
import { ButtonPrimaryS } from "../Buttons/MainButtons";
import { LabelledTextField } from "../Inputs/LabelledTextField";
import { ModalWindowTitle } from "./ModalWindowTitle";
import { MultiInputs } from "./MultiInputs";
import { useBoards, useBoardsDispatch } from "@/context/BoardsContext";
import { ModalContext } from "@/context/ModalContext";
import { uuid } from "uuidv4";
import { SelectInput } from "../Inputs/SelectInput";
import { type Subtask } from "@/utils/DataTypes";

const addTaskFormFields = {
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
    placeholders: ["e.g. Make coffee", "e.g. Drink coffee & smile"],
  },
  selectInput: {
    label: "Status",
    id: "task-status",
  },
  button: {
    text: "Create Task",
  },
};

export const taskFormDefaultData = {
  title: "",
  titleError: "",
  description: "",
  subtasks: [
    { title: "", id: uuid(), isCompleted: false },
    { title: "", id: uuid(), isCompleted: false },
  ] as Subtask[],
  status: "",
};

export default function AddTask({ boardId }: { boardId: string }) {
  const [taskForm, setTaskForm] = useState(taskFormDefaultData);

  const boardsDispatch = useBoardsDispatch();
  const { handleModal } = useContext(ModalContext);
  const boards = useBoards();
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

  // dispatch new task to boards
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

    const columnId =
      currentBoard?.columns.find((column) => column.name === taskForm.status)
        ?.id || "";
    // create subtasks objects from subtask names remove empty subtasks
    const subtasks: Subtask[] = taskForm.subtasks
      .filter((subtask) => subtask.title)
      .map((subtask) => {
        return {
          id: uuid(),
          title: subtask.title,
          isCompleted: false,
        };
      });

    boardsDispatch({
      type: "ADD_TASK",
      taskId: uuid(),
      title: taskForm.title,
      description: taskForm.description,
      columnId: columnId,
      boardId,
      subtasks,
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
        { title: "", id: uuid(), isCompleted: false },
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

      <ButtonPrimaryS onClick={SaveTask}>
        {addTaskFormFields.button.text}
      </ButtonPrimaryS>
    </>
  );
}
