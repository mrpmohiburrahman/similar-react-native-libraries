// src/popup.tsx
import React, { useEffect, useState } from 'react';
import '@src/Popup.css';
import { Library } from './types';
import { format } from 'timeago.js';
const siteLink = 'https://mrpmohiburrahman.github.io/similar-react-native-libraries/';
const metadataCDN_Url =
  'https://cdn.jsdelivr.net/gh/mrpmohiburrahman/similar-react-native-libraries@main/category-selector/data/metadata.json';

const MatchedItemsList: React.FC<{ lastUpdated: string; numLibraries: number; siteLink: string }> = ({
  lastUpdated,
  numLibraries,
  siteLink,
}) => {
  const [items, setItems] = useState<Library[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs[0].id !== undefined) {
        chrome.runtime.sendMessage({ type: 'getMatchedItems', tabId: tabs[0].id }, (response: Library[]) => {
          setItems(response || []);
          setLoading(false);
        });
      }
    });
  }, []);

  const openAllLinks = () => {
    items.forEach(item => {
      if (item.githubUrl) {
        chrome.tabs.create({ url: item.githubUrl });
      }
    });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (items.length === 0) {
    return <div className="no-items">No matched items found.</div>;
  }

  return (
    <>
      <div className="info-button-container">
        <div className="additional-info">
          <p>{lastUpdated}</p>
          <p>
            Number of Sorted Libraries:<strong> {numLibraries}</strong>
          </p>
        </div>
        <button className="visit-site-button" onClick={() => window.open(siteLink, '_blank')}>
          Visit Site
        </button>
      </div>
      <div className="header-button-container">
        <h1 className="text-xl">Matched Libraries</h1>
        <button className="open-all-button" onClick={openAllLinks}>
          Open All Links
        </button>
      </div>
      <div className="item-list">
        {items.map((item, index) => (
          <a href={item.githubUrl} target="_blank" rel="noopener noreferrer" key={index} className="item-link">
            <div className="item-card">
              <div className="item-header">
                <span className="npm-pkg">{item.npmPkg || 'No NPM Package'}</span>
                {item.goldstar && <span className="gold-star">Recommended</span>}
              </div>
              <div className="item-body">
                {item.matchingScoreModifiers && item.matchingScoreModifiers.length > 0 && (
                  <div className="tags">
                    {item.matchingScoreModifiers.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
};
const renderLastUpdatedMessage = (message: string) => {
  const parts = message.split('Last updated: ');
  if (parts.length > 1) {
    return (
      <p>
        Last updated: <strong>{parts[1]}</strong>
      </p>
    );
  }
  return <p>{message}</p>;
};

const Popup: React.FC = () => {
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [numLibraries, setNumLibraries] = useState<number>(0);

  useEffect(() => {
    fetch(metadataCDN_Url)
      .then(response => response.json())
      .then(data => {
        setLastUpdated(`Last updated: ${format(new Date(data.lastUpdated))}`);
        setNumLibraries(data.numLibraries);
      })
      .catch(error => console.error('Error fetching metadata:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <MatchedItemsList
          lastUpdated={renderLastUpdatedMessage(lastUpdated)}
          numLibraries={numLibraries}
          siteLink={siteLink}
        />
      </header>
    </div>
  );
};

export default Popup;
