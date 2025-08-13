<!-- src/components/YearFilter.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';
  
  export let selectedYear = null;
  export let disabled = false;
  
  const dispatch = createEventDispatcher();
  
  // Generate years from current year back to 1900
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i);
  
  function handleYearChange(event) {
    const year = event.target.value ? parseInt(event.target.value) : null;
    selectedYear = year;
    dispatch('change', { year });
  }
</script>

<div class="year-filter">
  <label for="year-select" class="filter-label">Year</label>
  <select 
    id="year-select"
    bind:value={selectedYear}
    on:change={handleYearChange}
    {disabled}
    class="year-select"
  >
    <option value={null}>All Years</option>
    {#each years as year}
      <option value={year}>{year}</option>
    {/each}
  </select>
</div>

<style>
  .year-filter {
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
  
  .year-select {
    padding: 16px 20px;
    border: 2px solid var(--border-light);
    border-radius: var(--radius-lg);
    background: var(--surface-1);
    color: var(--text-primary);
    font-size: 14px;
    cursor: pointer;
    transition: all var(--transition-normal);
    min-width: 140px;
    font-weight: 600;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .year-select:hover:not(:disabled) {
    border-color: var(--accent-primary);
    background: var(--surface-2);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .year-select:focus {
    outline: none;
    border-color: var(--accent-primary);
    background: var(--surface-2);
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
  
  .year-select:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  /* Custom dropdown arrow */
  .year-select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 16px center;
    background-repeat: no-repeat;
    background-size: 16px;
    padding-right: 48px;
  }
  
  @media (max-width: 768px) {
    .year-select {
      min-width: 120px;
      padding: 12px 16px;
      font-size: 13px;
      padding-right: 40px;
    }
    
    .filter-label {
      font-size: 12px;
    }
  }
  
  @media (max-width: 480px) {
    .year-select {
      min-width: 100px;
      padding: 10px 14px;
      font-size: 12px;
      padding-right: 36px;
    }
    
    .filter-label {
      font-size: 11px;
    }
  }
</style>
