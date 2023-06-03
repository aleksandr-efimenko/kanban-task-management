export function TextInput({
  placeholder,
  id,
  type,
  value,
  setValue,
}: {
  placeholder?: string;
  id: string;
  type: string;
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <input
      id={id}
      type={type}
      name={id}
      placeholder={placeholder || ""}
      className="w-full rounded-md border border-gray-300 p-2"
      value={value || ""}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
