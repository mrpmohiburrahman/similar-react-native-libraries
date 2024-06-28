import { readFileSync, writeFileSync, readdirSync } from "fs";
import path from "path";
import { Library } from "../types"; // Adjust the import path according to your project structure

// Get the directory name in an ES module context
import { beautifyName } from "../utils/beautifyLibname";
import { fileURLToPath } from "url";
// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chunksFolderPath = path.join(__dirname, "..", "data", "chunks");

const readJsonFile = (filePath: string): Library[] => {
  const data = readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

const writeJsonFile = (filePath: string, data: Library[]): void => {
  writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
};

export const removeDuplicatesAndMergeCategories = async () => {
  const chunkFiles = readdirSync(chunksFolderPath).filter((file) =>
    file.endsWith(".json")
  );

  const seen = new Map<string, Library>(); // Store the first occurrence of each library
  const librariesByFile: { [key: string]: Library[] } = {};

  // Read all chunks and collect libraries
  chunkFiles.forEach((chunkFile) => {
    const filePath = path.join(chunksFolderPath, chunkFile);
    const libraries = readJsonFile(filePath);
    librariesByFile[filePath] = libraries;
  });

  // Iterate through files and libraries to find duplicates
  for (const [filePath, libraries] of Object.entries(librariesByFile)) {
    console.log(
      `🚀 ~ removeDuplicatesAndMergeCategories ~ libraries:`,
      libraries.map((item) => item.githubUrl)
    );
    console.log(
      `🚀 ~ removeDuplicatesAndMergeCategories ~ filePath:`,
      filePath
    );
    const uniqueLibraries: Library[] = [];

    libraries.forEach((library) => {
      if (!seen.has(library.githubUrl)) {
        seen.set(library.githubUrl, library);
        uniqueLibraries.push(library);
      } else {
        const firstOccurrence = seen.get(library.githubUrl)!;
        if (library.category) {
          firstOccurrence.category = firstOccurrence.category || [];
          firstOccurrence.category.push(...library.category);
          firstOccurrence.category = [...new Set(firstOccurrence.category)]; // Ensure uniqueness
        }
        console.log(
          `Library with URL ${beautifyName(
            library.githubUrl
          )} is duplicated in files: ${filePath}`
        );
      }
    });

    // Write back unique libraries to the file
    writeJsonFile(filePath, uniqueLibraries);
  }

  // Log final categories
  // for (const [githubUrl, library] of seen.entries()) {
  //   console.log(
  //     `Library with URL ${githubUrl} has final categories: ${library.category?.join(
  //       ", "
  //     )}`
  //   );
  // }
};

// Execute the function
removeDuplicatesAndMergeCategories().catch(console.error);
