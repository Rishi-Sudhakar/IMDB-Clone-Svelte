<script>
  import { createEventDispatcher } from 'svelte';
  import { lastQuery } from '../stores.js';

  const dispatch = createEventDispatcher();

  let query = '';

  $: query = $lastQuery;

  function submit(e) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    lastQuery.set(trimmed);
    dispatch('search', { query: trimmed });
  }
</script>

<form class="search" on:submit|preventDefault={submit}>
  <input
    type="search"
    placeholder="Search movies..."
    bind:value={query}
    aria-label="Search movies"
  />
  <button type="submit">Search</button>
  <slot name="extra" />
  
</form>

<style>
  .search {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 10px;
    width: 100%;
  }

  input[type='search'] {
    width: 100%;
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: var(--surface-2);
    color: var(--text);
  }

  button {
    padding: 12px 16px;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: var(--accent);
    color: var(--on-accent);
    cursor: pointer;
  }
</style>


