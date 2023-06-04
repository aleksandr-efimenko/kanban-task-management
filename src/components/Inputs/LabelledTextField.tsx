import { TextInput } from "./TextInput";

export function TextField({
  label,
  id,
  type,
  placeholder,
  value,
  setValue,
  errorMessage,
}: {
  label: string;
  id: string;
  type: string;
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
  errorMessage?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="relative text-body-m text-medium-gray dark:text-white"
        htmlFor={id}
      >
        {label}
      </label>
      <TextInput
        type={type}
        placeholder={placeholder}
        id={id}
        value={value}
        setValue={setValue}
        errorMessage={errorMessage}
      />
    </div>
  );
}
