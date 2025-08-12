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
    <div class="search-icon">🔍</div>
    <input
      type="search"
      placeholder="Search movies, TV shows, celebrities..."
      bind:value={query}
      aria-label="Search movies, TV shows, celebrities"
    />
    {#if query}
      <button type="button" class="clear-btn" on:click={clearSearch} aria-label="Clear search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    {/if}
  </div>
  <button type="submit" class="search-btn">
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
    background: var(--surface-1);
    border: 2px solid var(--border-medium);
    border-radius: var(--radius-lg);
    transition: all var(--transition-normal);
    overflow: hidden;
  }

  .search-input-wrapper:focus-within {
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    transform: translateY(-1px);
  }

  .search-icon {
    padding: 0 16px;
    color: var(--text-tertiary);
    font-size: 18px;
    pointer-events: none;
  }

  input[type='search'] {
    flex: 1;
    padding: 16px 16px 16px 0;
    border: none;
    background: transparent;
    color: var(--text-primary);
    font-size: 16px;
    outline: none;
  }

  input[type='search']::placeholder {
    color: var(--text-tertiary);
  }

  .clear-btn {
    padding: 8px;
    margin: 0 8px;
    background: var(--surface-2);
    border: none;
    color: var(--text-tertiary);
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);
  }

  .clear-btn:hover {
    background: var(--surface-3);
    color: var(--text-primary);
    transform: scale(1.1);
  }

  .search-btn {
    padding: 16px 24px;
    background: var(--accent-primary);
    color: white;
    border: none;
    border-radius: var(--radius-lg);
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-normal);
    box-shadow: var(--shadow-md);
    min-width: 120px;
  }

  .search-btn:hover {
    background: var(--accent-secondary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .search-btn:active {
    transform: translateY(0);
  }

  .search-text {
    font-weight: 600;
  }

  @media (max-width: 640px) {
    .search {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    
    .search-btn {
      width: 100%;
      min-width: auto;
    }
    
    .search-input-wrapper {
      border-radius: var(--radius-md);
    }
    
    input[type='search'] {
      padding: 14px 14px 14px 0;
      font-size: 16px;
    }
    
    .search-btn {
      padding: 14px 20px;
      border-radius: var(--radius-md);
    }
  }
</style>


