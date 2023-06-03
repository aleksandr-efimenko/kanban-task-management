import { useState } from "react";
import { TextField } from "../Inputs/LabelledTextField";
import { ModalWindowTitle } from "./ModalWindowTitle";

export function EditTask({ taskId }: { taskId: string }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    subtasks: [],
  });

  return (
    <>
      <ModalWindowTitle title="Edit Task" />
      <TextField
        label="Title"
        id="task-title"
        type="text"
        value={task.title}
        setValue={(value) => setTask({ ...task, title: value })}
      />
    </>
  );
}
