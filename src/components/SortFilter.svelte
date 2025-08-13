<!-- src/components/SortFilter.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';
  
  export let selectedSort = 'popularity.desc';
  export let disabled = false;
  
  const dispatch = createEventDispatcher();
  
  const sortOptions = [
    { value: 'popularity.desc', label: 'Most Popular' },
    { value: 'vote_average.desc', label: 'Highest Rated' },
    { value: 'release_date.desc', label: 'Newest First' },
    { value: 'release_date.asc', label: 'Oldest First' },
    { value: 'title.asc', label: 'Title A-Z' },
    { value: 'title.desc', label: 'Title Z-A' },
    { value: 'vote_count.desc', label: 'Most Voted' },
    { value: 'revenue.desc', label: 'Highest Revenue' }
  ];
  
  function handleSortChange(event) {
    const sort = event.target.value;
    selectedSort = sort;
    dispatch('change', { sort });
  }
</script>

<div class="sort-filter">
  <label for="sort-select" class="filter-label">Sort By</label>
  <select 
    id="sort-select"
    bind:value={selectedSort}
    on:change={handleSortChange}
    {disabled}
    class="sort-select"
  >
    {#each sortOptions as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
</div>

<style>
  .sort-filter {
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
  
  .sort-select {
    padding: 16px 20px;
    border: 2px solid var(--border-light);
    border-radius: var(--radius-lg);
    background: var(--surface-1);
    color: var(--text-primary);
    font-size: 14px;
    cursor: pointer;
    transition: all var(--transition-normal);
    min-width: 200px;
    font-weight: 600;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .sort-select:hover:not(:disabled) {
    border-color: var(--accent-primary);
    background: var(--surface-2);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .sort-select:focus {
    outline: none;
    border-color: var(--accent-primary);
    background: var(--surface-2);
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
  
  .sort-select:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  /* Custom dropdown arrow */
  .sort-select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 16px center;
    background-repeat: no-repeat;
    background-size: 16px;
    padding-right: 48px;
  }
  
  @media (max-width: 768px) {
    .sort-select {
      min-width: 160px;
      padding: 12px 16px;
      font-size: 13px;
      padding-right: 40px;
    }
    
    .filter-label {
      font-size: 12px;
    }
  }
  
  @media (max-width: 480px) {
    .sort-select {
      min-width: 140px;
      padding: 10px 14px;
      font-size: 12px;
      padding-right: 36px;
    }
    
    .filter-label {
      font-size: 11px;
    }
  }
</style>
