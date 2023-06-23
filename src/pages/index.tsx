import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useBoards } from "@/context/BoardsContext";

const Home: NextPage = () => {
  const router = useRouter();
  const { boards } = useBoards();
  useEffect(() => {
    if (!boards || !boards[0]) {
      return;
    }
    // void router.push(`/boards/${boards[0].id}`);
  }, [router, boards]);

  return (
    <>
      <Head>
        <title>Kanban task management web app</title>
        <meta name="description" content="Kanban task management web app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};

export default Home;
