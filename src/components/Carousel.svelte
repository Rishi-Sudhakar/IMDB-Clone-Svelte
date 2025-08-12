<script>
  export let items = [];
  export let itemWidth = 180; // px
</script>

<div class="row" style={`--w:${itemWidth}px`}>
  <div class="track">
    <slot {items} />
  </div>
</div>

<style>
  .row { position: relative; }
  .track {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: var(--w);
    gap: 14px;
    overflow-x: auto;
    padding: 6px 0 16px;
    scroll-snap-type: x mandatory;
  }
  .track > * { scroll-snap-align: start; }
  .track::-webkit-scrollbar { height: 10px; }
  .track::-webkit-scrollbar-thumb { background: var(--surface-3); border-radius: 999px; }
</style>


