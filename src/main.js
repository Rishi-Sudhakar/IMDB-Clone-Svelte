// src/main.js

import App from './App.svelte';
import { theme } from './stores.js';

// Initialize theme on app start
if (typeof document !== 'undefined') {
  // Get the current theme from localStorage or default to light
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  // Subscribe to theme changes
  theme.subscribe(value => {
    document.documentElement.setAttribute('data-theme', value);
  });
}

const app = new App({
    target: document.body
});

export default app;
