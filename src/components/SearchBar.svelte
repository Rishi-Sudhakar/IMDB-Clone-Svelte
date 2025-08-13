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
    gap: 16px;
    width: 100%;
  }

  .search-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    background: var(--surface-1);
    border: 2px solid var(--border-light);
    border-radius: var(--radius-lg);
    transition: all var(--transition-normal);
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .search-input-wrapper:focus-within {
    border-color: var(--accent-primary);
    background: var(--surface-2);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
  }

  .search-icon {
    padding: 0 20px;
    color: var(--text-secondary);
    font-size: 20px;
    pointer-events: none;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
  }

  input[type='search'] {
    flex: 1;
    padding: 18px 20px 18px 0;
    border: none;
    background: transparent;
    color: var(--text-primary);
    font-size: 16px;
    outline: none;
    font-weight: 500;
  }

  input[type='search']::placeholder {
    color: var(--text-secondary);
    opacity: 0.8;
  }

  .clear-btn {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 8px;
    margin-right: 16px;
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .clear-btn:hover {
    background: var(--surface-2);
    color: var(--text-primary);
    transform: scale(1.1);
  }

  .search-btn {
    background: var(--accent-primary);
    color: white;
    border: none;
    padding: 18px 32px;
    border-radius: var(--radius-lg);
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-normal);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  .search-btn:hover {
    background: var(--accent-primary-dark);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .search-btn:active {
    transform: translateY(0);
  }

  .search-text {
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .search {
      grid-template-columns: 1fr;
      gap: 12px;
    }
    
    .search-input-wrapper {
      border-radius: var(--radius-lg);
    }
    
    .search-btn {
      padding: 16px 24px;
      border-radius: var(--radius-lg);
    }
  }

  @media (max-width: 480px) {
    .search-input-wrapper {
      border-radius: var(--radius-lg);
    }
    
    input[type='search'] {
      padding: 16px 16px 16px 0;
      font-size: 15px;
    }
    
    .search-icon {
      padding: 0 16px;
      font-size: 18px;
    }
    
    .search-btn {
      padding: 14px 20px;
      font-size: 15px;
    }
  }
</style>


