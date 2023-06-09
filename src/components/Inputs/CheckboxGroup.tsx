import { uuid } from "uuidv4";
import { CheckboxItem } from "./CheckboxItem";
import { type Subtask } from "@/utils/DataTypes";

export function CheckboxGroup({
  title,
  items,
}: {
  title: string;
  items: Subtask[];
}) {
  return (
    <div className="flex flex-col space-y-2">
      <p className="text-body-l font-semibold">{title}</p>
      {items.map((item) => (
        <CheckboxItem subtask={item} key={uuid()} />
      ))}
    </div>
  );
}
