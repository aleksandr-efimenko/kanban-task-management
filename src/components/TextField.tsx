export function TextField({
  label,
  id,
  type,
  placeholder,
  ...props
}: {
  label: string;
  id: string;
  type: string;
  placeholder?: string;
  props: any;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-body-m text-medium-gray" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={id}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 p-2"
      />
    </div>
  );
}
