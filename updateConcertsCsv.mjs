import { execSync } from "child_process";
import fs from "fs";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const csvUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS7cRqq437Wt4-eWBZkbUUmO1GnCUQ-V_f4e9-VVwPS0hbD5vQDgFWzvgm16hMvDSLOtgRF8TBgRsvM/pub?gid=0&single=true&output=csv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localCsvPath = path.join(__dirname, "public/docs", "concerts-backup.csv");

const fetchAndSaveCsv = async () => {
  try {
    const response = await fetch(csvUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.statusText}`);
    }

    const csvData = await response.text();

    // Write the new data to a temporary file first
    const tempCsvPath = path.join(
      __dirname,
      "public",
      "temp_concerts_backup.csv"
    );
    fs.writeFileSync(tempCsvPath, csvData, "utf8");

    // Once the write to the temp file is successful, rename it to the original file
    fs.renameSync(tempCsvPath, localCsvPath);
    console.log("✅ CSV file successfully fetched and overwritten.");

    // Stage the CSV file to include in the current commit
    execSync(`git add ${localCsvPath}`);
    console.log("✅ CSV file successfully staged for commit.");
  } catch (error) {
    console.error(
      "⚠️ Skipping CSV overwrite, error fetching or saving CSV file:",
      error
    );
  }
};

fetchAndSaveCsv();
