<script>
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';
  
  export let movie = null;
  
  const dispatch = createEventDispatcher();
  
  let modal;
  let backdrop;
  let isVisible = false;
  
  function close() {
    isVisible = false;
    setTimeout(() => {
      dispatch('close');
    }, 200);
  }
  
  function handleBackdropClick(event) {
    if (event.target === backdrop) {
      close();
    }
  }
  
  function handleKeydown(event) {
    if (event.key === 'Escape') {
      close();
    }
  }
  
  function formatRuntime(minutes) {
    if (!minutes || minutes === 'N/A') return '';
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  }
  
  function formatRating(rating) {
    if (!rating || rating === 'N/A') return null;
    const num = parseFloat(rating);
    if (isNaN(num)) return null;
    return num;
  }
  
  function getRatingColor(rating) {
    if (rating >= 8.0) return 'var(--rating-gold)';
    if (rating >= 6.0) return 'var(--rating-silver)';
    return 'var(--rating-bronze)';
  }
  
  onMount(() => {
    if (movie) {
      isVisible = true;
      document.body.style.overflow = 'hidden';
    }
    
    document.addEventListener('keydown', handleKeydown);
    
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = '';
    };
  });
  
  $: if (movie) {
    isVisible = true;
    document.body.style.overflow = 'hidden';
  }
</script>

