import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "700"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main
        className={`${plusJakartaSans.className} grid h-screen w-full grid-cols-main-layout grid-rows-main-layout overflow-hidden`}
      >
        {children}
      </main>
    </>
  );
}
