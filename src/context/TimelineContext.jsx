import { createContext, useContext, useState } from "react";

const TimelineContext = createContext();

export const useTimeline = () => useContext(TimelineContext);

export const TimelineProvider = ({ children }) => {
  const [entries, setEntries] = useState([
    {
      id: 1,
      type: "Call",
      friendName: "Sarah Rahman",
      title: "Call with Sarah Rahman",
      date: "2026-04-10",
    },
    {
      id: 2,
      type: "Text",
      friendName: "James Wright",
      title: "Text with James Wright",
      date: "2026-04-12",
    },
    {
      id: 3,
      type: "Video",
      friendName: "Priya Mehta",
      title: "Video with Priya Mehta",
      date: "2026-04-14",
    },
  ]);

  const addEntry = (type, friendName) => {
    const today = new Date().toISOString().split("T")[0];
    const newEntry = {
      id: Date.now(),
      type,
      friendName,
      title: `${type} with ${friendName}`,
      date: today,
    };
    setEntries((prev) => [newEntry, ...prev]);
  };

  return (
    <TimelineContext.Provider value={{ entries, addEntry }}>
      {children}
    </TimelineContext.Provider>
  );
};
