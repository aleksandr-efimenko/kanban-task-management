import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "@/utils/api";
import { ButtonPrimaryL } from "@/components/Buttons";
import { Logo } from "@/components/Logo";
import LeftsidePanel from "@/components/LeftsidePanel";
import { TopPanel } from "@/components/TopPanel";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Kanban task management web app</title>
        <meta name="description" content="Kanban task management web app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid h-full min-h-screen w-full grid-cols-main-layout grid-rows-main-layout">
        <LeftsidePanel />
        <TopPanel boardName="Platform Launch" />
      </main>
    </>
  );
};

export default Home;
