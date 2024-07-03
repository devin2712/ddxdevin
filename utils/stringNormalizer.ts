export const normalizeString = (str: string): string => {
  return str
    .normalize("NFD") // Normalize Unicode characters
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
    .replace(/\s+/g, " ") // Normalize spaces
    .trim() // Remove leading and trailing spaces
    .toLowerCase(); // Convert to lowercase
};
