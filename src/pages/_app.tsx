import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "@/utils/api";

import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import Layout from "@/components/Layout";
import { BoardsProvider } from "@/context/BoardsContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <BoardsProvider>
        <ThemeProvider attribute="class">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </BoardsProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
