<!-- src/components/ThemeToggle.svelte -->

<script>
    let isDarkMode = false;
  
    function toggleDarkMode() {
      isDarkMode = !isDarkMode;
      const root = document.documentElement;
      if (isDarkMode) {
        root.style.setProperty('--bg-color', '#333');
        root.style.setProperty('--text-color', '#fff');
        root.style.setProperty('--card-bg', '#444');
        root.style.setProperty('--heading-color', '#fff');
        root.style.setProperty('--rating-bg', '#ffcc00');
        root.style.setProperty('--rating-text-color', '#333');
      } else {
        root.style.removeProperty('--bg-color');
        root.style.removeProperty('--text-color');
        root.style.removeProperty('--card-bg');
        root.style.removeProperty('--heading-color');
        root.style.removeProperty('--rating-bg');
        root.style.removeProperty('--rating-text-color');
      }
    }
  </script>
  
  <button class="toggle-btn" on:click={toggleDarkMode}>
    {#if isDarkMode}
      Light Mode
    {:else}
      Dark Mode
    {/if}
  </button>
  
  <style>
    .toggle-btn {
      background-color: transparent;
      color: #fff;
      border: none;
      cursor: pointer;
      font-size: 16px;
    }
  </style>
  