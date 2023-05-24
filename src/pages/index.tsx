import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "@/utils/api";
import { ButtonPrimaryL } from "@/components/Buttons";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Kanban task management web app</title>
        <meta name="description" content="Kanban task management web app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <ButtonPrimaryL>Sign in</ButtonPrimaryL>
      </main>
    </>
  );
};

export default Home;
