import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";
import { select } from "inquirer-select-pro";
import { calculatePopularityScore } from "./calculatePopularityScore";
import { readJsonFile } from "./readJsonFile";
import { fetchGithubData } from "./fetchGithubData";
import { calculateDirectoryScore } from "./calculateDirectoryScore";
import { appendToJsonFile } from "./appendToJsonFile";

const green = "\x1b[32m";
const underline = "\x1b[4m";
const reset = "\x1b[0m";

// Get the directory name in an ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type NpmData = {
  downloads?: number;
  weekDownloads?: number;
  start?: string;
  end?: string;
  period?: string;
};

type Library = {
  goldstar?: boolean;
  githubUrl: string;
  ios?: boolean;
  android?: boolean;
  web?: boolean;
  expoGo?: boolean;
  windows?: boolean;
  macos?: boolean;
  tvos?: boolean;
  visionos?: boolean;
  unmaintained?: boolean;
  dev?: boolean;
  template?: boolean;
  newArchitecture?: boolean;
  github?: GitHubData;
  npm?: NpmData;
  score?: number;
  matchingScoreModifiers?: string[];
  topicSearchString?: string;
  examples?: string[];
  images?: string[];
  npmPkg?: string;
  nameOverride?: string;
  popularity?: number;
  matchScore?: number;
  category?: string[];
};

const GITHUB_URL_PATTERN = /^https:\/\/github\.com\/([\w-]+)\/([\w-]+)(\/.*)?$/;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchNpmData = async (npmPkg: string): Promise<NpmData> => {
  const url = `https://api.npmjs.org/downloads/point/last-month/${npmPkg}`;
  const response = await fetch(url);
  const downloadData = await response.json();

  const weekUrl = `https://api.npmjs.org/downloads/point/last-week/${npmPkg}`;
  const weekResponse = await fetch(weekUrl);
  const weekDownloadData = await weekResponse.json();

  return {
    downloads: downloadData.downloads,
    weekDownloads: weekDownloadData.downloads,
    start: downloadData.start,
    end: downloadData.end,
    period: "month",
  };
};

const fillNpmName = (library: Library): string => {
  if (!library.npmPkg) {
    const parts = library.githubUrl.split("/");
    return parts[parts.length - 1].toLowerCase();
  }
  return library.npmPkg;
};

const processLibraries = async (libraries: Library[]): Promise<void> => {
  const processedLibraries = readJsonFile(
    path.join(__dirname, "processed-libraries.json")
  );
  const setCategoryLibraries = readJsonFile(
    path.join(__dirname, "../setCategory/libraries.json")
  );

  const processedUrls = new Set(
    processedLibraries.map((lib: Library) => lib.githubUrl)
  );
  const setCategoryUrls = new Set(
    setCategoryLibraries.libraries.map((lib: Library) => lib.githubUrl)
  );

  const librariesToProcess = libraries.filter(
    (lib) =>
      !processedUrls.has(lib.githubUrl) && !setCategoryUrls.has(lib.githubUrl)
  );
  let index = 0;
  for (const lib of librariesToProcess) {
    const match = lib.githubUrl.match(GITHUB_URL_PATTERN);

    if (!match) {
      console.error(`Invalid GitHub URL: ${lib.githubUrl}`);
      continue;
    }

    const [, owner, repo] = match;
    const githubData = await fetchGithubData(owner, repo);
    // console.log(`🚀 ~ processLibraries ~ githubData:`, githubData);

    // Fill npm name if not provided
    if (!lib.npmPkg) lib.npmPkg = fillNpmName(lib);

    let npmData: NpmData = {};

    if (lib.npmPkg) {
      npmData = await fetchNpmData(lib.npmPkg);
      // console.log(`🚀 ~ processLibraries ~ npmData:`, npmData);
    }

    let data: Library = {
      ...lib,
      github: githubData,
      npm: npmData,
      topicSearchString: githubData.topics?.join(" ") ?? "",
    };

    data = calculateDirectoryScore(data);
    data = calculatePopularityScore(data);

    // Select categories based on topicSearchString
    // const topicCategories = data?.topicSearchString?.split(" ") ?? [];
    // const selectedCategories = await select({
    //   message: `Select categories for npm:${green}${underline} ${data.npmPkg}${reset} GH:${green}${underline}${data.github?.fullName}${reset} ${green}${underline}${data.githubUrl}${reset}:`,
    //   multiple: true,
    //   options: topicCategories.map((category) => ({
    //     name: category,
    //     value: category,
    //   })),
    // });

    // data.category = selectedCategories;

    console.log(`🚀 ~ processLibrary no ${index}: `, data.githubUrl);

    appendToJsonFile(path.join(__dirname, "processed-libraries.json"), data);
    index++;
    await sleep(300); // Rate limiting
  }
};

export const updateLibraryData = async (): Promise<void> => {
  const reactNativeLibraries = readJsonFile(
    path.join(__dirname, "../react-native-libraries.json")
  );
  await processLibraries(reactNativeLibraries);
  console.log("Data processing complete.");
};

// Example usage
updateLibraryData().catch(console.error);
