import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { octokit } from "../updateLibraryData/octokit";

// Helper function to get __dirname in ES module scope
const getDirName = (metaUrl: string) => {
  const __filename = fileURLToPath(metaUrl);
  return path.dirname(__filename);
};

// Define the type of the JSON structure
interface RepoDetails {
  githubUrl: string;
  [key: string]: any;
}

interface Repos {
  [key: string]: RepoDetails;
}

// Function to check if a repository is archived
const isRepoArchived = async (repoUrl: string): Promise<boolean> => {
  try {
    const repoApiUrl = repoUrl.replace("https://github.com/", "");
    const [owner, repo] = repoApiUrl.split("/");
    const response = await octokit.repos.get({ owner, repo });
    return response.data.archived;
  } catch (error) {
    console.error(`Error fetching data for ${repoUrl}:`, error.message);
    return false;
  }
};

// Main function to execute the cleaning process
export const removeArchivedReposFromCombinedJson = async () => {
  // @ts-ignore
  const __dirname = getDirName(import.meta.url);

  const combinedFileName = "combinedFromChunks.json";
  const combinedFilePath = path.join(__dirname, "..", "data", combinedFileName);

  let rawData = fs.readFileSync(combinedFilePath, "utf-8");
  let jsonData = JSON.parse(rawData) as Repos;

  const totalLibraries = Object.keys(jsonData).length;
  let currentLibraryNumber = 0;

  for (const [key, value] of Object.entries(jsonData)) {
    currentLibraryNumber++;
    console.log(
      `Processing repository: ${currentLibraryNumber}/${totalLibraries}`
    );

    const archived = await isRepoArchived(key);
    if (archived) {
      console.log(`Removing archived repository: ${key}`);
      delete jsonData[key];

      // Write the updated JSON data to the file immediately
      fs.writeFileSync(combinedFilePath, JSON.stringify(jsonData, null, 2));

      // Reload the JSON file
      rawData = fs.readFileSync(combinedFilePath, "utf-8");
      jsonData = JSON.parse(rawData) as Repos;
    }
  }

  console.log("Cleaning process completed.");
};
