import { readFileSync, writeFileSync, readdirSync } from "fs";

import path from "path";
import { Library } from "../types"; // Adjust the import path according to your project structure

// Get the directory name in an ES module context
import { fileURLToPath } from "url";
// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chunksFolderPath = path.join(__dirname, "chunks");

const readJsonFile = (filePath: string): Library[] => {
  const data = readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

const writeJsonFile = (filePath: string, data: Library[]): void => {
  writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
};

export const removeDuplicates = async () => {
  const chunkFiles = readdirSync(chunksFolderPath).filter((file) =>
    file.endsWith(".json")
  );

  const seen = new Map<string, string>(); // Store the first occurrence of each library
  const duplicates: { [key: string]: string[] } = {}; // Track duplicates and their files
  const librariesByFile: { [key: string]: Library[] } = {};

  // Read all chunks and collect libraries
  chunkFiles.forEach((chunkFile) => {
    const filePath = path.join(chunksFolderPath, chunkFile);
    const libraries = readJsonFile(filePath);
    librariesByFile[filePath] = libraries;
  });

  // Iterate through files and libraries to find duplicates
  for (const [filePath, libraries] of Object.entries(librariesByFile)) {
    const uniqueLibraries: Library[] = [];

    libraries.forEach((library) => {
      if (!seen.has(library.githubUrl)) {
        seen.set(library.githubUrl, filePath);
        uniqueLibraries.push(library);
      } else {
        const firstOccurrence = seen.get(library.githubUrl)!;
        if (!duplicates[library.githubUrl]) {
          duplicates[library.githubUrl] = [firstOccurrence];
        }
        duplicates[library.githubUrl].push(filePath);
      }
    });

    // Write back unique libraries to the file
    writeJsonFile(filePath, uniqueLibraries);
  }

  // Log duplicates
  for (const [githubUrl, files] of Object.entries(duplicates)) {
    console.log(
      `Library with URL ${githubUrl} has duplicates in files: ${files.join(
        ", "
      )}`
    );
  }
};

// Execute the function
// removeDuplicates().catch(console.error);
