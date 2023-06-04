import {
  TextInput,
  type TextFieldWithoutLabelProps,
} from "@/components/Inputs/TextInput";

export type TextFieldWithLabelProps = TextFieldWithoutLabelProps & {
  label: string;
  id: string;
};

/**
 * This component is a wrapper for TextInput component.
 * It adds a label to the input.
 * @param props  - label, id, errorMessage, and all props from TextInput
 * @returns   - a label and TextInput
 * @example
 * <TextField
 *  label="Board Name"
 *  id="board-name"
 *  type="text"
 *  placeholder="e.g. Web Design"
 *  value={boardForm.title}
 *  onChange={handleInputChange}
 *  errorMessage={boardForm.titleError}
 * />
 *
 */
export function LabelledTextField(props: TextFieldWithLabelProps) {
  const { id, label, errorMessage } = props;
  return (
    <div className="flex flex-col gap-2">
      <label
        className="relative text-body-m text-medium-gray dark:text-white"
        htmlFor={id}
      >
        {label}
      </label>
      <TextInput {...props} errorMessage={errorMessage} />
    </div>
  );
}
