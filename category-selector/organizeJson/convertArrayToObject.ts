import * as fs from "fs";
import * as path from "path";
import { Library } from "../types"; // Adjust the import path as needed
import { fileURLToPath } from "url";

// Helper function to get __dirname in ES module scope
const getDirName = (metaUrl: string) => {
  const __filename = fileURLToPath(metaUrl);
  return path.dirname(__filename);
};

// Main function to convert array to object
export const convertArrayToObject = async () => {
  // @ts-ignore
  const __dirname = getDirName(import.meta.url);

  const inputFileName = "combinedFromChunks.json"; // Name of your input file
  const inputFilePath = path.join(__dirname, "..", "data", inputFileName);
  const rawData = fs.readFileSync(inputFilePath, "utf-8");
  const libraries: Library[] = JSON.parse(rawData);

  const outputFileName = "librariesObject.json"; // Name of your output file
  const outputFilePath = path.join(__dirname, "..", "data", outputFileName);

  const librariesObject = libraries.reduce((acc, library) => {
    if (library.githubUrl) {
      acc[library.githubUrl] = library;
    }
    return acc;
  }, {} as { [key: string]: Library });

  fs.writeFileSync(outputFilePath, JSON.stringify(librariesObject, null, 2));

  console.log(`Converted array to object and saved to ${outputFileName}`);
};

// Example usage
// convertArrayToObject();
