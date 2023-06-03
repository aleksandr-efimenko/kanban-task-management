import { TextInput } from "./TextInput";

export function TextField({
  label,
  id,
  type,
  placeholder,
  value,
  setValue,
}: {
  label: string;
  id: string;
  type: string;
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-body-m text-medium-gray" htmlFor={id}>
        {label}
      </label>
      <TextInput
        type={type}
        placeholder={placeholder}
        id={id}
        value={value}
        setValue={setValue}
      />
    </div>
  );
}
