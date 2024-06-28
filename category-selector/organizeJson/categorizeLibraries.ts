import {
  readFileSync,
  writeFileSync,
  readdirSync,
  mkdirSync,
  existsSync,
} from "fs";
import path from "path";
import { Library } from "../types"; // Adjust the import path according to your project structure

// Get the directory name in an ES module context
import { fileURLToPath } from "url";
// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chunksFolderPath = path.join(__dirname, "..", "data", "chunks");
const categoriesFolderPath = path.join(__dirname, "..", "data", "categories");

// Ensure the categories folder exists
if (!existsSync(categoriesFolderPath)) {
  mkdirSync(categoriesFolderPath);
}

const readJsonFile = (filePath: string): Library[] => {
  const data = readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

const writeJsonFile = (filePath: string, data: Library[]): void => {
  writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
};

const appendToJsonFile = (filePath: string, data: Library): void => {
  let fileData: Library[] = [];
  if (existsSync(filePath)) {
    fileData = readJsonFile(filePath);
  }
  fileData.push(data);
  writeJsonFile(filePath, fileData);
};

export const categorizeLibraries = async () => {
  const chunkFiles = readdirSync(chunksFolderPath).filter((file) =>
    file.endsWith(".json")
  );

  const categoriesSet = new Set<string>();

  // Collect all category values from each library item
  chunkFiles.forEach((chunkFile) => {
    const filePath = path.join(chunksFolderPath, chunkFile);
    const libraries = readJsonFile(filePath);

    libraries.forEach((library) => {
      if (library.category) {
        library.category.forEach((category) => categoriesSet.add(category));
      }
    });
  });

  // Create JSON files based on the collected category values
  categoriesSet.forEach((category) => {
    const categoryFilePath = path.join(
      categoriesFolderPath,
      `${category}.json`
    );
    if (!existsSync(categoryFilePath)) {
      writeJsonFile(categoryFilePath, []);
    }
  });

  // Traverse through each file in the chunks folder and copy the library items to the corresponding category JSON files
  chunkFiles.forEach((chunkFile) => {
    const filePath = path.join(chunksFolderPath, chunkFile);
    const libraries = readJsonFile(filePath);

    libraries.forEach((library) => {
      if (library.category) {
        library.category.forEach((category) => {
          const categoryFilePath = path.join(
            categoriesFolderPath,
            `${category}.json`
          );
          appendToJsonFile(categoryFilePath, library);
        });
      }
    });
  });

  console.log("Libraries categorized successfully.");
};

// Execute the function
// categorizeLibraries().catch(console.error);
