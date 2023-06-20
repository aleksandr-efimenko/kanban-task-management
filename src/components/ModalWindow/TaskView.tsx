import { useBoards, useBoardsDispatch } from "@/context/BoardsContext";
import { ThreeDotsButton } from "../Buttons/ThreeDotsMenu";
import { ModalWindowTitle } from "./ModalWindowTitle";
import { useContext, useMemo } from "react";
import {
  getBoardDataFromTaskId,
  getColumnIdByTaskId,
  getTaskInfoFromId,
} from "@/utils/getBoardData";
import { CheckboxGroup } from "../Inputs/CheckboxGroup";
import { generateSubtasksTitles } from "@/utils/SubtasksTitle";
import { SelectInput } from "../Inputs/SelectInput";
import { TaskDropdownMenu } from "../DropDownMenu/DropdownMenu";
import { TaskViewDropdownMenuContext } from "@/context/TaskViewDropdownMenuContext";

export function TaskView({ taskId }: { taskId: string }) {
  const boards = useBoards();
  const boardsDispatch = useBoardsDispatch();
  const task = useMemo(() => {
    if (!taskId || !boards) return null;
    return getTaskInfoFromId(taskId, boards);
  }, [taskId, boards]);
  const { menuIsOpen, handleMenu } = useContext(TaskViewDropdownMenuContext);

  if (!task) return null;
  const { title: title, description, subtasks, status } = task;

  const currentBoard = getBoardDataFromTaskId(taskId, boards || []);
  const columnNames = currentBoard?.columns.map((column) => column.name);
  const currentColumnName = currentBoard?.columns.find(
    (column) => column.id === getColumnIdByTaskId(taskId, boards || [])
  )?.name;

  const currentStatus = status ? status : currentColumnName;
  const handleChangeTaskStatus = (selectedOption: string) => {
    if (!boardsDispatch) return;
    boardsDispatch({
      type: "CHANGE_TASK_STATUS",
      taskId,
      newStatus: selectedOption,
    });
  };

  const subtasksTitles = generateSubtasksTitles(subtasks);
  return (
    <>
      <div className="flex items-center justify-between gap-6">
        <ModalWindowTitle title={title} />
        <ThreeDotsButton
          menuElement={<TaskDropdownMenu taskId={taskId} />}
          menuIsOpen={menuIsOpen}
          handleMenu={handleMenu}
        />
      </div>
      <p className="text-body-l text-medium-gray">{description}</p>
      <CheckboxGroup title={subtasksTitles} items={subtasks} />
      <SelectInput
        label="Current Status"
        options={columnNames || []}
        currentOption={currentStatus || ""}
        handleSelectOption={handleChangeTaskStatus}
      />
    </>
  );
}
