<script>
  import MovieCard from './MovieItem.svelte';
  export let movies = [];
  export let onSelect; // optional callback
</script>

<div class="grid">
  {#if movies?.length}
    {#each movies as movie (movie.imdbID || movie.id)}
      <div class="anim-card" style="animation-delay: {Math.random()*200}ms">
        <MovieCard {movie} on:showDetails={(e) => onSelect ? onSelect(e) : null} />
      </div>
    {/each}
  {:else}
    <div class="empty">No results</div>
  {/if}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 16px;
  }
  .empty {
    grid-column: 1/-1;
    text-align: center;
    color: var(--text-dim);
    padding: 32px 0;
  }
  .anim-card { animation: fadeInUp .4s ease both; }
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
</style>


