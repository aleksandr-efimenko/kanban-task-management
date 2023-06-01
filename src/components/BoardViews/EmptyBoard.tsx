import { ActionKind, useBoardsDispatch } from "@/context/BoardsContext";
import { ButtonPrimaryL } from "../Buttons";

export function EmptyBoard({ boardId }: { boardId: string }) {
  const dispatch = useBoardsDispatch();

  const handleCreateColumn = (boardId: string) => {
    dispatch({
      type: ActionKind.ADD_COLUMN,
      boardId: boardId,
    });
  };
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-8">
        <h4 className="text-heading-l text-medium-gray">
          This board is empty. Create a new column to get started.
        </h4>
        <div className="w-fit ">
          <ButtonPrimaryL onClick={() => handleCreateColumn(boardId)}>
            + Add New Column
          </ButtonPrimaryL>
        </div>
      </div>
    </div>
  );
}