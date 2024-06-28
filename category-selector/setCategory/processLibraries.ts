import { readFileSync, writeFileSync, existsSync } from "fs";

import path from "path";
import { Library } from "../types"; // Adjust the import path according to your project structure

// Get the directory name in an ES module context
import { fileURLToPath } from "url";
// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const librariesFilePath = path.join(__dirname, "libraries.json");
const processedLibrariesFilePath = path.join(
  __dirname,
  "processedLibraries.json"
);

// Define the types
type RawItemsType = { libraries: Library[]; total: number };
type ProcessedLibrariesType = { libraries: string[] };

// Function to read JSON file
const readJsonFile = <T>(filePath: string): T => {
  const data = readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

// Function to write JSON file
const writeJsonFile = <T>(filePath: string, data: T): void => {
  writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
};

export const processLibraries = async () => {
  // Read the libraries.json file
  const rawItems: RawItemsType = readJsonFile<RawItemsType>(librariesFilePath);

  // Initialize processed libraries set
  const processedLibrariesSet = new Set<string>();

  // If processedLibraries.json exists, read it and add to the set
  if (existsSync(processedLibrariesFilePath)) {
    const processedData: ProcessedLibrariesType =
      readJsonFile<ProcessedLibrariesType>(processedLibrariesFilePath);
    processedData.libraries.forEach((library) =>
      processedLibrariesSet.add(library)
    );
  }

  // Traverse through libraries and add githubUrl to the set
  rawItems.libraries.forEach((library) => {
    processedLibrariesSet.add(library.githubUrl);
  });

  // Create a new object for processed libraries
  const processedLibraries: ProcessedLibrariesType = {
    libraries: Array.from(processedLibrariesSet),
  };

  // Write the updated processed libraries to the file
  writeJsonFile(processedLibrariesFilePath, processedLibraries);

  console.log("Processed libraries have been saved successfully.");
};

// Execute the function
// processLibraries().catch(console.error);
