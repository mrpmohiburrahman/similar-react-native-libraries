import { existsSync, readFileSync } from "fs";

import path from "path";
import { fileURLToPath } from "url";
// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const processedFilePath = path.join(
  __dirname,
  "processedLibraries.json"
);
export function loadProcessedLibraries(): Set<string> {
  if (existsSync(processedFilePath)) {
    const processedData: { libraries: string[] } = JSON.parse(
      readFileSync(processedFilePath, "utf8")
    );
    return new Set(processedData.libraries);
  }
  return new Set();
}
