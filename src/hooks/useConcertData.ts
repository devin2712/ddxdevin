// Data fetching hook to use tanstack query caching and fallback logic
// to use our static backup CSV file.

import { useQuery } from "@tanstack/react-query";

const fetchConcertDataFromUrl = async (url: string): Promise<string> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  return response.text();
};

const fetchBackupConcertData = async (): Promise<string> => {
  const response = await fetch("/docs/concerts-backup.csv");
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  return response.text();
};

const fetchConcertData = async (): Promise<string> => {
  const CONCERT_DATA_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vS7cRqq437Wt4-eWBZkbUUmO1GnCUQ-V_f4e9-VVwPS0hbD5vQDgFWzvgm16hMvDSLOtgRF8TBgRsvM/pub?gid=0&single=true&output=csv";

  try {
    return await fetchConcertDataFromUrl(CONCERT_DATA_URL);
  } catch (error) {
    console.error("Error fetching live concert data", error);
    return await fetchBackupConcertData();
  }
};

export const useConcertData = () => {
  return useQuery({
    queryKey: ["concerts", "csv-data"],
    queryFn: fetchConcertData,
  });
};
