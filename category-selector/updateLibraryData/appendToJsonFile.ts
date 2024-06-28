import { Library } from "../types";
import { readJsonFile } from "./readJsonFile";

import fs from "fs";
export const appendToJsonFile = (filePath: string, data: Library): void => {
  const fileData = readJsonFile(filePath);
  fileData.push(data);
  fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));
};
