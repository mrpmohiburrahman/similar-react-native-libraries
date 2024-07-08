import 'webextension-polyfill';
import { exampleThemeStorage } from '@chrome-extension-boilerplate/storage';
import { Library, UniqueCategoryData } from './types';

exampleThemeStorage.get().then(theme => {
  console.log('theme', theme);
});

console.log('background loaded');

async function fetchJsonData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

async function fetchDataAndStore() {
  try {
    const combinedData: Record<string, Library> = await fetchJsonData(
      'https://cdn.jsdelivr.net/gh/mrpmohiburrahman/similar-react-native-libraries@main/category-selector/data/combinedFromChunks.json',
    );
    const uniqueCategoryData: UniqueCategoryData = await fetchJsonData(
      'https://cdn.jsdelivr.net/gh/mrpmohiburrahman/similar-react-native-libraries@main/category-selector/data/uniqueCategoryToLib.json',
    );

    // Store data in local storage
    chrome.storage.local.set({
      combinedData,
      uniqueCategoryData,
    });

    console.log('Fetched and stored combined and unique category data');
  } catch (error) {
    console.error('Error fetching data from CDN:', error);
  }
}

// Fetch data initially and then periodically (every 24 hours)
fetchDataAndStore();
setInterval(fetchDataAndStore, 24 * 60 * 60 * 1000);

function updateBadgeAndStorage(
  tabId: number,
  tabUrl: string | undefined,
  combinedData: Record<string, Library>,
  uniqueCategoryData: UniqueCategoryData,
) {
  if (!tabUrl) {
    console.log('No URL for the current tab');
    chrome.action.setBadgeText({ text: '', tabId: tabId });
    return;
  }

  // Check if GitHub URL matches any key in combinedData
  const matchedKey = Object.keys(combinedData).find(key => tabUrl.includes(key));
  if (matchedKey) {
    const library: Library = combinedData[matchedKey];
    const uniqueCategory = library.uniqueCategory;

    console.log(`Matched GitHub URL: ${tabUrl}, uniqueCategory: ${uniqueCategory}`);

    if (uniqueCategory) {
      // Check if uniqueCategory matches any key in uniqueCategoryData
      const matchedUrls = uniqueCategoryData[uniqueCategory];
      if (matchedUrls) {
        const matchedItems = matchedUrls
          .map(url => Object.values(combinedData).find(lib => lib.githubUrl === url))
          .filter((item): item is Library => item !== undefined);

        // Set badge text
        chrome.action.setBadgeText({ text: matchedItems.length.toString(), tabId: tabId });

        // Store matched items for this tab
        chrome.storage.local.set({ [`matchedItems_${tabId}`]: matchedItems });

        console.log(`Found ${matchedItems.length} items for uniqueCategory: ${uniqueCategory}`);
      } else {
        console.log(`No items found for uniqueCategory: ${uniqueCategory}`);
        chrome.action.setBadgeText({ text: '', tabId: tabId });
      }
    }
  } else {
    console.log('No match found for current GitHub URL');
    chrome.action.setBadgeText({ text: '', tabId: tabId });
  }
}

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url?.includes('github.com')) {
    chrome.storage.local.get(['combinedData', 'uniqueCategoryData'], result => {
      const combinedData: Record<string, Library> = result.combinedData;
      const uniqueCategoryData: UniqueCategoryData = result.uniqueCategoryData;

      if (!combinedData || !uniqueCategoryData) {
        console.error('No data found in local storage');
        return;
      }

      updateBadgeAndStorage(tabId, tab.url, combinedData, uniqueCategoryData);
    });
  }
});

// Listen for tab activation
chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, tab => {
    if (tab.url?.includes('github.com')) {
      chrome.storage.local.get(['combinedData', 'uniqueCategoryData'], result => {
        const combinedData: Record<string, Library> = result.combinedData;
        const uniqueCategoryData: UniqueCategoryData = result.uniqueCategoryData;

        if (!combinedData || !uniqueCategoryData) {
          console.error('No data found in local storage');
          return;
        }

        updateBadgeAndStorage(tab.id!, tab.url, combinedData, uniqueCategoryData);
      });
    }
  });
});

// Handle messages from popup/side panel to get matched items
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'getMatchedItems') {
    const tabId = message.tabId;
    chrome.storage.local.get([`matchedItems_${tabId}`], result => {
      sendResponse(result[`matchedItems_${tabId}`] || []);
    });
    return true; // Keep the message channel open for the sendResponse call
  }
  return false;
});
