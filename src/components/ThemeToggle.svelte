<!-- src/components/ThemeToggle.svelte -->

<script>
  import { theme } from '../stores.js';
  const toggle = () => theme.set($theme === 'dark' ? 'light' : 'dark');

  $: {
    const root = document.documentElement;
    const isDark = $theme === 'dark';
    root.style.setProperty('--bg', isDark ? '#0b0d10' : '#f6f7f9');
    root.style.setProperty('--surface-1', isDark ? '#111418' : '#ffffff');
    root.style.setProperty('--surface-2', isDark ? '#171b21' : '#f3f4f7');
    root.style.setProperty('--surface-3', isDark ? '#1d232b' : '#e9ecf1');
    root.style.setProperty('--border', isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)');
    root.style.setProperty('--text', isDark ? '#cfd6df' : '#1b2430');
    root.style.setProperty('--text-dim', isDark ? '#8e99a8' : '#5b6470');
    root.style.setProperty('--text-strong', isDark ? '#e6ebf2' : '#0b1118');
    root.style.setProperty('--accent', isDark ? '#ffd166' : '#1f6feb');
    root.style.setProperty('--on-accent', isDark ? '#111418' : '#ffffff');
  }
</script>

<button class="toggle-btn" on:click={toggle} aria-label="Toggle theme">
  {$theme === 'dark' ? 'Light' : 'Dark'}
  mode
  </button>

<style>
  .toggle-btn {
    background: var(--surface-2);
    color: var(--text);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 8px 12px;
    cursor: pointer;
  }
</style>
