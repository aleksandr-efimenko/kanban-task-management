import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "@/utils/api";
import { ButtonPrimaryL } from "@/components/Buttons";
import { Logo } from "@/components/Logo";
import LeftsidePanel from "@/components/LeftsidePanel";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Kanban task management web app</title>
        <meta name="description" content="Kanban task management web app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid h-full min-h-screen w-full grid-cols-main-layout">
        <LeftsidePanel />

        <ButtonPrimaryL>Sign in</ButtonPrimaryL>
      </main>
    </>
  );
};

export default Home;
