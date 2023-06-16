import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "@/utils/api";

import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import Layout from "@/components/Layout";
import { BoardsProvider } from "@/context/BoardsContext";
import { ModalProvider } from "@/context/ModalContext";
import { TaskViewDropdownMenuProvider } from "@/context/TaskViewDropdownMenuContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class">
        <BoardsProvider>
          <TaskViewDropdownMenuProvider>
            <ModalProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ModalProvider>
          </TaskViewDropdownMenuProvider>
        </BoardsProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
