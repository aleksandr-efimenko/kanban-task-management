import { ButtonPrimaryS } from "../Buttons";
import { TextField } from "../Inputs/LabelledTextField";

export default function AddBoard() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-heading-l">Add New Board</h2>
      <TextField
        label="Name"
        id="board-name"
        type="text"
        placeholder="e.g. Web Design"
      />
      <ButtonPrimaryS>Create New Board</ButtonPrimaryS>
    </div>
  );
}
