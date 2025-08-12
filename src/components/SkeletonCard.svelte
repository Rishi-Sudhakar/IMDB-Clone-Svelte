<script>
  export let variant = 'poster';
</script>

<div class={`skeleton ${variant}`} aria-hidden="true">
  <div class="skeleton-poster"></div>
  <div class="skeleton-content">
    <div class="skeleton-title"></div>
    <div class="skeleton-year"></div>
  </div>
</div>

<style>
  .skeleton {
    width: 100%;
    background: var(--surface-1);
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--border);
    display: flex;
    flex-direction: column;
  }

  .skeleton-poster {
    width: 100%;
    aspect-ratio: 2/3;
    background: linear-gradient(90deg, var(--surface-2) 25%, var(--surface-3) 50%, var(--surface-2) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  .skeleton-content {
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .skeleton-title {
    height: 16px;
    width: 80%;
    background: linear-gradient(90deg, var(--surface-2) 25%, var(--surface-3) 50%, var(--surface-2) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
  }

  .skeleton-year {
    height: 12px;
    width: 40%;
    background: linear-gradient(90deg, var(--surface-2) 25%, var(--surface-3) 50%, var(--surface-2) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
</style>


