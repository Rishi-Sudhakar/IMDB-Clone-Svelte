<script>
  export let title = '';
  export let subtitle = '';
  export let action = '';
</script>

<section class="section">
  <div class="section-header">
    <div class="section-title">
      <h2>{title}</h2>
      {#if subtitle}<p class="subtitle">{subtitle}</p>{/if}
    </div>
    <div class="section-action">
      <slot name="action">{action}</slot>
    </div>
  </div>
  <div class="section-content">
    <slot />
  </div>
</section>

<style>
  .section {
    width: 100%;
    margin-bottom: 80px;
  }
  
  .section-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 40px;
    padding: 24px 32px;
    background: var(--surface-1);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-lg);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .section-title h2 {
    margin: 0;
    color: var(--text-primary);
    font-size: 32px;
    font-weight: 800;
    letter-spacing: -1px;
    line-height: 1.2;
  }
  
  .subtitle {
    margin: 12px 0 0 0;
    color: var(--text-secondary);
    font-size: 18px;
    font-weight: 500;
    opacity: 0.9;
  }
  
  .section-content {
    width: 100%;
  }
  
  .section-action {
    display: flex;
    align-items: center;
  }
  
  @media (max-width: 768px) {
    .section {
      margin-bottom: 60px;
    }
    
    .section-header {
      margin-bottom: 32px;
      padding: 20px 24px;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
    
    .section-title h2 {
      font-size: 28px;
    }
    
    .subtitle {
      font-size: 16px;
    }
  }
  
  @media (max-width: 480px) {
    .section {
      margin-bottom: 48px;
    }
    
    .section-header {
      padding: 16px 20px;
      margin-bottom: 24px;
    }
    
    .section-title h2 {
      font-size: 24px;
    }
    
    .subtitle {
      font-size: 14px;
    }
  }
</style>


