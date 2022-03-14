import type { NextPage } from "next";
import SectionsList from "../componets/SectionsList";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>TODO list</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SectionsList />
    </>
  );
};

export default Home;
