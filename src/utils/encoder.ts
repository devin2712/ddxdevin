export const encodeQuery = (query: string): string => {
  return btoa(query);
};

export const decodeQuery = (query: string): string => {
  return atob(query);
};