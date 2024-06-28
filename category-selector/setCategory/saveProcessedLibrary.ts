import { writeFileSync } from "fs";
import {
  loadProcessedLibraries,
  processedFilePath,
} from "./loadProcessedLibraries";

export function saveProcessedLibrary(githubUrl: string) {
  const processedLibraries = loadProcessedLibraries();
  processedLibraries.add(githubUrl);
  writeFileSync(
    processedFilePath,
    JSON.stringify({ libraries: Array.from(processedLibraries) }, null, 2)
  );
}
