import { useBoardsDispatch } from "@/context/BoardsContext";
import { api } from "@/utils/api";
import { type Subtask } from "@prisma/client";
import { useSession } from "next-auth/react";

export function CheckboxItem({ subtask }: { subtask: Subtask }) {
  const { id, title: title, isCompleted } = subtask;
  const dispatch = useBoardsDispatch();
  const editSubtaskMutation = api.subtasks.editSubtask.useMutation();
  const { data: session } = useSession();
  if (!dispatch) return null;
  const handleCheckboxChange = () => {
    if (session)
      editSubtaskMutation.mutate({ id, title, isCompleted: !isCompleted });
    dispatch({
      type: "EDIT_SUBTASK",
      id,
      title,
      isCompleted: !isCompleted,
    });
  };
  const checkedClass = isCompleted ? "line-through opacity-50" : "";
  return (
    <label
      className="min-h-10 flex cursor-pointer items-center gap-4 
     rounded rounded-s bg-light-gray p-3 
     duration-200 hover:bg-purple hover:bg-opacity-25 dark:bg-very-dark-gray 
     dark:hover:bg-purple dark:hover:bg-opacity-25"
    >
      <input
        type="checkbox"
        className="h-4 w-4 cursor-pointer appearance-none rounded-sm border 
         border-medium-gray border-opacity-25 outline-none checked:border-transparent
         checked:bg-purple checked:bg-check checked:bg-center checked:bg-no-repeat focus:outline-none"
        checked={isCompleted}
        onChange={handleCheckboxChange}
      />

      <span
        className={`w-full select-none text-body-m text-black dark:text-white ${checkedClass}`}
      >
        {title}
      </span>
    </label>
  );
}
