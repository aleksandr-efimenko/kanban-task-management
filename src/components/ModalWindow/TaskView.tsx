import { useBoards, useBoardsDispatch } from "@/context/BoardsContext";
import { ThreeDotsButton } from "../Buttons/ThreeDotsMenu";
import { ModalWindowTitle } from "./ModalWindowTitle";
import { useContext } from "react";
import { CheckboxGroup } from "../Inputs/CheckboxGroup";
import { generateSubtasksTitles } from "@/utils/SubtasksTitle";
import { SelectInput } from "../Inputs/SelectInput";
import { TaskDropdownMenu } from "../DropDownMenu/DropdownMenu";
import { TaskViewDropdownMenuContext } from "@/context/TaskViewDropdownMenuContext";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import {
  getTaskInfoFromId,
  getBoardDataFromTaskId,
  getColumnIdByTaskId,
} from "@/utils/getBoardData";

export function TaskView({ taskId }: { taskId: string }) {
  const { boards } = useBoards();
  const boardsDispatch = useBoardsDispatch();
  const task = getTaskInfoFromId(taskId, boards || []);

  const { menuIsOpen, handleMenu } = useContext(TaskViewDropdownMenuContext);
  const { data: session } = useSession();
  if (!task) return null;
  const { title: title, description, subtasks, status } = task;

  const currentBoard = getBoardDataFromTaskId(taskId, boards || []);
  const columnNames = currentBoard?.columns.map((column) => {
    return { id: column.id, name: column.name };
  });
  const currentColumnName = currentBoard?.columns.find(
    (column) => column.id === getColumnIdByTaskId(taskId, boards || [])
  )?.name;

  const changeTaskStatusMutation = api.tasks.changeTaskColumn.useMutation();

  const handleChangeTaskStatus = (selectedOption: string) => {
    if (!boardsDispatch) return;
    if (session)
      changeTaskStatusMutation.mutate({
        id: taskId,
        columnId: currentBoard?.columns.find(
          (column) => column.name === selectedOption
        )?.id as string,
      });
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
