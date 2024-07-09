const fs = require('fs');
const path = require('path');
const simpleGit = require('simple-git');
const dataDir = path.join(__dirname, '../../../category-selector/data');
const metadataPath = path.join(__dirname, '../../../category-selector/data/metadata.json');
const git = simpleGit();

const getLastCommitDate = async () => {
  const log = await git.log();
  return log.latest.date;
};

const getNumLibraries = async () => {
  const combinedChunksPath = path.join(dataDir, 'combinedFromChunks.json');
  const data = await fs.promises.readFile(combinedChunksPath, 'utf8');
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

    await fs.promises.writeFile(metadataPath, JSON.stringify(metadata, null, 2), 'utf8');
    console.log('Successfully generated metadata.json');
  } catch (error) {
    console.error('Error generating metadata:', error);
  }
};

generateMetadata();
