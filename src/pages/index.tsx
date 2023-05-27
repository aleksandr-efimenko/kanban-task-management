import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "@/utils/api";

import defaultBoards from "@/data/defaultBoard.json";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    console.log(defaultBoards);
    if (!defaultBoards || !defaultBoards.boards || !defaultBoards.boards[0]) {
      return;
    }
    void router.push(`/boards/${defaultBoards.boards[0].id}`);
  }, [router]);
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
