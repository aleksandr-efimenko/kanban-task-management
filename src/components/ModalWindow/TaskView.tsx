import { useBoards, useBoardsDispatch } from "@/context/BoardsContext";
import { ThreeDotsButton } from "../Buttons/ThreeDotsMenu";
import { ModalWindowTitle } from "./ModalWindowTitle";
import { useContext } from "react";
import { CheckboxGroup } from "../Inputs/CheckboxGroup";
import { generateSubtasksTitles } from "@/utils/SubtasksTitle";
import { type OptionProp, SelectInput } from "../Inputs/SelectInput";
import { TaskDropdownMenu } from "../DropDownMenu/DropdownMenu";
import { TaskViewDropdownMenuContext } from "@/context/TaskViewDropdownMenuContext";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import {
  getTaskInfoFromId,
  getBoardDataFromTaskId,
} from "@/utils/getBoardData";

export function TaskView({ taskId }: { taskId: string }) {
  const { boards } = useBoards();
  const boardsDispatch = useBoardsDispatch();
  const { menuIsOpen, handleMenu } = useContext(TaskViewDropdownMenuContext);
  const { data: session } = useSession();
  const changeTaskStatusMutation = api.tasks.changeTaskColumn.useMutation();

  const currentBoard = getBoardDataFromTaskId(taskId, boards) ?? null;
  if (!currentBoard) return null;
  const task = getTaskInfoFromId(taskId, [currentBoard]);
  if (!task) return null;
  const { title, description, subtasks, columnId } = task;

  const handleChangeTaskStatus = (selectedOption: OptionProp) => {
    if (!boardsDispatch) return;
    if (session)
      changeTaskStatusMutation.mutate({
        id: taskId,
        newColumnId: selectedOption.id ?? "",
      });
    boardsDispatch({
      type: "CHANGE_TASK_STATUS",
      taskId,
      newColumnId: selectedOption.id ?? "",
    });
  };
  const statusOptions = currentBoard.columns.map((column) => {
    return {
      id: column.id,
      name: column.name,
    };
  });

  const subtasksTitles = generateSubtasksTitles(subtasks);
  const currentColumnOption = currentBoard.columns?.find(
    (col) => col.id === columnId
  ) as OptionProp;

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
        options={statusOptions}
        currentOption={currentColumnOption}
        handleSelectOption={handleChangeTaskStatus}
      />
    </>
  );
}
