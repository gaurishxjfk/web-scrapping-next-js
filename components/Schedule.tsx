import axios from "axios";
import React, { useEffect, useState } from "react";
interface ScheduleItem {
  date: string;
  venue: string;
}

interface ScheduleResponse {
    scheduleData: ScheduleItem[];
  }
const Schedule: React.FC = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    console.log(window.location.href)
    const fetchScheduleData = async () => {
      const { data } = await axios.get<ScheduleResponse>(
        `${window.location.href}/api/schedule`
      );
      setScheduleData(data.scheduleData); 
    };
    fetchScheduleData();
  }, []);

  return (
    <main>
      <h1 className="title">F1 Schedule 2023</h1>
      <div className="container">
        {scheduleData.map((race) => (
          <div className="race-card" key={race.date}>
            <p className="race-card_date">{race.date}</p>
            <h1 className="race-card_venue">{race.venue}</h1>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Schedule;
