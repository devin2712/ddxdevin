export interface CSVRow {
  [key: string]: string;
}

export const parseCSV = (text: string): CSVRow[] => {
  const rows = text.trim().split("\n");
  const headers = rows[0].split(",").map((header) => header.trim());

  const result: CSVRow[] = rows.slice(1).map((row) => {
    const values: string[] = [];
    let current = "";
    let inQuotes = false;

    for (const char of row) {
      if (char === '"' && inQuotes) {
        inQuotes = false;
      } else if (char === '"' && !inQuotes) {
        inQuotes = true;
      } else if (char === "," && !inQuotes) {
        values.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    const obj: CSVRow = {};
    headers.forEach((header, index) => {
      obj[header] = values[index] || "";
    });

    return obj;
  });

  return result;
};

export const getHeaders = (text: string): string[] => {
  const rows = text.trim().split("\n");
  const headers = rows[0].split(",").map((header) => header.trim());

  return headers;
};