<script>
  import ThemeToggle from './ThemeToggle.svelte';
  export let title = 'IMDb Clone';
</script>

<header class="app-header">
  <div class="header-container">
    <div class="brand">
      <span class="logo">🎬</span>
      <h1>{title}</h1>
    </div>
    <ThemeToggle />
  </div>
</header>

<style>
  .app-header {
    position: sticky;
    top: 0;
    z-index: 30;
    background: var(--surface-1);
    border-bottom: 1px solid var(--border);
    backdrop-filter: blur(8px);
    width: 100%;
  }

  .header-container {
    max-width: 1100px; /* Match main container width */
    margin: 0 auto;
    padding: 0 16px; /* Match main container padding */
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .logo {
    font-size: 22px;
  }

  h1 {
    margin: 0;
    font-size: 20px;
    color: var(--text-strong);
  }
</style>


