export function TextInput({
  placeholder,
  id,
  type,
}: {
  placeholder: string;
  id: string;
  type: string;
}) {
  return (
    <input
      id={id}
      type={type}
      name={id}
      placeholder={placeholder}
      className="w-full rounded-md border border-gray-300 p-2"
    />
  );
}
