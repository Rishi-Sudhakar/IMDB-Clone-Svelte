<script>
  export let variant = 'poster';
</script>

<div class={`skeleton ${variant}`} aria-hidden="true">
  <div class="skeleton-poster"></div>
  <div class="skeleton-content">
    <div class="skeleton-title"></div>
    <div class="skeleton-year"></div>
    <div class="skeleton-overview"></div>
  </div>
</div>

<style>
  .skeleton {
    width: 100%;
    background: var(--surface-1);
    border-radius: var(--radius-lg);
    overflow: hidden;
    border: 1px solid var(--border-light);
    display: flex;
    flex-direction: column;
    box-shadow: var(--shadow-sm);
  }

  .skeleton-poster {
    width: 100%;
    aspect-ratio: 2/3;
    background: linear-gradient(90deg, var(--surface-2) 25%, var(--surface-3) 50%, var(--surface-2) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  .skeleton-content {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .skeleton-title {
    height: 18px;
    width: 85%;
    background: linear-gradient(90deg, var(--surface-2) 25%, var(--surface-3) 50%, var(--surface-2) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: var(--radius-sm);
  }

  .skeleton-year {
    height: 14px;
    width: 35%;
    background: linear-gradient(90deg, var(--surface-2) 25%, var(--surface-3) 50%, var(--surface-2) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: var(--radius-sm);
  }

  .skeleton-overview {
    height: 12px;
    width: 70%;
    background: linear-gradient(90deg, var(--surface-2) 25%, var(--surface-3) 50%, var(--surface-2) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: var(--radius-sm);
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  @media (max-width: 768px) {
    .skeleton-content {
      padding: 12px;
    }
    
    .skeleton-title {
      height: 16px;
    }
    
    .skeleton-year {
      height: 12px;
    }
    
    .skeleton-overview {
      height: 10px;
    }
  }
</style>


