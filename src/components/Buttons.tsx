export function Button(props: React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      {...props}
      className={`w-full rounded-3xl px-4 py-3 ${props.className || ""}`}
    >
      {props.children}
    </button>
  );
}

export function ButtonPrimaryL({ children }: { children: React.ReactNode }) {
  return (
    <Button className="h-12 bg-purple text-button-primary text-white hover:bg-purple-hover">
      {children}
    </Button>
  );
}

export function ButtonPrimaryS({ children }: { children: React.ReactNode }) {
  return (
    <Button className="h-10 bg-purple text-button-secondary text-white hover:bg-purple-hover">
      {children}
    </Button>
  );
}

export function ButtonSecondary({ children }: { children: React.ReactNode }) {
  return (
    <Button
      className="h-10 bg-button-secondary text-button-secondary text-purple hover:bg-button-secondary-hover
    dark:bg-white dark:hover:bg-white"
    >
      {children}
    </Button>
  );
}

export function ButtonDestructive({ children }: { children: React.ReactNode }) {
  return (
    <Button className="h-10 bg-red text-button-secondary text-white hover:bg-red-hover">
      {children}
    </Button>
  );
}
