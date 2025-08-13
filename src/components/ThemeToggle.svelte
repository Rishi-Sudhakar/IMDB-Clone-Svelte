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
  {#if $theme === 'dark'}
    <svg class="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="5"/>
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  {:else}
    <svg class="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  {/if}
</button>

<style>
  .theme-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: var(--surface-1);
    color: var(--text-primary);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-lg);
    transition: all var(--transition-normal);
    cursor: pointer;
    padding: 0;
    position: relative;
    overflow: hidden;
  }

  .theme-toggle:hover {
    background: var(--surface-2);
    border-color: var(--border-medium);
    transform: scale(1.05);
  }

  .theme-toggle:active {
    transform: scale(0.98);
  }

  .toggle-icon {
    width: 20px;
    height: 20px;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: all var(--transition-normal);
  }

  @media (max-width: 768px) {
    .theme-toggle {
      width: 40px;
      height: 40px;
    }
    
    .toggle-icon {
      width: 18px;
      height: 18px;
    }
  }

  @media (max-width: 480px) {
    .theme-toggle {
      width: 36px;
      height: 36px;
    }
    
    .toggle-icon {
      width: 16px;
      height: 16px;
    }
  }
</style>
