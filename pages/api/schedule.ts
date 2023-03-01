import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { JSDOM } from "jsdom";

const getUrl = `https://www.formula1.com/en/racing/2023.html`;

function removeConsecutiveBlanks(str: string) {
  // replace two or more consecutive spaces with a single space
  str = str.replace(/\s{2,}/g, " ");

  // remove leading and trailing spaces
  str = str.trim();

  return str;
}

export default async function getSchedule(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = await axios.get(getUrl, {
      headers: {
        Accept: `text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9`,
        Host: `www.formula1.com`,
        "User-Agent": `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36`,
      },
    });

    const dom = new JSDOM(data);
    const raceCards: HTMLCollectionOf<Element> =
      dom.window.document.querySelectorAll(".race-card");

    const schedule = Array.from(raceCards, (raceCard) => {
      const raceInfo = removeConsecutiveBlanks(raceCard.textContent);
      const raceInfoArr = raceInfo.split(" ");
      const date = raceInfoArr[0] + " " + raceInfoArr[1];
      const venue = raceInfo.split("FORMULA 1")[0].replace(date + " ", "");
      return {
        date,
        venue,
      };
    });

    res.status(200).json(schedule);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching schedule");
  }
}
