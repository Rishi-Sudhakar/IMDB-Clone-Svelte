<script>
  import MovieItem from './MovieItem.svelte';
  export let movies = [];
  export let onSelect; // optional callback
</script>

<div class="grid">
  {#if movies?.length}
    {#each movies as movie (movie.imdbID || movie.id)}
      <div class="grid-item">
        <MovieItem {movie} on:showDetails={(e) => onSelect ? onSelect(e.detail.movie) : null} />
      </div>
    {/each}
  {:else}
    <div class="empty">
      <span class="empty-icon">🎬</span>
      <p>No results found</p>
    </div>
  {/if}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 32px;
    width: 100%;
  }
  
  .grid-item {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  
  .empty {
    grid-column: 1/-1;
    text-align: center;
    color: var(--text-secondary);
    padding: 80px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }
  
  .empty-icon {
    font-size: 64px;
    opacity: 0.5;
  }
  
  .empty p {
    margin: 0;
    font-size: 20px;
    font-weight: 500;
  }
  
  @media (max-width: 768px) {
    .grid {
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 24px;
    }
    
    .empty {
      padding: 60px 0;
    }
    
    .empty-icon {
      font-size: 56px;
    }
    
    .empty p {
      font-size: 18px;
    }
  }
  
  @media (max-width: 480px) {
    .grid {
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 20px;
    }
    
    .empty {
      padding: 48px 0;
    }
    
    .empty-icon {
      font-size: 48px;
    }
    
    .empty p {
      font-size: 16px;
    }
  }
</style>


