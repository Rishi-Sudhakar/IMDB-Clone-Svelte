// src/stores.js
import { writable } from 'svelte/store';

function createPersistedStore(key, initialValue) {
  const storedJson = typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
  const startingValue = storedJson ? JSON.parse(storedJson) : initialValue;
  const store = writable(startingValue);
  const { subscribe, set: setInner, update: updateInner } = store;

  return {
    subscribe,
    set: (value) => {
      setInner(value);
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {}
    },
    update: (updater) =>
      updateInner((current) => {
        const value = updater(current);
        try {
          localStorage.setItem(key, JSON.stringify(value));
        } catch {}
        return value;
      })
  };
}

export const theme = createPersistedStore('theme', 'light');
export const favorites = createPersistedStore('favorites', []);
export const lastQuery = createPersistedStore('lastQuery', '');
export const page = createPersistedStore('page', 'home');
export const filters = createPersistedStore('filters', { 
  genre: null, 
  year: null, 
  sort: 'popularity.desc',
  includeAdult: false 
});

// TMDB-specific stores
export const tmdbGenres = writable([]);
export const tmdbConfiguration = writable(null);
export const tmdbLoading = writable(false);


