import React, { useState, useEffect } from 'react';
import { format } from 'timeago.js';
import metadata from '../../../../category-selector/data/metadata.json';
import styles from './Header.module.css';

const Header = () => {
  const [lastUpdated, setLastUpdated] = useState('');
  const [numLibraries, setNumLibraries] = useState(0);

  useEffect(() => {
    setNumLibraries(metadata.numLibraries);

    const fetchLastUpdated = () => {
      try {
        if (metadata && metadata.lastUpdated) {
          const lastUpdatedDate = new Date(metadata.lastUpdated);
          const formattedDate = format(lastUpdatedDate);
          setLastUpdated(`Last updated: ${formattedDate}`);
        }
      } catch (error) {
        console.error('Failed to fetch last updated date:', error);
      }
    };

    fetchLastUpdated();
  }, []);

  const renderLastUpdatedMessage = (message: string) => {
    const parts = message.split('Last updated: ');
    if (parts.length > 1) {
      return (
        <span>
          Last updated: <strong>{parts[1]}</strong>
        </span>
      );
    }
    return <p>{message}</p>;
  };
  return (
    <div className={styles.header}>
      <div className={styles.info}>
        {lastUpdated ? renderLastUpdatedMessage(lastUpdated) : <span>Loading last updated date...</span>}
        <span>
          Number Of Sorted Libraries: <strong>{numLibraries}</strong>
        </span>
      </div>
    </div>
  );
};

export default Header;
