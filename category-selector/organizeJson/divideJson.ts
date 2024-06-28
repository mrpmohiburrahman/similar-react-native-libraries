import fs from "fs";
import path from "path";
import { Library } from "../types";

import { fileURLToPath } from "url";
// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to split array into chunks of specified size
const chunkArray = <T>(array: T[], chunkSize: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

// Function to split large JSON file into chunks and save them
export const splitJsonFileIntoChunks = (
  inputFilePath: string = path.join(
    __dirname,
    "..",
    "data",
    "combinedFromChunks.json"
  ),
  outputDir: string = path.join(__dirname, "..", "data", "chunks"),
  chunkSize: number = 50
): void => {
  // Read the large JSON file
  const jsonData: Library[] = JSON.parse(
    fs.readFileSync(inputFilePath, "utf8")
  );

  // Split the JSON data into chunks
  const chunks = chunkArray(jsonData, chunkSize);

  // Create the output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  // Write each chunk to a new file
  chunks.forEach((chunk, index) => {
    const chunkFileName = `chunk_${index + 1}.json`;
    const chunkFilePath = path.join(outputDir, chunkFileName);
    fs.writeFileSync(chunkFilePath, JSON.stringify(chunk, null, 2), "utf8");
    console.log(`Created ${chunkFileName}`);
  });

  console.log("Done splitting the large JSON file into smaller chunks.");
};

// Example usage (uncomment the following lines to use as a standalone script):
// const inputFilePath = path.join(__dirname, 'largeFile.json');
// const outputDir = path.join(__dirname, 'chunks');
// splitJsonFileIntoChunks(inputFilePath, outputDir);
