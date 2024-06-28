import { selectLibrariesForCategory } from "./selectLibrariesForCategory";
import { writeFileSync } from "fs";
import { raw_items_types } from "./setCategory";
import { Library } from "../types";

export const fetchAndSelectLibraries = async (
  selectedCategories: string[],
  rawItems: raw_items_types,
  filePath: string
) => {
  for (const category of selectedCategories) {
    const selectedLibraries = await selectLibrariesForCategory(category);

    // Find the selected libraries in the main JSON and update them
    selectedLibraries.forEach((selectedLib) => {
      const existingLibIndex = rawItems.libraries.findIndex(
        (lib: Library) => lib.githubUrl === selectedLib.githubUrl
      );

      if (existingLibIndex !== -1) {
        rawItems.libraries[existingLibIndex] = selectedLib;
      } else {
        rawItems.libraries.push(selectedLib);
      }
    });

    writeFileSync(filePath, JSON.stringify(rawItems, null, 2));
    console.log(`Libraries updated for category ${category}`);
  }
};

export default fetchAndSelectLibraries;
