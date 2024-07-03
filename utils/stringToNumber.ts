export const hashStringToNumber = (str:string): number => {
  if (!str) return 0;
  
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return hash >>> 0;
}
