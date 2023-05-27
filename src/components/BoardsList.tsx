import { BoardListItem } from "@/components/BoardListItem";
const boards = [
  {
    title: "Platform Launch",
    selected: true,
  },
  {
    title: "Marketing Plan",
    selected: false,
  },
  {
    title: "Roadmap",
    selected: false,
  },
];

export function BoardsList() {
  return (
    <div className="flex flex-col pr-6">
      <h2 className="pb-[1.1875rem] pl-8 text-heading-s uppercase text-medium-gray">
        ALL BOARDS ({boards.length})
      </h2>
      {boards.map((board) => (
        <BoardListItem
          key={board.title}
          title={board.title}
          selected={board.selected}
        />
      ))}
    </div>
  );
}
