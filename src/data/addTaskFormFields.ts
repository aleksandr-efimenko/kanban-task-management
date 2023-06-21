export const addTaskFormFields = {
  title: "Add New Task",
  inputs: {
    textInput: {
      label: "Title",
      id: "task-name",
      placeholder: "e.g. Take coffee break",
    },
    textAreaInput: {
      label: "Description",
      id: "task-description",
      type: "textarea",
      placeholder:
        "e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.",
    },
  },
  multiInputs: {
    label: "Subtasks",
    buttonText: "+ Add New Subtask",
    placeholders: ["e.g. Make coffee", "e.g. Drink coffee & smile"],
  },
  selectInput: {
    label: "Status",
    id: "task-status",
  },
  button: {
    text: "Create Task",
  },
};
