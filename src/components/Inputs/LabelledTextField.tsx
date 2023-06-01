import { TextInput } from "./TextInput";

export function TextField({
  label,
  id,
  type,
  placeholder,
}: {
  label: string;
  id: string;
  type: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-body-m text-medium-gray" htmlFor={id}>
        {label}
      </label>
      <TextInput type={type} placeholder={placeholder || ""} id={id} />
    </div>
  );
}
