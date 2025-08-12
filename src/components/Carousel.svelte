<script>
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';
  
  export let items = [];
  export let itemWidth = 180;
  export let showArrows = true;
  export let autoScroll = false;
  export let scrollSpeed = 3000;
  
  const dispatch = createEventDispatcher();
  
  let track;
  let container;
  let canScrollLeft = false;
  let canScrollRight = true;
  let autoScrollInterval;
  
  function updateScrollButtons() {
    if (!track) return;
    
    canScrollLeft = track.scrollLeft > 0;
    canScrollRight = track.scrollLeft < (track.scrollWidth - track.clientWidth);
  }
  
  function scrollLeft() {
    if (!track) return;
    track.scrollBy({
      left: -itemWidth * 2,
      behavior: 'smooth'
    });
  }
  
  function scrollRight() {
    if (!track) return;
    track.scrollBy({
      left: itemWidth * 2,
      behavior: 'smooth'
    });
  }
  
  function scrollToStart() {
    if (!track) return;
    track.scrollTo({
      left: 0,
      behavior: 'smooth'
    });
  }
  
  function scrollToEnd() {
    if (!track) return;
    track.scrollTo({
      left: track.scrollWidth,
      behavior: 'smooth'
    });
  }
  
  function handleScroll() {
    updateScrollButtons();
  }
  
  function handleWheel(event) {
    event.preventDefault();
    track.scrollBy({
      left: event.deltaY > 0 ? itemWidth : -itemWidth,
      behavior: 'smooth'
    });
  }
  
  onMount(() => {
    if (track) {
      track.addEventListener('scroll', handleScroll);
      track.addEventListener('wheel', handleWheel, { passive: false });
      updateScrollButtons();
    }
    
    if (autoScroll && items.length > 4) {
      autoScrollInterval = setInterval(() => {
        if (canScrollRight) {
          scrollRight();
        } else {
          scrollToStart();
        }
      }, scrollSpeed);
    }
    
    return () => {
      if (track) {
        track.removeEventListener('scroll', handleScroll);
        track.removeEventListener('wheel', handleWheel);
      }
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
    };
  });
  
  $: if (track && items.length) {
    updateScrollButtons();
  }
</script>

<div class="carousel-wrapper" bind:this={container}>
  {#if showArrows && items.length > 4}
    <button 
      class="carousel-arrow carousel-arrow-left {!canScrollLeft ? 'disabled' : ''}"
      on:click={scrollLeft}
      disabled={!canScrollLeft}
      aria-label="Scroll left"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="m15 18-6-6 6-6"/>
      </svg>
    </button>
    
    <button 
      class="carousel-arrow carousel-arrow-right {!canScrollRight ? 'disabled' : ''}"
      on:click={scrollRight}
      disabled={!canScrollRight}
      aria-label="Scroll right"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="m9 18 6-6-6-6"/>
      </svg>
    </button>
  {/if}
  
  <div class="carousel-container">
    <div 
      class="carousel-track" 
      bind:this={track}
      style={`--item-width:${itemWidth}px`}
    >
      <slot {items} />
    </div>
  </div>
  
  {#if items.length > 4}
    <div class="carousel-indicators">
      <button 
        class="indicator {!canScrollLeft ? 'active' : ''}"
        on:click={scrollToStart}
        aria-label="Go to start"
      >
        <span class="indicator-dot"></span>
      </button>
      <button 
        class="indicator {canScrollLeft && canScrollRight ? 'active' : ''}"
        on:click={() => track?.scrollTo({ left: track.scrollWidth / 2, behavior: 'smooth' })}
        aria-label="Go to middle"
      >
        <span class="indicator-dot"></span>
      </button>
      <button 
        class="indicator {!canScrollRight ? 'active' : ''}"
        on:click={scrollToEnd}
        aria-label="Go to end"
      >
        <span class="indicator-dot"></span>
      </button>
    </div>
  {/if}
</div>

<style>
  .carousel-wrapper {
    position: relative;
    width: 100%;
    margin: 0 auto;
  }
  
  .carousel-container {
    width: 100%;
    overflow: hidden;
    position: relative;
    border-radius: var(--radius-lg);
  }
  
  .carousel-track {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: var(--item-width);
    gap: 16px;
    overflow-x: auto;
    padding: 8px 0 16px 0;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -ms-overflow-style: none;
    transition: scroll-behavior 0.3s ease;
  }
  
  .carousel-track::-webkit-scrollbar {
    display: none;
  }
  
  .carousel-track > * {
    scroll-snap-align: start;
    width: var(--item-width);
    animation: slideInUp 0.6s ease both;
  }
  
  .carousel-track > *:nth-child(1) { animation-delay: 0.1s; }
  .carousel-track > *:nth-child(2) { animation-delay: 0.2s; }
  .carousel-track > *:nth-child(3) { animation-delay: 0.3s; }
  .carousel-track > *:nth-child(4) { animation-delay: 0.4s; }
  .carousel-track > *:nth-child(5) { animation-delay: 0.5s; }
  .carousel-track > *:nth-child(6) { animation-delay: 0.6s; }
  
  .carousel-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    background: var(--surface-1);
    border: 1px solid var(--border-medium);
    border-radius: 50%;
    color: var(--text-primary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-normal);
    z-index: 10;
    backdrop-filter: blur(8px);
    box-shadow: var(--shadow-lg);
  }
  
  .carousel-arrow:hover:not(.disabled) {
    background: var(--surface-2);
    border-color: var(--border-strong);
    transform: translateY(-50%) scale(1.05);
    box-shadow: var(--shadow-xl);
  }
  
  .carousel-arrow:active:not(.disabled) {
    transform: translateY(-50%) scale(0.95);
  }
  
  .carousel-arrow.disabled {
    opacity: 0.3;
    cursor: not-allowed;
    transform: translateY(-50%) scale(0.9);
  }
  
  .carousel-arrow-left {
    left: -24px;
  }
  
  .carousel-arrow-right {
    right: -24px;
  }
  
  .carousel-indicators {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 16px;
  }
  
  .indicator {
    width: 32px;
    height: 32px;
    background: var(--surface-2);
    border: 1px solid var(--border-medium);
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-normal);
  }
  
  .indicator:hover {
    background: var(--surface-3);
    border-color: var(--border-strong);
    transform: scale(1.1);
  }
  
  .indicator.active {
    background: var(--accent-primary);
    border-color: var(--accent-primary);
    transform: scale(1.2);
  }
  
  .indicator-dot {
    width: 8px;
    height: 8px;
    background: var(--text-primary);
    border-radius: 50%;
    transition: all var(--transition-normal);
  }
  
  .indicator.active .indicator-dot {
    background: white;
  }
  
  @media (max-width: 768px) {
    .carousel-arrow {
      width: 40px;
      height: 40px;
    }
    
    .carousel-arrow-left {
      left: -20px;
    }
    
    .carousel-arrow-right {
      right: -20px;
    }
  }
</style>


