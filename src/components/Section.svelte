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
    margin-bottom: 40px;
  }
  
  .section-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 0;
  }
  
  .section-title h2 {
    margin: 0;
    color: var(--text-strong);
    font-size: 24px;
    font-weight: 600;
  }
  
  .subtitle {
    margin: 4px 0 0 0;
    color: var(--text-dim);
    font-size: 14px;
  }
  
  .section-content {
    width: 100%;
  }
  
  .section-action {
    display: flex;
    align-items: center;
  }
</style>


