<script>
  import { page } from '../stores.js';
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  const categories = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'movies', label: 'Movies', icon: '🎬' },
    { id: 'tv', label: 'TV Shows', icon: '📺' },
    { id: 'celebs', label: 'Celebrities', icon: '⭐' },
    { id: 'awards', label: 'Awards', icon: '🏆' },
    { id: 'news', label: 'News', icon: '📰' }
  ];
  
  let navbar;
  let isVisible = true;
  let lastScrollY = 0;
  let scrollTimeout;
  
  function setPage(pageId) {
    page.set(pageId);
    dispatch('pageChange', { page: pageId });
  }
  
  function handleScroll() {
    const currentScrollY = window.scrollY;
    
    // Show navbar when scrolling up or at top
    if (currentScrollY < lastScrollY || currentScrollY < 100) {
      isVisible = true;
    } else if (currentScrollY > lastScrollY && currentScrollY > 200) {
      // Hide navbar when scrolling down (after 200px)
      isVisible = false;
    }
    
    lastScrollY = currentScrollY;
    
    // Clear existing timeout
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    
    // Auto-hide navbar after scrolling stops
    scrollTimeout = setTimeout(() => {
      if (currentScrollY > 200) {
        isVisible = false;
      }
    }, 1500);
  }
  
  onMount(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
      };
    }
  });
</script>

<nav 
  class="floating-nav {isVisible ? 'visible' : 'hidden'}"
  bind:this={navbar}
  role="navigation"
  aria-label="Main navigation"
>
  <div class="nav-pill">
    <div class="nav-content">
      {#each categories as category}
        <button 
          class="nav-item {($page === category.id ? 'active' : '')}"
          on:click={() => setPage(category.id)}
          aria-label={category.label}
        >
          <span class="nav-icon">{category.icon}</span>
          <span class="nav-label">{category.label}</span>
        </button>
      {/each}
    </div>
  </div>
</nav>

<style>
  .floating-nav {
    position: fixed;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    z-index: var(--z-sticky);
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: none;
    animation: navEntrance 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  @keyframes navEntrance {
    0% {
      opacity: 0;
      transform: translateX(-50%) translateY(-20px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateX(-50%) translateY(0) scale(1);
    }
  }
  
  .floating-nav.hidden {
    transform: translateX(-50%) translateY(-100px);
    opacity: 0;
    pointer-events: none;
  }
  
  .floating-nav.visible {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
    pointer-events: all;
  }
  
  .nav-pill {
    background: var(--glass-bg);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid var(--glass-border);
    border-radius: 40px;
    padding: 6px;
    box-shadow: 
      var(--glass-shadow),
      0 2px 8px rgba(0, 0, 0, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
  }
  
  .nav-pill::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 50%,
      rgba(255, 255, 255, 0.1) 100%
    );
    border-radius: 40px;
    pointer-events: none;
  }
  
  .nav-content {
    display: flex;
    gap: 3px;
    position: relative;
    z-index: 1;
  }
  
  .nav-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border: none;
    background: transparent;
    color: var(--text-primary);
    border-radius: 32px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    font-size: 13px;
    font-weight: 600;
    position: relative;
    white-space: nowrap;
    min-width: fit-content;
    height: 36px;
    border: 1px solid transparent;
    letter-spacing: 0.2px;
    overflow: hidden;
  }
  
  .nav-item::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0.08) 100%
    );
    border-radius: 32px;
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    transform: scale(0.8);
  }
  
  .nav-item:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px) scale(1.02);
    box-shadow: 
      0 8px 25px rgba(0, 0, 0, 0.12),
      0 4px 12px rgba(0, 0, 0, 0.08);
  }
  
  .nav-item:hover::before {
    opacity: 1;
    transform: scale(1);
  }
  
  .nav-item.active {
    background: var(--accent-primary);
    color: white;
    border-color: var(--accent-primary);
    font-weight: 700;
    box-shadow: 
      0 6px 20px rgba(var(--accent-primary-rgb, 0, 123, 255), 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transform: translateY(-1px) scale(1.05);
    animation: activeBubble 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  
  @keyframes activeBubble {
    0% {
      transform: translateY(-1px) scale(1.05);
    }
    50% {
      transform: translateY(-3px) scale(1.08);
    }
    100% {
      transform: translateY(-1px) scale(1.05);
    }
  }
  
  .nav-icon {
    font-size: 16px;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    z-index: 2;
  }
  
  .nav-item:hover .nav-icon {
    transform: scale(1.15) rotate(5deg);
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
  }
  
  .nav-item.active .nav-icon {
    transform: scale(1.1);
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    animation: iconBounce 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  
  @keyframes iconBounce {
    0%, 100% {
      transform: scale(1.1);
    }
    25% {
      transform: scale(1.2) rotate(-2deg);
    }
    75% {
      transform: scale(1.15) rotate(2deg);
    }
  }
  
  .nav-label {
    font-weight: 600;
    letter-spacing: 0.3px;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    z-index: 2;
  }
  
  .nav-item:hover .nav-label {
    transform: translateX(2px);
  }
  
  /* Dark theme adjustments */
  :global([data-theme="dark"]) .nav-pill {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    box-shadow: 
      var(--glass-shadow),
      0 2px 8px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }
  
  :global([data-theme="dark"]) .nav-item:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.12);
    box-shadow: 
      0 8px 25px rgba(0, 0, 0, 0.4),
      0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  /* Mobile responsiveness */
  @media (max-width: 1024px) {
    .floating-nav {
      top: 90px;
    }
    
    .nav-item {
      padding: 6px 14px;
      font-size: 12px;
      height: 32px;
    }
  }
  
  @media (max-width: 768px) {
    .floating-nav {
      top: 80px;
    }
    
    .nav-pill {
      padding: 4px;
      border-radius: 35px;
    }
    
    .nav-content {
      gap: 2px;
    }
    
    .nav-item {
      padding: 6px 12px;
      gap: 6px;
      height: 28px;
      border-radius: 28px;
    }
    
    .nav-label { 
      display: none; 
    }
    
    .nav-icon {
      font-size: 14px;
    }
  }
  
  @media (max-width: 480px) {
    .floating-nav {
      top: 70px;
    }
    
    .nav-pill {
      padding: 3px;
      border-radius: 30px;
    }
    
    .nav-item {
      padding: 4px 8px;
      font-size: 11px;
      height: 24px;
      border-radius: 24px;
    }
    
    .nav-icon {
      font-size: 12px;
    }
  }
  
  /* Smooth scroll behavior */
  @media (prefers-reduced-motion: no-preference) {
    .floating-nav {
      transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .nav-item {
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    .floating-nav,
    .nav-item {
      transition: none;
    }
  }
</style>
