<script>
  export let title = '';
  export let subtitle = '';
  export let action = '';
</script>

<section class="section">
  <div class="head">
    <div>
      <h2>{title}</h2>
      {#if subtitle}<p class="subtitle">{subtitle}</p>{/if}
    </div>
    <div class="action"><slot name="action">{action}</slot></div>
  </div>
  <div class="content">
    <slot />
  </div>
  
</section>

<style>
  .section { display: grid; gap: 14px; }
  .head {
    display: flex; align-items: end; justify-content: space-between;
  }
  h2 { margin: 0; color: var(--text-strong); font-size: 22px; }
  .subtitle { margin: 2px 0 0; color: var(--text-dim); }
  .content { display: grid; gap: 14px; }
</style>


