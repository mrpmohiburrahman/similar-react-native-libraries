// src/components/SearchComponent.tsx
import React, { useState, useEffect, ChangeEvent } from 'react';
import debounce from 'lodash/debounce';
import jsonData from '../../../../category-selector/data/combinedFromChunks.json'; // Adjust the path to your JSON file

interface GithubData {
  githubUrl: string;
  npmPkg: string;
  examples?: string[];
  ios?: boolean;
  android?: boolean;
  expoGo?: boolean;
  github?: {
    urls?: {
      repo?: string;
      clone?: string;
      homepage?: string;
    };
    stats?: {
      hasIssues?: boolean;
      hasWiki?: boolean;
      hasPages?: boolean;
      hasDownloads?: boolean;
      hasTopics?: boolean;
      updatedAt?: string;
      createdAt?: string;
      pushedAt?: string;
      forks?: number;
      issues?: number;
      subscribers?: number;
      stars?: number;
    };
    name?: string;
    fullName?: string;
    description?: string;
    topics?: string[];
    license?: {
      key?: string;
      name?: string;
      spdxId?: string;
      url?: string;
      id?: string;
    };
    lastRelease?: {
      name?: string;
      tagName?: string;
      createdAt?: string;
      publishedAt?: string;
      isPrerelease?: boolean;
    };
    hasTypes?: boolean;
    newArchitecture?: boolean;
  };
  images?: string[];
  npm?: {
    downloads?: number;
    weekDownloads?: number;
    start?: string;
    end?: string;
    period?: string;
  };
  score?: number;
  matchingScoreModifiers?: string[];
  popularity?: number;
  topicSearchString?: string;
  matchScore?: number;
  category?: string[];
  uniqueCategory?: string;
}

const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [result, setResult] = useState<GithubData | null>(null);

  const handleSearch = debounce((searchTerm: string) => {
    if (searchTerm) {
      const item = (jsonData as { [key: string]: GithubData })[searchTerm];
      setResult(item || null);
    } else {
      setResult(null);
    }
  }, 300);

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <input type="text" value={query} onChange={handleChange} placeholder="Enter GitHub URL" />
      {result ? (
        <div>
          <h2>{result.github.name}</h2>
          <p>{result.github.description}</p>
          {/* Display other relevant data from the JSON object as needed */}
        </div>
      ) : (
        query && <p>No results found</p>
      )}
    </div>
  );
};

export default SearchComponent;
