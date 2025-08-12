<script>
  export let items = [];
  export let itemWidth = 180; // px
</script>

<div class="carousel-container">
  <div class="carousel-track" style={`--item-width:${itemWidth}px`}>
    <slot {items} />
  </div>
</div>

<style>
  .carousel-container {
    width: 100%;
    overflow: hidden;
    position: relative;
  }
  
  .carousel-track {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: var(--item-width);
    gap: 16px;
    overflow-x: auto;
    padding: 8px 0 16px 0;
    scroll-snap-type: x mandatory;
    scrollbar-width: thin;
    scrollbar-color: var(--surface-3) transparent;
  }
  
  .carousel-track > * { 
    scroll-snap-align: start;
    width: var(--item-width);
  }
  
  .carousel-track::-webkit-scrollbar { 
    height: 8px; 
  }
  
  .carousel-track::-webkit-scrollbar-track { 
    background: transparent; 
  }
  
  .carousel-track::-webkit-scrollbar-thumb { 
    background: var(--surface-3); 
    border-radius: 4px; 
  }
  
  .carousel-track::-webkit-scrollbar-thumb:hover { 
    background: var(--surface-2); 
  }
</style>


