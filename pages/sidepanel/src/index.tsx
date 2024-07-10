// src/index.tsx
import { createRoot } from 'react-dom/client';
import '@src/index.css';
import SidePanel from '@src/SidePanel';

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Cannot find #app-container');
  }
  const root = createRoot(appContainer);
  root.render(<SidePanel />);
}

init();