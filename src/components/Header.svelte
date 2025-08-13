<script>
  import ThemeToggle from './ThemeToggle.svelte';
  export let title = 'Bingelist';
</script>

<header class="app-header">
  <div class="header-container">
    <div class="brand">
      <div class="logo-container">
        <svg class="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 6h18v2H3V6zM3 11h18v2H3v-2zM3 16h18v2H3v-2z" fill="currentColor"/>
        </svg>
      </div>
      <div class="brand-text">
        <h1 class="brand-title">{title}</h1>
        <p class="brand-tagline">Entertainment as a list</p>
      </div>
    </div>
    <div class="header-actions">
      <ThemeToggle />
    </div>
  </div>
</header>

<style>
  .app-header {
    position: sticky;
    top: 0;
    z-index: var(--z-sticky);
    background: var(--bg-elevated);
    border-bottom: 1px solid var(--border-light);
    width: 100%;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    transition: all var(--transition-normal);
  }

  .header-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px 16px;
    border-radius: var(--radius-lg);
    background: var(--surface-1);
    border: 1px solid var(--border-light);
    transition: all var(--transition-normal);
  }

  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: var(--accent-primary);
    border-radius: var(--radius-md);
    color: white;
  }

  .logo-icon {
    width: 24px;
    height: 24px;
  }

  .brand-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .brand-title {
    margin: 0;
    font-size: 24px;
    color: var(--text-primary);
    font-weight: 800;
    letter-spacing: -0.5px;
    line-height: 1;
  }

  .brand-tagline {
    margin: 0;
    font-size: 12px;
    color: var(--text-secondary);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    line-height: 1;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  @media (max-width: 768px) {
    .header-container {
      padding: 0 20px;
      height: 72px;
    }
    
    .brand {
      padding: 10px 14px;
    }
    
    .logo-container {
      width: 36px;
      height: 36px;
    }
    
    .logo-icon {
      width: 20px;
      height: 20px;
    }
    
    .brand-title {
      font-size: 20px;
    }
    
    .brand-tagline {
      font-size: 11px;
    }
  }

  @media (max-width: 480px) {
    .header-container {
      padding: 0 16px;
      height: 64px;
    }
    
    .brand {
      padding: 8px 12px;
      gap: 12px;
    }
    
    .logo-container {
      width: 32px;
      height: 32px;
    }
    
    .logo-icon {
      width: 18px;
      height: 18px;
    }
    
    .brand-title {
      font-size: 18px;
    }
    
    .brand-tagline {
      font-size: 10px;
    }
  }
</style>


