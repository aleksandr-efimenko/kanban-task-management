import { type Subtask } from "./DataTypes";

/**
 * Construct the title of the subtasks for the task view
 * @param subtasks  The subtasks of the task
 * @returns       The title of the subtasks
 * @example
 * const subtasks = [
 *  {
 *   id: "1",
 *  title: "Subtask 1",
 * isCompleted: false,
 * },
 * {
 *  id: "2",
 * title: "Subtask 2",
 * isCompleted: true,
 * },
 * ];
 * const subtasksTitle = getSubtasksTitle(subtasks);
 * console.log(subtasksTitle);
 * // Subtasks (1 of 2)

 */
export function getSubtasksTitle(subtasks: Subtask[]) {
  if (!subtasks || subtasks?.length === 0) return "0 Subtasks";
  const subtasksNumber = subtasks?.length;
  const subtasksDone = subtasks.filter((subtask) => subtask.isCompleted).length;
  const subtaskTitle = subtasks.length > 1 ? "Subtasks" : "Subtask";
  const subtaskFullTitle = `${subtaskTitle} (${subtasksDone} of ${subtasksNumber})`;
  return subtaskFullTitle;
}

export function getSubtasksDescription(subtasks: Subtask[]) {
  if (!subtasks || subtasks?.length === 0) return "0 Subtasks";
  const subtasksNumber = subtasks?.length;
  const subtasksDone = subtasks.filter((subtask) => subtask.isCompleted).length;
  return `${subtasksDone} of ${subtasksNumber} subtasks`;
}
