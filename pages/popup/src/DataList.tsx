// src/DataList.tsx
import React, { useEffect, useState } from 'react';

const DataList: React.FC = () => {
  const [data, setData] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    chrome.storage.local.get(['categoryData'], result => {
      setData(result.categoryData || {});
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ul className="space-y-2">
      {Object.keys(data).map(key => (
        <li key={key} className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
          {key}
        </li>
      ))}
    </ul>
  );
};

export default DataList;
