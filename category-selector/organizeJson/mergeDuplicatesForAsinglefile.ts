import * as fs from "fs";
import * as path from "path";
import { Library } from "../types";
import { fileURLToPath } from "url";

// Helper function to get __dirname in ES module scope
const getDirName = (metaUrl: string) => {
  const __filename = fileURLToPath(metaUrl);
  return path.dirname(__filename);
};

// Main function to process libraries
export const mergeDuplicatesForASingleFile = () => {
  // @ts-ignore
  const __dirname = getDirName(import.meta.url);

  const fileName = "combinedFromChunks.json";
  const filePath = path.join(__dirname, "..", "data", fileName);
  const rawData = fs.readFileSync(filePath, "utf-8");
  const libraries: Library[] = JSON.parse(rawData);

  const libraryMap: { [key: string]: Library } = {};
  const duplicateLibraries: string[] = [];

  libraries.forEach((library) => {
    if (libraryMap[library.githubUrl]) {
      console.log(`existing library found === `, library.githubUrl);

      // Existing library found, merge categories
      duplicateLibraries.push(library.githubUrl);
      const existingLibrary = libraryMap[library.githubUrl];
      if (library.category) {
        if (!existingLibrary.category) {
          existingLibrary.category = [];
        }
        existingLibrary.category = [
          ...new Set([...existingLibrary.category, ...library.category]),
        ];
      }
    } else {
      // New library, add to map
      libraryMap[library.githubUrl] = library;
    }
  });

  const uniqueLibraries = Object.values(libraryMap);

  fs.writeFileSync(filePath, JSON.stringify(uniqueLibraries, null, 2));

  console.log("Duplicates found in the following libraries:");
  duplicateLibraries.forEach((library) => console.log(library));

  console.log("Processing complete.");
};

// Example usage
// mergeDuplicatesForASingleFile();
