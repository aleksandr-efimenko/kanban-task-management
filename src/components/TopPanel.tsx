import { ButtonPrimaryL } from "./Buttons";
import { ThreeDotsButton } from "./ThreeDotsButton";

export function TopPanel({ boardName }: { boardName: string }) {
  return (
    <div
      className="col-start-2 col-end-2 row-start-1 row-end-2 
    w-full border-b border-lines-light 
    dark:border-lines-dark dark:bg-dark-gray"
    >
      <div className="flex items-center justify-between pl-6 pt-5">
        <h1 className="text-heading-xl">{boardName}</h1>
        <div className="flex items-center gap-6">
          <ButtonPrimaryL>+ Add new Task</ButtonPrimaryL>
          <ThreeDotsButton />
        </div>
      </div>
    </div>
  );
}
