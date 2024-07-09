import React, { useState, useEffect, useRef, ChangeEvent, KeyboardEvent, MouseEvent } from 'react';
import combinedData from '../../../../category-selector/data/combinedFromChunks.json'; // Adjust the path to your JSON file
import categoryData from '../../../../category-selector/data/uniqueCategoryToLib.json'; // Adjust the path to your JSON file
import styles from './SearchComponent.module.css';

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
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(0);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    inputRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const fetchResults = (searchTerm: string) => {
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
    setHasSearched(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setActiveSuggestionIndex(0);

    if (value) {
      setShowSuggestions(true);
      const filteredSuggestions = Object.keys(combinedData).filter(key =>
        key.toLowerCase().includes(value.toLowerCase()),
      );
      setSuggestions(filteredSuggestions);
    } else {
      setShowSuggestions(false);
      setResults([]);
      setHasSearched(false);
    }
  };

  const handleKeyDownInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setActiveSuggestionIndex(prevIndex => (prevIndex + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      setActiveSuggestionIndex(prevIndex => (prevIndex - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter') {
      if (suggestions.length > 0) {
        const selectedSuggestion = suggestions[activeSuggestionIndex];
        setQuery(selectedSuggestion);
        setShowSuggestions(false);
        fetchResults(selectedSuggestion);
      }
    }
  };

  const handleSuggestionClick = (e: MouseEvent<HTMLDivElement>) => {
    const selectedSuggestion = e.currentTarget.innerText;
    setQuery(selectedSuggestion);
    setShowSuggestions(false);
    fetchResults(selectedSuggestion);
  };

  const handleOpenAllLinks = () => {
    resultRefs.current.forEach(ref => {
      if (ref) {
        ref.click();
      }
    });
  };

  const checkPopupPermissions = async () => {
    try {
      const popupWindow = window.open('', '_blank');
      if (popupWindow) {
        popupWindow.close();
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const handleButtonClick = async () => {
    const hasPermission = await checkPopupPermissions();
    if (hasPermission) {
      handleOpenAllLinks();
    } else {
      alert('Please allow popups and redirects for this site in your browser settings.');
    }
  };

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDownInput}
        placeholder="Enter GitHub URL"
        className={styles.searchInput}
      />
      {hasSearched && results.length > 0 && (
        <button onClick={handleButtonClick} className={styles.openAllButton}>
          Open All Links
        </button>
      )}
      {showSuggestions && suggestions.length > 0 && (
        <div className={styles.suggestionsContainer}>
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion}
              className={`${styles.suggestionItem} ${index === activeSuggestionIndex ? styles.active : ''}`}
              onClick={handleSuggestionClick}>
              {suggestion}
            </div>
          ))}
        </div>
      )}
      <div className={styles.resultsContainer}>
        {hasSearched && results.length > 0
          ? results.map((result, index) => (
              <div key={result.githubUrl} className={styles.resultItem}>
                <h2>
                  <a
                    href={result.github?.urls?.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    ref={el => (resultRefs.current[index] = el)}>
                    {result.github?.name}
                  </a>
                </h2>
                <p>{result.github?.description}</p>
              </div>
            ))
          : hasSearched && (
              <div className={styles.noResultsSpace}>
                <p>No results found</p>
              </div>
            )}
      </div>
    </div>
  );
};

export default SearchComponent;
