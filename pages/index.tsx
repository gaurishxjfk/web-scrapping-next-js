import axios from "axios";
import Head from "next/head";
import { GetStaticProps } from "next";
import React from "react";

interface ScheduleItem {
  date: string;
  venue: string;
}

interface HomeProps {
  scheduleData: ScheduleItem[];
}

export default function Home({ scheduleData }: HomeProps) {
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

      <main>
        <h1 className="title">F1 Schedule 2023</h1>
        <div className="container">
          {scheduleData.map((race) => (
            <div className="race-card" key={race.venue}>
              <p className="race-card_date">{race.date}</p>
              <h1 className="race-card_venue">{race.venue}</h1>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL_PROD
      : process.env.NEXT_PUBLIC_API_URL_DEV;

  const { data } = await axios.get<{ scheduleData: ScheduleItem[] }>(
    `${apiUrl}/api/schedule`
  );

  return {
    props: {
      scheduleData: data,
    },
  };
};
