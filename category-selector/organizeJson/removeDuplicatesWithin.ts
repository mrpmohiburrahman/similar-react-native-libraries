import { readFileSync, writeFileSync, readdirSync } from "fs";
import path from "path";
import { Library } from "../types"; // Adjust the import path according to your project structure

// Get the directory name in an ES module context
import { fileURLToPath } from "url";
import { beautifyName } from "../utils/beautifyLibname";
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

export const ensureUniqueItems = () => {
  const chunkFiles = readdirSync(chunksFolderPath).filter((file) =>
    file.endsWith(".json")
  );

  chunkFiles.forEach((chunkFile) => {
    const filePath = path.join(chunksFolderPath, chunkFile);
    const libraries = readJsonFile(filePath);
    const seen = new Set<string>();
    const uniqueLibraries: Library[] = [];
    const duplicateLibraries: Library[] = [];

    libraries.forEach((library) => {
      if (!seen.has(library.githubUrl)) {
        seen.add(library.githubUrl);
        uniqueLibraries.push(library);
      } else {
        duplicateLibraries.push(library);
      }
    });

    writeJsonFile(filePath, uniqueLibraries);

    // Log duplicates
    if (duplicateLibraries.length > 0) {
      console.log(
        `File ${beautifyName(chunkFile)} has ${beautifyName(
          duplicateLibraries.length.toString()
        )} duplicates:`
      );
      duplicateLibraries.forEach((dup) =>
        console.log(
          `  Duplicate library with URL ${beautifyName(dup.githubUrl)}`
        )
      );
    }
  });
};

