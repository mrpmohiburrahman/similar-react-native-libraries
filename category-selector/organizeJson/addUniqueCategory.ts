import * as fs from "fs";
import * as path from "path";
import { Library } from "../types";
import { fileURLToPath } from "url";
import autocomplete from "inquirer-autocomplete-standalone";

const green = "\x1b[32m";
const underline = "\x1b[4m";
const reset = "\x1b[0m";

// Helper function to get __dirname in ES module scope
const getDirName = (metaUrl: string) => {
  const __filename = fileURLToPath(metaUrl);
  return path.dirname(__filename);
};

// Define a type for the table rows
type TableRow = {
  [key: string]: string;
};

// Function to format and print options in columns using console.table
const printColumns = (options: string[], columns: number) => {
  const rows = Math.ceil(options.length / columns);
  const table: TableRow[] = [];

  for (let i = 0; i < rows; i++) {
    const row: TableRow = {};
    for (let j = 0; j < columns; j++) {
      const index = i + j * rows;
      if (index < options.length) {
        row[`Column ${j + 1}`] = options[index];
      } else {
        row[`Column ${j + 1}`] = "";
      }
    }
    table.push(row);
  }

  console.table(table);
};

// Main function to process libraries and add unique category
export const addUniqueCategory = async () => {
  // @ts-ignore
  const __dirname = getDirName(import.meta.url);

  const combinedFileName = "combinedFromChunks.json";
  const combinedFilePath = path.join(__dirname, "..", "data", combinedFileName);
  const rawData = fs.readFileSync(combinedFilePath, "utf-8");
  const libraries: { [key: string]: Library } = JSON.parse(rawData);

  const uniqueCategoryFileName = "uniqueCategoryToLib.json";
  const uniqueCategoryFilePath = path.join(
    __dirname,
    "..",
    "data",
    uniqueCategoryFileName
  );

  let uniqueCategories: { [key: string]: string[] } = {};

  // Read existing unique categories file if it exists
  if (fs.existsSync(uniqueCategoryFilePath)) {
    const uniqueCategoryData = fs.readFileSync(uniqueCategoryFilePath, "utf-8");
    uniqueCategories = JSON.parse(uniqueCategoryData);
  }

  const libraryUrls = Object.keys(libraries);
  for (let i = 0; i < libraryUrls.length; i++) {
    const githubUrl = libraryUrls[i];
    const library = libraries[githubUrl];

    // Skip if the library already has a uniqueCategory
    if (library.uniqueCategory) {
      console.log(
        `Skipping library ${underline}${i + 1}/${
          libraryUrls.length
        }${reset} ${green}${underline}${githubUrl}${reset} as it already has a unique category: ${green}${underline}${
          library.uniqueCategory
        }${reset}`
      );
      continue;
    }

    const existingCategories = Object.keys(uniqueCategories);
    // Print existing categories in n columns
    console.log("Existing Categories:");
    printColumns(existingCategories, 5);

    console.log(`Library ${underline}${i + 1}/${libraryUrls.length}${reset}:`);
    console.log(`GitHub URL: ${green}${underline}${githubUrl}${reset}`);
    console.log(
      `Current Categories:${underline} ${
        library.category?.join(", ") || "None"
      }${reset}`
    );

    const answer = await autocomplete({
      message:
        "Enter a unique category for this library (or type 'Skip' to skip):",
      source: async (input: string | undefined) => {
        input = input || "";
        const filteredCategories = existingCategories.filter((category) =>
          category.toLowerCase().includes(input.toLowerCase())
        );
        if (filteredCategories.length === 0 && input) {
          return [{ value: input, name: `Add new option: "${input}"` }];
        }
        return [
          { value: "Skip", name: "Skip" },
          ...filteredCategories.map((category) => ({
            value: category,
            name: category,
          })),
        ];
      },
    });

    const uniqueCategory =
      answer === "Skip"
        ? "Skip"
        : answer.startsWith("Add new option:")
        ? answer.match(/Add new option: "(.*)"/)[1]
        : answer;

    if (uniqueCategory === "Skip") {
      console.log(
        `Skipping library ${underline}${i + 1}/${
          libraryUrls.length
        }${reset}: ${underline}${githubUrl}${reset}`
      );
      continue;
    }

    console.log(`🚀 ~ addUniqueCategory ~ answer:`, answer);
    // If the category is not in the existing categories, add it as a new unique category
    if (!uniqueCategories[uniqueCategory]) {
      uniqueCategories[uniqueCategory] = [];
    }
    uniqueCategories[uniqueCategory].push(githubUrl);

    library["uniqueCategory"] = uniqueCategory;

    // Write updated unique categories to uniqueCategoryToLib.json
    fs.writeFileSync(
      uniqueCategoryFilePath,
      JSON.stringify(uniqueCategories, null, 2)
    );

    // Write updated library object to combinedFromChunks.json
    fs.writeFileSync(combinedFilePath, JSON.stringify(libraries, null, 2));

    console.log(
      `Added unique category: ${green}${underline}${uniqueCategory}${reset}`
    );
    console.log("-------------------------------------");
  }

  console.log("All libraries have been updated with unique categories.");
};

// Example usage
// addUniqueCategory();
