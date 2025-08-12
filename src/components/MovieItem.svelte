<script>
  import { createEventDispatcher } from 'svelte';
  export let movie;
  const dispatch = createEventDispatcher();
  function handleClick() { dispatch('showDetails', { movie }); }
  const poster = movie?.Poster && movie.Poster !== 'N/A' ? movie.Poster : '';
  const title = movie?.Title || movie?.title || 'Unknown title';
  const rating = movie?.imdbRating || movie?.rating || null;
  const year = movie?.Year || '';
</script>

<article class="movie-tile" role="button" tabindex="0" aria-label={`Open details for ${title}`} on:keydown={(e)=> (e.key==='Enter'||e.key===' ') && handleClick()} on:click={handleClick}>
  <div class="poster-container">
    {#if poster}
      <img src={poster} alt={title} class="poster" />
    {:else}
      <div class="poster-placeholder">
        <span>🎬</span>
      </div>
    {/if}
    {#if rating}
      <div class="rating-badge">⭐ {rating}</div>
    {/if}
    <div class="hover-overlay">
      <span class="view-details">View Details</span>
    </div>
  </div>
  <div class="movie-info">
    <h3 class="movie-title" title={title}>{title}</h3>
    {#if year}<div class="movie-year">{year}</div>{/if}
  </div>
</article>

<style>
  .movie-tile {
    width: 100%;
    cursor: pointer;
    user-select: none;
    display: flex;
    flex-direction: column;
    background: var(--surface-1);
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--border);
    transition: all 0.2s ease;
  }

  .movie-tile:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    border-color: var(--accent);
  }

  .poster-container {
    position: relative;
    width: 100%;
    aspect-ratio: 2/3;
    overflow: hidden;
    background: var(--surface-2);
  }

  .poster {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.2s ease;
  }

  .movie-tile:hover .poster {
    transform: scale(1.05);
  }

  .poster-placeholder {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    color: var(--text-dim);
    font-size: 32px;
    background: var(--surface-3);
  }

  .rating-badge {
    position: absolute;
    top: 8px;
    left: 8px;
    background: rgba(0, 0, 0, 0.8);
    color: #ffd166;
    font-weight: 700;
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(4px);
  }

  .hover-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: grid;
    place-items: center;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .movie-tile:hover .hover-overlay {
    opacity: 1;
  }

  .view-details {
    color: white;
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .movie-info {
    padding: 12px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .movie-title {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: var(--text-strong);
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .movie-year {
    color: var(--text-dim);
    font-size: 12px;
    font-weight: 500;
  }
</style>
  