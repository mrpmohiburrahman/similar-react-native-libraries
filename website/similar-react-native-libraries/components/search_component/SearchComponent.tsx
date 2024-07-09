import React, { useState, useEffect, ChangeEvent } from 'react';
import debounce from 'lodash/debounce';
import combinedData from '../../../../category-selector/data/combinedFromChunks.json'; // Adjust the path to your JSON file
import categoryData from '../../../../category-selector/data/uniqueCategoryToLib.json'; // Adjust the path to your JSON file
import styles from './SearchComponent.module.css'; // Assuming styles are imported

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
  const [results, setResults] = useState<GithubData[]>([]);

  const handleSearch = debounce((searchTerm: string) => {
    if (searchTerm) {
      const item = (combinedData as { [key: string]: GithubData })[searchTerm];
      if (item) {
        const uniqueCategory = item.uniqueCategory;
        const relatedLibs = (categoryData as { [key: string]: string[] })[uniqueCategory];
        if (relatedLibs) {
          const fetchedResults = relatedLibs
            .map(libUrl => (combinedData as { [key: string]: GithubData })[libUrl])
            .filter(Boolean) as GithubData[];
          setResults(fetchedResults);
        } else {
          setResults([]);
        }
      } else {
        setResults([]);
      }
    } else {
      setResults([]);
    }
  }, 300);

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Enter GitHub URL"
        className={styles.searchInput}
      />
      <div className={styles.resultsContainer}>
        {results.length > 0 ? (
          results.map(result => (
            <div key={result.githubUrl} className={styles.resultItem}>
              <h2>
                <a href={result.github?.urls?.repo} target="_blank" rel="noopener noreferrer">
                  {result.github?.name}
                </a>
              </h2>
              <p>{result.github?.description}</p>
              {/* Display other relevant data from the JSON object as needed */}
            </div>
          ))
        ) : (
          <div className={styles.noResultsSpace}>{query && <p>No results found</p>}</div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
