import { useBoards } from "@/context/BoardsContext";
import { ThreeDotsButton } from "../Buttons/ThreeDotsMenu";
import { ModalWindowTitle } from "./ModalWindowTitle";
import { useMemo } from "react";
import {
  getBoardDataFromTaskId,
  getTaskInfoFromId,
} from "@/utils/getBoardData";
import { CheckboxGroup } from "../Inputs/CheckboxGroup";
import { getSubtasksTitle } from "@/utils/SubtasksTitle";
import { SelectInput } from "../Inputs/SelectInput";

export function TaskView({ taskId }: { taskId: string }) {
  const boards = useBoards();
  const task = useMemo(() => {
    return getTaskInfoFromId(taskId, boards || []);
  }, [taskId, boards]);
  if (!boards) return null;
  if (!task) return null;
  const { title, description, subtasks } = task;

  const subtasksTitle = getSubtasksTitle(subtasks);
  const columnNames = getBoardDataFromTaskId(taskId, boards || [])?.columns.map(
    (column) => column.name
  );

  return (
    <>
      <div className="flex items-center justify-between gap-6">
        <ModalWindowTitle title={title} />
        <ThreeDotsButton type="task" id={taskId} />
      </div>
      <p className="text-body-l text-medium-gray">{description}</p>
      <CheckboxGroup title={subtasksTitle} items={subtasks} />
      <SelectInput
        label="Current Status"
        options={columnNames || []}
        currentOption={task.status}
      />
    </>
  );
}
