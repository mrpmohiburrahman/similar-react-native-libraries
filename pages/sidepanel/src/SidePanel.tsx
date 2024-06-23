// src/SidePanel.tsx
import { useStorageSuspense, withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';
import React, { useEffect, useState } from 'react';
import '@src/SidePanel.css';
import { exampleThemeStorage } from '@chrome-extension-boilerplate/storage';

const MatchedItemsList: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    chrome.storage.local.get(['matchedItems'], result => {
      setItems(result.matchedItems || []);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (items.length === 0) {
    return <div>No matched items found.</div>;
  }

  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
          <a href={item} target="_blank" rel="noopener noreferrer">
            {item}
          </a>
        </li>
      ))}
    </ul>
  );
};

const SidePanel: React.FC = () => {
  const theme = useStorageSuspense(exampleThemeStorage);

  return (
    <div
      className="App p-4"
      style={{
        backgroundColor: theme === 'light' ? '#eee' : '#222',
        color: theme === 'light' ? '#222' : '#eee',
      }}>
      {/* <header className="App-header mb-4">
        <img src={chrome.runtime.getURL('sidepanel/logo.svg')} className="App-logo" alt="logo" />
        <h1 className="text-xl">Matched Libraries</h1>
      </header> */}
      <MatchedItemsList />
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div>Loading...</div>), <div>Error Occurred</div>);
