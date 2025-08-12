<!-- src/components/ThemeToggle.svelte -->

<script>
  import { theme } from '../stores.js';
  
  function toggleTheme() {
    theme.set($theme === 'dark' ? 'light' : 'dark');
  }

  // Apply theme to document
  $: {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', $theme);
    }
  }
</script>

<button 
  class="theme-toggle" 
  on:click={toggleTheme} 
  aria-label="Toggle theme"
  title="Toggle theme"
>
  <div class="toggle-icon">
    {#if $theme === 'dark'}
      <span class="sun">☀️</span>
    {:else}
      <span class="moon">🌙</span>
    {/if}
  </div>
  <span class="toggle-text">
    {$theme === 'dark' ? 'Light' : 'Dark'} Mode
  </span>
</button>

<style>
  .theme-toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: var(--surface-2);
    color: var(--text-primary);
    border: 1px solid var(--border-medium);
    border-radius: var(--radius-md);
    font-size: 14px;
    font-weight: 500;
    transition: all var(--transition-normal);
    cursor: pointer;
  }

  .theme-toggle:hover {
    background: var(--surface-3);
    border-color: var(--border-strong);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  .theme-toggle:active {
    transform: translateY(0);
  }

  .toggle-icon {
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .toggle-text {
    font-weight: 500;
  }

  @media (max-width: 640px) {
    .toggle-text {
      display: none;
    }
    
    .theme-toggle {
      padding: 8px;
      min-width: 40px;
      justify-content: center;
    }
  }
</style>
