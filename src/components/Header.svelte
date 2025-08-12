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
    z-index: var(--z-sticky);
    background: var(--bg-elevated);
    border-bottom: 1px solid var(--border-light);
    backdrop-filter: blur(12px);
    width: 100%;
    box-shadow: var(--shadow-sm);
  }

  .header-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .logo {
    font-size: 28px;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }

  h1 {
    margin: 0;
    font-size: 22px;
    color: var(--text-primary);
    font-weight: 700;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
</style>


