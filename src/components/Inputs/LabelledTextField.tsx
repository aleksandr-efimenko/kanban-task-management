import {
  TextInput,
  type TextFieldWithoutLabelProps,
} from "@/components/Inputs/TextInput";
import { uuid } from "uuidv4";

export type TextFieldWithLabelProps = TextFieldWithoutLabelProps & {
  label: string;
};

export function LabelledTextField(props: TextFieldWithLabelProps) {
  const { label, errorMessage } = props;
  const id = "board-name";
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
