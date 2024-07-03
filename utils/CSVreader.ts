export interface CSVRow {
  [key: string]: string;
}

export const parseCSV = (text: string): CSVRow[] => {
  const rows = text.trim().split("\n");
  const headers = rows[0].split(",");

  const result: CSVRow[] = rows.slice(1).map((row) => {
    const values = row.split(",");
    const obj: CSVRow = {};
    headers.forEach((header, index) => {
      obj[header.trim()] = values[index]?.trim();
    });
    return obj;
  });

  return result;
};

export const getHeaders = (text: string): string[] => {
  const rows = text.trim().split("\n");
  const headers = rows[0].split(",");

  return headers;
}