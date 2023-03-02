import Head from "next/head";
import React from "react";
import Schedule from "../components/Schedule";

export default function Home() {
  return (
    <div>
      <Head>
        <title>F1 Schedule 2023</title>
        <meta
          name="description"
          content="F1 Schedule 2023 fetched from f1 official website"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Schedule />
    </div>
  );
}