{#if movie}
  <div 
    class="modal-backdrop {isVisible ? 'visible' : ''}"
    bind:this={backdrop}
    on:click={handleBackdropClick}
    role="dialog"
    aria-modal="true"
    aria-labelledby="movie-title"
  >
    <div 
      class="modal-container {isVisible ? 'visible' : ''}"
      bind:this={modal}
      role="document"
    >
      <button 
        class="modal-close"
        on:click={close}
        aria-label="Close modal"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
      
      <div class="modal-content">
        <div class="movie-header">
          <div class="poster-section">
            {#if movie.Poster && movie.Poster !== 'N/A'}
              <img 
                src={movie.Poster} 
                alt={movie.Title} 
                class="movie-poster"
                loading="lazy"
              />
            {:else}
              <div class="poster-placeholder">
                <span>🎬</span>
                <p>No poster available</p>
              </div>
            {/if}
          </div>
          
          <div class="movie-info">
            <h1 id="movie-title" class="movie-title">{movie.Title}</h1>
            
            <div class="movie-meta">
              {#if movie.Year}
                <span class="meta-item year">{movie.Year}</span>
              {/if}
              {#if movie.Runtime}
                <span class="meta-item runtime">{formatRuntime(movie.Runtime)}</span>
              {/if}
              {#if movie.Rated}
                <span class="meta-item rating">{movie.Rated}</span>
              {/if}
            </div>
            
            {#if movie.Genre}
              <div class="genres">
                {#each movie.Genre.split(', ') as genre}
                  <span class="genre-tag">{genre}</span>
                {/each}
              </div>
            {/if}
            
            {#if movie.imdbRating}
              <div class="rating-section">
                <div class="imdb-rating" style="--rating-color: {getRatingColor(formatRating(movie.imdbRating))}">
                  <span class="rating-score">⭐ {movie.imdbRating}</span>
                  {#if movie.imdbVotes}
                    <span class="rating-votes">({movie.imdbVotes.toLocaleString()} votes)</span>
                  {/if}
                </div>
              </div>
            {/if}
            
            {#if movie.Director}
              <div class="crew-section">
                <h3>Director</h3>
                <p>{movie.Director}</p>
              </div>
            {/if}
            
            {#if movie.Writers}
              <div class="crew-section">
                <h3>Writers</h3>
                <p>{movie.Writers}</p>
              </div>
            {/if}
            
            {#if movie.Actors}
              <div class="crew-section">
                <h3>Cast</h3>
                <p>{movie.Actors}</p>
              </div>
            {/if}
          </div>
        </div>
        
        {#if movie.Plot}
          <div class="plot-section">
            <h3>Plot</h3>
            <p class="plot-text">{movie.Plot}</p>
          </div>
        {/if}
        
        {#if movie.Awards && movie.Awards !== 'N/A'}
          <div class="awards-section">
            <h3>Awards</h3>
            <p class="awards-text">{movie.Awards}</p>
          </div>
        {/if}
        
        {#if movie.BoxOffice && movie.BoxOffice !== 'N/A'}
          <div class="box-office-section">
            <h3>Box Office</h3>
            <p class="box-office-text">{movie.BoxOffice}</p>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: var(--bg-overlay);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    z-index: var(--z-modal-backdrop);
    opacity: 0;
    visibility: hidden;
    transition: all var(--transition-normal);
    backdrop-filter: blur(4px);
  }
  
  .modal-backdrop.visible {
    opacity: 1;
    visibility: visible;
  }
  
  .modal-container {
    background: var(--bg-elevated);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-xl);
    max-width: 900px;
    width: 100%;
    max-height: 90vh;
    overflow: hidden;
    position: relative;
    transform: scale(0.9) translateY(20px);
    opacity: 0;
    transition: all var(--transition-normal);
  }
  
  .modal-container.visible {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
  
  .modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 40px;
    height: 40px;
    background: var(--surface-1);
    border: 1px solid var(--border-medium);
    border-radius: 50%;
    color: var(--text-primary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);
    z-index: 10;
    backdrop-filter: blur(8px);
  }
  
  .modal-close:hover {
    background: var(--surface-2);
    border-color: var(--border-strong);
    transform: scale(1.1);
  }
  
  .modal-content {
    max-height: 90vh;
    overflow-y: auto;
    padding: 24px;
  }
  
  .movie-header {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 24px;
    margin-bottom: 32px;
  }
  
  .poster-section {
    position: relative;
  }
  
  .movie-poster {
    width: 100%;
    height: auto;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
  }
  
  .poster-placeholder {
    width: 100%;
    aspect-ratio: 2/3;
    background: var(--surface-2);
    border: 2px dashed var(--border-medium);
    border-radius: var(--radius-lg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--text-tertiary);
    font-size: 48px;
  }
  
  .poster-placeholder p {
    margin-top: 8px;
    font-size: 14px;
    text-align: center;
  }
  
  .movie-title {
    margin: 0 0 16px 0;
    font-size: 2.5rem;
    line-height: 1.2;
    color: var(--text-primary);
  }
  
  .movie-meta {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }
  
  .meta-item {
    padding: 4px 12px;
    background: var(--surface-2);
    border: 1px solid var(--border-medium);
    border-radius: var(--radius-sm);
    font-size: 14px;
    color: var(--text-secondary);
    font-weight: 500;
  }
  
  .genres {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  
  .genre-tag {
    padding: 6px 12px;
    background: var(--accent-primary);
    color: white;
    border-radius: var(--radius-sm);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .rating-section {
    margin-bottom: 24px;
  }
  
  .imdb-rating {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background: var(--surface-2);
    border: 1px solid var(--border-medium);
    border-radius: var(--radius-md);
    border-left: 4px solid var(--rating-color);
  }
  
  .rating-score {
    font-size: 18px;
    font-weight: 700;
    color: var(--rating-color);
  }
  
  .rating-votes {
    font-size: 14px;
    color: var(--text-tertiary);
  }
  
  .crew-section {
    margin-bottom: 16px;
  }
  
  .crew-section h3 {
    margin: 0 0 4px 0;
    font-size: 16px;
    color: var(--text-primary);
    font-weight: 600;
  }
  
  .crew-section p {
    margin: 0;
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.5;
  }
  
  .plot-section,
  .awards-section,
  .box-office-section {
    margin-bottom: 24px;
  }
  
  .plot-section h3,
  .awards-section h3,
  .box-office-section h3 {
    margin: 0 0 12px 0;
    font-size: 18px;
    color: var(--text-primary);
    font-weight: 600;
  }
  
  .plot-text,
  .awards-text,
  .box-office-text {
    margin: 0;
    font-size: 16px;
    color: var(--text-secondary);
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    .modal-container {
      max-height: 95vh;
    }
    
    .movie-header {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    
    .poster-section {
      max-width: 250px;
      margin: 0 auto;
    }
    
    .movie-title {
      font-size: 2rem;
    }
    
    .modal-content {
      padding: 16px;
    }
  }
  
  @media (max-width: 480px) {
    .modal-backdrop {
      padding: 8px;
    }
    
    .modal-container {
      border-radius: var(--radius-lg);
    }
    
    .movie-title {
      font-size: 1.75rem;
    }
    
    .movie-meta {
      gap: 8px;
    }
    
    .meta-item {
      font-size: 12px;
      padding: 3px 8px;
    }
  }
</style>


