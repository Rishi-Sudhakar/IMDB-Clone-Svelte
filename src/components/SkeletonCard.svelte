<script>
  export let variant = 'poster';
</script>

<div class={`skeleton ${variant}`} aria-hidden="true"></div>

<style>
  .skeleton {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    background: linear-gradient(180deg, var(--surface-2), var(--surface-3));
    border: 1px solid var(--border);
  }
  .poster {
    width: 100%;
    aspect-ratio: 2/3;
  }
  .title { height: 18px; width: 80%; margin-top: 10px; }

  .skeleton::after {
    content: '';
    position: absolute; inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
    animation: shimmer 1.2s infinite;
  }

  @keyframes shimmer {
    100% { transform: translateX(100%); }
  }
</style>


