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
          on:click={() => setPage(category.id)}
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
    background: var(--bg-elevated);
    border-bottom: 1px solid var(--border-light);
    position: sticky;
    top: 64px;
    z-index: var(--z-sticky);
    width: 100%;
    box-shadow: var(--shadow-sm);
  }
  
  .nav-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
  }
  
  .nav-left {
    display: flex;
    gap: 4px;
  }
  
  .nav-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border: none;
    background: transparent;
    color: var(--text-secondary);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-normal);
    font-size: 14px;
    font-weight: 500;
    position: relative;
  }
  
  .nav-item:hover {
    background: var(--surface-2);
    color: var(--text-primary);
    transform: translateY(-1px);
  }
  
  .nav-item.active {
    background: var(--accent-primary);
    color: white;
    box-shadow: var(--shadow-md);
  }
  
  .nav-item.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 3px;
    background: var(--accent-primary);
    border-radius: var(--radius-sm);
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
    border: 1px solid var(--border-medium);
    border-radius: var(--radius-sm);
    background: var(--surface-1);
    color: var(--text-primary);
    font-size: 14px;
    cursor: pointer;
    transition: all var(--transition-fast);
    min-width: 120px;
  }
  
  .filter-select:focus {
    outline: none;
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  .filter-select:hover {
    border-color: var(--border-strong);
    background: var(--surface-2);
  }
  
  @media (max-width: 768px) {
    .nav-label { 
      display: none; 
    }
    
    .filters { 
      gap: 8px; 
    }
    
    .filter-select { 
      padding: 6px 8px; 
      font-size: 12px; 
      min-width: 100px;
    }
    
    .nav-item {
      padding: 8px 12px;
    }
  }
</style>
