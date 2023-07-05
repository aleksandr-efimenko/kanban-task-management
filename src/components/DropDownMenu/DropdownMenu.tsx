import { uuid } from "uuidv4";
import {
  DropdownDeleteBoardItem,
  DropdownEditBoardItem,
} from "./DropdownMenuBoard";
import {
  DropdownDeleteTaskItem,
  DropdownEditTaskItem,
} from "./DropdownMenuTask";
import { DropdownMenuItem } from "./DropdownMenuItem";
import { type OptionProp } from "../Inputs/SelectInput";
// import { TopPanelDropdownMenuContext } from "@/context/TopPanelDropdownMenuContext";
// import { useContext, useEffect, useRef, useState } from "react";
// import { listenForOutsideClicks } from "@/utils/listenForOutsideClicks";

export function DropdownMenu({
  buttons,
  position,
}: {
  buttons: JSX.Element[];
  position?: string;
}) {
  // const menuRef = useRef(null);
  // const [listening, setListening] = useState(false);
  // const { menuIsOpen, handleMenu } = useContext(DropdownMenuContext);
  // useEffect(
  //   listenForOutsideClicks(listening, setListening, menuRef, handleMenu)
  // );
  return (
    <div
      // ref={menuRef}
      className={`absolute flex max-h-40 flex-col overflow-auto rounded-lg bg-white 

    py-4 dark:bg-very-dark-gray ${position ? position : "right-0"}`}
    >
      {buttons}
    </div>
  );
}

export function BoardDropdownMenu({ boardId }: { boardId: string }) {
  const buttons = [
    <DropdownEditBoardItem boardId={boardId} key={uuid()} />,
    <DropdownDeleteBoardItem boardId={boardId} key={uuid()} />,
  ];
  return (
    <DropdownMenu position="-left-[11.5rem] top-14 w-48" buttons={buttons} />
  );
}

export function TaskDropdownMenu({ taskId }: { taskId: string }) {
  const buttons = [
    <DropdownEditTaskItem taskId={taskId} key={uuid()} />,
    <DropdownDeleteTaskItem taskId={taskId} key={uuid()} />,
  ];
  return <DropdownMenu position="-left-24 top-8 w-48" buttons={buttons} />;
}

export function TaskStatusDropdownMenu({
  options,
  handleClick,
}: {
  options: OptionProp[];
  handleClick: (value: OptionProp) => void;
}) {
  const buttons = options.map((option) => (
    <DropdownMenuItem
      onClick={() => handleClick(option)}
      title={option.name}
      destructive={false}
      key={uuid()}
    />
  ));
  return <DropdownMenu buttons={buttons} position="w-full" />;
}
