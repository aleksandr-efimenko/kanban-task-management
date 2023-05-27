export function BoardViewContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="col-start-2 col-end-3 row-start-2 row-end-3
        grid max-h-full auto-cols-board-view grid-flow-col 
        grid-cols-board-view gap-6 overflow-auto
        bg-light-gray p-6 dark:bg-very-dark-gray
    "
    >
      {children}
    </div>
  );
}
