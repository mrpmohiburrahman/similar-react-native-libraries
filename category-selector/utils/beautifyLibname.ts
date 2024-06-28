// import { green, reset, underline } from "../setCategory/setCategory";
const green = "\x1b[32m";
const underline = "\x1b[4m";
const reset = "\x1b[0m";
export const beautifyName = (name: string) =>
  `${green}${underline}${name}${reset}`;
