import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useBoards } from "@/context/BoardsContext";
import BoardsLayout from "@/components/Layouts/BoardsLayout";

const Home: NextPage = () => {
  const router = useRouter();
  const { boards, loading } = useBoards();

  useEffect(() => {
    if (!boards || !boards[0]) {
      return;
    }

    if (!loading) void router.push(`/boards/${boards[0].id}`);
  }, [router, boards, loading]);

  return (
    <BoardsLayout>
      <Head>
        <title>Kanban task management web app</title>
        <meta name="description" content="Kanban task management web app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </BoardsLayout>
  );
};

export default Home;
