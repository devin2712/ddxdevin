// Encode query to Base64
export const encodeQuery = (query: string): string => {
  return btoa(query);
};

// Decode query from Base64
export const decodeQuery = (query: string): string => {
  return atob(query);
};
