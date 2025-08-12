<script>
  import { createEventDispatcher } from 'svelte';
  import { lastQuery } from '../stores.js';

  const dispatch = createEventDispatcher();

  let query = '';

  // Clear the search when component mounts
  $: if ($lastQuery === '') {
    query = '';
  }

  function submit(e) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    
    // Clear the search after submitting
    lastQuery.set('');
    query = '';
    
    dispatch('search', { query: trimmed });
  }

  function clearSearch() {
    query = '';
    lastQuery.set('');
    dispatch('clear');
  }
</script>

<form class="search" on:submit|preventDefault={submit}>
  <div class="search-input-wrapper">
    <input
      type="search"
      placeholder="Search movies, TV shows, celebrities..."
      bind:value={query}
      aria-label="Search movies, TV shows, celebrities"
    />
    {#if query}
      <button type="button" class="clear-btn" on:click={clearSearch} aria-label="Clear search">
        ×
      </button>
    {/if}
  </div>
  <button type="submit" class="search-btn">
    <span class="search-icon">🔍</span>
    <span class="search-text">Search</span>
  </button>
  <slot name="extra" />
</form>

<style>
  .search {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 12px;
    width: 100%;
  }

  .search-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  input[type='search'] {
    width: 100%;
    padding: 14px 16px;
    border-radius: 12px;
    border: 2px solid var(--border);
    background: var(--surface-2);
    color: var(--text);
    font-size: 16px;
    transition: border-color 0.2s ease;
  }

  input[type='search']:focus {
    outline: none;
    border-color: var(--accent);
  }

  .clear-btn {
    position: absolute;
    right: 12px;
    background: none;
    border: none;
    color: var(--text-dim);
    font-size: 18px;
    cursor: pointer;
    padding: 4px;
    border-radius: 50%;
    transition: all 0.2s ease;
  }

  .clear-btn:hover {
    background: var(--surface-3);
    color: var(--text);
  }

  .search-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 20px;
    border-radius: 12px;
    border: none;
    background: var(--accent);
    color: var(--on-accent);
    cursor: pointer;
    font-weight: 600;
    font-size: 16px;
    transition: all 0.2s ease;
  }

  .search-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(31, 111, 235, 0.3);
  }

  .search-icon {
    font-size: 16px;
  }

  .search-text {
    display: inline;
  }

  @media (max-width: 640px) {
    .search-text { display: none; }
    .search-btn { padding: 14px 16px; }
  }
</style>


