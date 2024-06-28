import { select } from "inquirer-select-pro";
import { Library } from "../types";
import { fetchCategoryData } from "./fetchCategoryData";
const green = "\x1b[32m";
const underline = "\x1b[4m";
const reset = "\x1b[0m";
export async function selectLibrariesForCategory(
  category: string
): Promise<Library[]> {
  const categoryData = await fetchCategoryData(category);
  if (categoryData.libraries.length > 0) {
    const selectedLibraries = await select({
      message: `Select libraries for the category ${green}${underline}${category}${reset}:`,
      multiple: true,
      options: categoryData.libraries.map((lib) => ({
        name: `${reset}${green}${underline}${
          lib.npmPkg || "Unknown"
        }${reset} -- ${lib.githubUrl}`,
        value: lib,
      })),
    });

    selectedLibraries.forEach((lib: Library) => {
      lib.category = lib.category || [];
      if (!lib.category.includes(category)) {
        lib.category.push(category);
      }
      lib.category = [...new Set(lib.category)]; // Ensure uniqueness
    });

    return selectedLibraries;
  } else {
    console.log(`No libraries found for category ${category}`);
    return [];
  }
}
