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

const taskFieldsStaticData = {
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
  subtasks: [
    { title: "", id: uuid() },
    { title: "", id: uuid() },
  ],
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
          id: subtask.id,
          title: subtask.title,
          isCompleted: false,
        };
      });

    boardsDispatch({
      type: "ADD_TASK",
      taskId: uuid(),
      taskName: taskForm.title,
      taskDescription: taskForm.description,
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
      subtasks: [...taskForm.subtasks, { title: "", id: uuid() }],
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
      descriptionError: "",
    });
  };
  return (
    <>
      <ModalWindowTitle title="Add New Task" />
      <LabelledTextField
        label={taskFieldsStaticData.inputs.textInput.label}
        type="text"
        placeholder={taskFieldsStaticData.inputs.textInput.placeholder}
        value={taskForm.title}
        onChange={handleTitleChange}
        errorMessage={taskForm.titleError}
        inputType="textInput"
      />
      <LabelledTextField
        label={taskFieldsStaticData.inputs.textAreaInput.label}
        id={taskFieldsStaticData.inputs.textAreaInput.id}
        type="textarea"
        placeholder={taskFieldsStaticData.inputs.textAreaInput.placeholder}
        value={taskForm.description}
        onChange={handleDescriptionChange}
        errorMessage={taskForm.descriptionError}
        inputType="textareaInput"
        rows={4}
      />

      <MultiInputs
        label={taskFieldsStaticData.multiInputs.label}
        buttonText={taskFieldsStaticData.multiInputs.buttonText}
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
        label={taskFieldsStaticData.selectInput.label}
        options={columnNames || []}
      />

      <ButtonPrimaryS onClick={SaveTask}>
        {taskFieldsStaticData.button.text}
      </ButtonPrimaryS>
    </>
  );
}
