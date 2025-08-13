<!-- src/components/GenreFilter.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';
  import { tmdbGenres } from '../stores.js';
  
  export let selectedGenre = null;
  export let disabled = false;
  
  const dispatch = createEventDispatcher();
  
  function handleGenreChange(event) {
    const genreId = event.target.value ? parseInt(event.target.value) : null;
    selectedGenre = genreId;
    dispatch('change', { genre: genreId });
  }
</script>

<div class="genre-filter">
  <label for="genre-select" class="filter-label">Genre</label>
  <select 
    id="genre-select"
    bind:value={selectedGenre}
    on:change={handleGenreChange}
    {disabled}
    class="genre-select"
  >
    <option value={null}>All Genres</option>
    {#each $tmdbGenres as genre}
      <option value={genre.id}>{genre.name}</option>
    {/each}
  </select>
</div>

<style>
  .genre-filter {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .filter-label {
    font-size: 13px;
    font-weight: 700;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.9;
  }
  
  .genre-select {
    padding: 16px 20px;
    border: 2px solid var(--border-light);
    border-radius: var(--radius-lg);
    background: var(--surface-1);
    color: var(--text-primary);
    font-size: 14px;
    cursor: pointer;
    transition: all var(--transition-normal);
    min-width: 180px;
    font-weight: 600;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .genre-select:hover:not(:disabled) {
    border-color: var(--accent-primary);
    background: var(--surface-2);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .genre-select:focus {
    outline: none;
    border-color: var(--accent-primary);
    background: var(--surface-2);
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
  
  .genre-select:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  /* Custom dropdown arrow */
  .genre-select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 16px center;
    background-repeat: no-repeat;
    background-size: 16px;
    padding-right: 48px;
  }
  
  @media (max-width: 768px) {
    .genre-select {
      min-width: 140px;
      padding: 12px 16px;
      font-size: 13px;
      padding-right: 40px;
    }
    
    .filter-label {
      font-size: 12px;
    }
  }
  
  @media (max-width: 480px) {
    .genre-select {
      min-width: 120px;
      padding: 10px 14px;
      font-size: 12px;
      padding-right: 36px;
    }
    
    .filter-label {
      font-size: 11px;
    }
  }
</style>
