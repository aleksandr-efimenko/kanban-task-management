import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { api } from "@/utils/api";

import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "700"],
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class">
        <div className={plusJakartaSans.className}>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
