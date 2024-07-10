import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import simpleGit from 'simple-git';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataDir = join(__dirname, '../category-selector/data');
const metadataPath = join(__dirname, '../category-selector/data/metadata.json');
const git = simpleGit();

const getLastCommitDate = async () => {
  const log = await git.log();
  return log.latest.date;
};

const getNumLibraries = async () => {
  const combinedChunksPath = join(dataDir, 'combinedFromChunks.json');
  const data = await fs.readFile(combinedChunksPath, 'utf8');
  const jsonData = JSON.parse(data);
  return Object.keys(jsonData).length;
};

const generateMetadata = async () => {
  try {
    const lastUpdated = await getLastCommitDate();
    const numLibraries = await getNumLibraries();

    const metadata = {
      lastUpdated,
      numLibraries,
    };

    await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2), 'utf8');
    console.log('Successfully generated metadata.json');
  } catch (error) {
    console.error('Error generating metadata:', error);
  }
};

generateMetadata();
