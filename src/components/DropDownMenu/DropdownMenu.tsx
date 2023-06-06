export function DropdownMenu({
  buttons,
}: {
  buttons: <T>(props: T) => JSX.Element[];
}) {
  return <div className="flex flex-col gap-4 p-4"></div>;
}
