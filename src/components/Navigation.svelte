<script>
  import { page, filters } from '../stores.js';
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  const categories = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'movies', label: 'Movies', icon: '🎬' },
    { id: 'tv', label: 'TV Shows', icon: '📺' },
    { id: 'celebs', label: 'Celebrities', icon: '⭐' },
    { id: 'awards', label: 'Awards', icon: '🏆' },
    { id: 'news', label: 'News', icon: '📰' }
  ];
  
  const sortOptions = [
    { value: 'rating', label: 'Rating' },
    { value: 'year', label: 'Year' },
    { value: 'title', label: 'Title' },
    { value: 'votes', label: 'Votes' }
  ];
  
  const years = Array.from({length: 25}, (_, i) => new Date().getFullYear() - i);
  const genres = ['Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Drama', 'Family', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'War'];
  
  function setPage(pageId) {
    page.set(pageId);
    dispatch('pageChange', { page: pageId });
  }
  
  function updateFilters(newFilters) {
    filters.update(current => ({ ...current, ...newFilters }));
    dispatch('filterChange', newFilters);
  }
</script>

<nav class="main-nav">
  <div class="nav-container">
    <div class="nav-left">
      {#each categories as category}
        <button 
          class="nav-item {($page === category.id ? 'active' : '')}"
          on:click={() => setPage(pageId)}
        >
          <span class="nav-icon">{category.icon}</span>
          <span class="nav-label">{category.label}</span>
        </button>
      {/each}
    </div>
    
    <div class="nav-right">
      <div class="filters">
        <select 
          class="filter-select" 
          value={$filters.genre || ''} 
          on:change={(e) => updateFilters({ genre: e.target.value || null })}
        >
          <option value="">All Genres</option>
          {#each genres as genre}
            <option value={genre}>{genre}</option>
          {/each}
        </select>
        
        <select 
          class="filter-select" 
          value={$filters.year || ''} 
          on:change={(e) => updateFilters({ year: e.target.value || null })}
        >
          <option value="">All Years</option>
          {#each years as year}
            <option value={year}>{year}</option>
          {/each}
        </select>
        
        <select 
          class="filter-select" 
          value={$filters.sort} 
          on:change={(e) => updateFilters({ sort: e.target.value })}
        >
          {#each sortOptions as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>
</nav>

<style>
  .main-nav {
    background: var(--surface-1);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 60px; /* Position below header */
    z-index: 20;
    width: 100%;
  }
  
  .nav-container {
    max-width: 1100px; /* Match main container width */
    margin: 0 auto;
    padding: 0 16px; /* Match main container padding */
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
  }
  
  .nav-left {
    display: flex;
    gap: 8px;
  }
  
  .nav-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border: none;
    background: transparent;
    color: var(--text);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 14px;
  }
  
  .nav-item:hover {
    background: var(--surface-2);
    color: var(--text-strong);
  }
  
  .nav-item.active {
    background: var(--accent);
    color: var(--on-accent);
  }
  
  .nav-icon {
    font-size: 16px;
  }
  
  .nav-label {
    font-weight: 500;
  }
  
  .nav-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .filters {
    display: flex;
    gap: 12px;
  }
  
  .filter-select {
    padding: 8px 12px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--surface-2);
    color: var(--text);
    font-size: 14px;
    cursor: pointer;
  }
  
  .filter-select:focus {
    outline: none;
    border-color: var(--accent);
  }
  
  @media (max-width: 768px) {
    .nav-label { display: none; }
    .filters { gap: 8px; }
    .filter-select { padding: 6px 8px; font-size: 12px; }
  }
</style>
