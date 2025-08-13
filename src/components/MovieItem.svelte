<script>
  import { createEventDispatcher } from 'svelte';
  export let movie;
  const dispatch = createEventDispatcher();
  
  function handleClick() { 
    dispatch('showDetails', { movie }); 
  }
  
  const poster = movie?.Poster || movie?.poster || '';
  const title = movie?.Title || movie?.title || 'Unknown title';
  const rating = movie?.imdbRating || movie?.rating || null;
  const year = movie?.Year || movie?.year || '';
  const overview = movie?.overview || movie?.Plot || '';
</script>

<button class="movie-tile" aria-label={`Open details for ${title}`} on:click={handleClick}>
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
    {#if overview}<div class="movie-overview">{overview}</div>{/if}
  </div>
</button>

<style>
  .movie-tile {
    width: 100%;
    cursor: pointer;
    user-select: none;
    display: flex;
    flex-direction: column;
    background: var(--surface-1);
    border-radius: var(--radius-xl);
    overflow: hidden;
    border: 1px solid var(--border-light);
    transition: all var(--transition-normal);
    box-shadow: var(--shadow-sm);
    /* Reset button defaults */
    background: var(--surface-1);
    border: 1px solid var(--border-light);
    padding: 0;
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    text-align: left;
    position: relative;
  }

  .movie-tile:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-xl);
    border-color: var(--accent-primary);
  }

  .movie-tile:focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: 2px;
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
    transition: transform var(--transition-normal);
  }

  .movie-tile:hover .poster {
    transform: scale(1.08);
  }

  .poster-placeholder {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    color: var(--text-tertiary);
    font-size: 48px;
    background: var(--surface-3);
    border: 2px dashed var(--border-medium);
  }

  .rating-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    background: rgba(0, 0, 0, 0.9);
    color: var(--rating-gold);
    font-weight: 800;
    font-size: 13px;
    padding: 6px 10px;
    border-radius: var(--radius-md);
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(8px);
    box-shadow: var(--shadow-md);
    z-index: 2;
  }

  .hover-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.85);
    display: grid;
    place-items: center;
    opacity: 0;
    transition: opacity var(--transition-normal);
    backdrop-filter: blur(4px);
    z-index: 3;
  }

  .movie-tile:hover .hover-overlay {
    opacity: 1;
  }

  .view-details {
    color: white;
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 12px 20px;
    background: var(--accent-primary);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .movie-info {
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: var(--surface-1);
    border-top: 1px solid var(--border-light);
  }

  .movie-title {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: 2.6em;
    letter-spacing: -0.2px;
  }

  .movie-year {
    color: var(--text-secondary);
    font-size: 14px;
    font-weight: 600;
    opacity: 0.8;
    background: var(--surface-2);
    padding: 4px 8px;
    border-radius: var(--radius-sm);
    display: inline-block;
    width: fit-content;
  }

  .movie-overview {
    color: var(--text-tertiary);
    font-size: 13px;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: 2.8em;
    opacity: 0.8;
  }
  
  @media (max-width: 768px) {
    .movie-info {
      padding: 16px;
    }
    
    .movie-title {
      font-size: 15px;
      min-height: 2.4em;
    }
    
    .movie-overview {
      font-size: 12px;
      -webkit-line-clamp: 2;
      min-height: 2.4em;
    }
    
    .rating-badge {
      top: 8px;
      left: 8px;
      font-size: 12px;
      padding: 4px 8px;
    }
    
    .movie-tile:hover {
      transform: translateY(-4px);
    }
  }
  
  @media (max-width: 480px) {
    .movie-info {
      padding: 14px;
    }
    
    .movie-title {
      font-size: 14px;
      min-height: 2.2em;
    }
    
    .movie-overview {
      font-size: 11px;
      -webkit-line-clamp: 1;
      min-height: 1.4em;
    }
    
    .rating-badge {
      top: 6px;
      left: 6px;
      font-size: 11px;
      padding: 3px 6px;
    }
  }
</style>
  