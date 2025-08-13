<script>
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';
  
  export let movie = null;
  
  const dispatch = createEventDispatcher();
  
  let modal;
  let backdrop;
  let isVisible = false;
  let isLoading = false;
  
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
  
  // Helper function to get movie data with fallbacks
  function getMovieValue(movie, ...keys) {
    for (const key of keys) {
      if (movie[key] !== null && movie[key] !== undefined && movie[key] !== '') {
        return movie[key];
      }
    }
    return null;
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
    // Check if we have detailed movie data (not just search results)
    isLoading = !movie.genres && !movie.genreNames && movie.genre && movie.genre.length > 0;
  }
</script>

{#if movie}
  <div 
    class="modal-backdrop {isVisible ? 'visible' : ''}"
    bind:this={backdrop}
    on:click={handleBackdropClick}
    on:keydown={(e) => e.key === 'Escape' && close()}
    role="dialog"
    aria-modal="true"
    aria-labelledby="movie-title"
    tabindex="-1"
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
        {#if isLoading}
          <div class="loading-state">
            <div class="loading-spinner"></div>
            <p>Loading movie details...</p>
          </div>
        {:else}
          <div class="movie-header">
          <div class="poster-section">
            {#if getMovieValue(movie, 'poster', 'Poster') && getMovieValue(movie, 'poster', 'Poster') !== 'N/A'}
              <img 
                src={getMovieValue(movie, 'poster', 'Poster')} 
                alt={getMovieValue(movie, 'title', 'Title')} 
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
            <h1 id="movie-title" class="movie-title">{getMovieValue(movie, 'title', 'Title') || 'Unknown Title'}</h1>
            
            <div class="movie-meta">
              {#if getMovieValue(movie, 'year', 'Year')}
                <span class="meta-item year">{getMovieValue(movie, 'year', 'Year')}</span>
              {/if}
              {#if getMovieValue(movie, 'runtime')}
                <span class="meta-item runtime">{formatRuntime(getMovieValue(movie, 'runtime'))}</span>
              {/if}
              {#if getMovieValue(movie, 'originalLanguage')}
                <span class="meta-item language">{getMovieValue(movie, 'originalLanguage').toUpperCase()}</span>
              {/if}
            </div>
            
            {#if movie.genreNames && movie.genreNames.length > 0}
              <div class="genres">
                {#each movie.genreNames as genreName}
                  <span class="genre-tag">{genreName}</span>
                {/each}
              </div>
            {:else if movie.genre && movie.genre.length > 0}
              <div class="genres">
                {#each movie.genre as genreId}
                  <span class="genre-tag">{genreId}</span>
                {/each}
              </div>
            {/if}
            
            <div class="movie-stats">
              {#if getMovieValue(movie, 'rating', 'imdbRating')}
                <div class="rating-section">
                  <div class="imdb-rating" style="--rating-color: {getRatingColor(formatRating(getMovieValue(movie, 'rating', 'imdbRating')))}">
                    <span class="rating-score">⭐ {getMovieValue(movie, 'rating', 'imdbRating')}</span>
                    {#if getMovieValue(movie, 'voteCount')}
                      <span class="rating-votes">({getMovieValue(movie, 'voteCount').toLocaleString()} votes)</span>
                    {/if}
                  </div>
                </div>
              {/if}
              
              {#if getMovieValue(movie, 'popularity')}
                <div class="popularity-badge">
                  <span class="popularity-label">Popularity</span>
                  <span class="popularity-value">{Math.round(getMovieValue(movie, 'popularity'))}</span>
                </div>
              {/if}
            </div>
          </div>
        </div>
        
        {#if getMovieValue(movie, 'overview', 'Plot')}
          <div class="plot-section">
            <h3>Overview</h3>
            <p class="plot-text">{getMovieValue(movie, 'overview', 'Plot')}</p>
          </div>
        {/if}
        
        {#if getMovieValue(movie, 'tagline')}
          <div class="tagline-section">
            <h3>Tagline</h3>
            <p class="tagline-text">"{getMovieValue(movie, 'tagline')}"</p>
          </div>
        {/if}
        
        {#if getMovieValue(movie, 'releaseDate')}
          <div class="release-section">
            <h3>Release Date</h3>
            <p class="release-text">
              {new Date(getMovieValue(movie, 'releaseDate')).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        {/if}
        
        {#if getMovieValue(movie, 'originalTitle') && getMovieValue(movie, 'originalTitle') !== getMovieValue(movie, 'title', 'Title')}
          <div class="original-title-section">
            <h3>Original Title</h3>
            <p class="original-title-text">{getMovieValue(movie, 'originalTitle')}</p>
          </div>
        {/if}
        
        {#if getMovieValue(movie, 'budget') && getMovieValue(movie, 'budget') > 0}
          <div class="budget-section">
            <h3>Budget</h3>
            <p class="budget-text">${getMovieValue(movie, 'budget').toLocaleString()}</p>
          </div>
        {/if}
        
        {#if getMovieValue(movie, 'revenue') && getMovieValue(movie, 'revenue') > 0}
          <div class="revenue-section">
            <h3>Revenue</h3>
            <p class="revenue-text">${getMovieValue(movie, 'revenue').toLocaleString()}</p>
          </div>
        {/if}
        
        {#if getMovieValue(movie, 'status')}
          <div class="status-section">
            <h3>Status</h3>
            <p class="status-text">{getMovieValue(movie, 'status')}</p>
          </div>
        {/if}
        
        {#if getMovieValue(movie, 'voteCount') && getMovieValue(movie, 'voteCount') > 0}
          <div class="votes-section">
            <h3>Vote Count</h3>
            <p class="votes-text">{getMovieValue(movie, 'voteCount').toLocaleString()} votes</p>
          </div>
          {/if}
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
    backdrop-filter: blur(8px);
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
    border: 1px solid var(--border-medium);
  }
  
  .modal-container.visible {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
  
  .modal-close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 44px;
    height: 44px;
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
    backdrop-filter: blur(12px);
    box-shadow: var(--shadow-md);
  }
  
  .modal-close:hover {
    background: var(--surface-2);
    border-color: var(--border-strong);
    transform: scale(1.1);
    box-shadow: var(--shadow-lg);
  }
  
  .modal-content {
    max-height: 90vh;
    overflow-y: auto;
    padding: 32px;
  }
  
  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 32px;
    text-align: center;
  }
  
  .loading-spinner {
    width: 48px;
    height: 48px;
    border: 4px solid var(--border-light);
    border-top: 4px solid var(--accent-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 24px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .loading-state p {
    margin: 0;
    font-size: 18px;
    color: var(--text-secondary);
    font-weight: 500;
  }
  
  .movie-header {
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 32px;
    margin-bottom: 40px;
  }
  
  .poster-section {
    position: relative;
  }
  
  .movie-poster {
    width: 100%;
    height: auto;
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-xl);
    border: 1px solid var(--border-medium);
  }
  
  .poster-placeholder {
    width: 100%;
    aspect-ratio: 2/3;
    background: var(--surface-2);
    border: 2px dashed var(--border-medium);
    border-radius: var(--radius-xl);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--text-tertiary);
    font-size: 48px;
  }
  
  .poster-placeholder p {
    margin-top: 12px;
    font-size: 14px;
    text-align: center;
  }
  
  .movie-title {
    margin: 0 0 20px 0;
    font-size: 2.75rem;
    line-height: 1.2;
    color: var(--text-primary);
    font-weight: 800;
    letter-spacing: -0.5px;
  }
  
  .movie-meta {
    display: flex;
    gap: 16px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  
  .meta-item {
    padding: 8px 16px;
    background: var(--surface-2);
    border: 1px solid var(--border-medium);
    border-radius: var(--radius-md);
    font-size: 14px;
    color: var(--text-secondary);
    font-weight: 600;
    backdrop-filter: blur(8px);
    transition: all var(--transition-fast);
  }
  
  .meta-item:hover {
    background: var(--surface-3);
    border-color: var(--border-strong);
    transform: translateY(-1px);
  }
  
  .genres {
    display: flex;
    gap: 10px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }
  
  .genre-tag {
    padding: 8px 16px;
    background: var(--accent-primary);
    color: white;
    border-radius: var(--radius-md);
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    box-shadow: var(--shadow-md);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all var(--transition-fast);
  }
  
  .genre-tag:hover {
    background: var(--accent-primary-dark);
    transform: translateY(-1px);
    box-shadow: var(--shadow-lg);
  }
  
  .movie-stats {
    display: flex;
    gap: 16px;
    margin-bottom: 28px;
    flex-wrap: wrap;
  }
  
  .rating-section {
    flex: 1;
    min-width: 200px;
  }
  
  .popularity-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 20px;
    background: var(--surface-2);
    border: 1px solid var(--border-medium);
    border-radius: var(--radius-lg);
    backdrop-filter: blur(8px);
    min-width: 120px;
  }
  
  .popularity-label {
    font-size: 12px;
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
    margin-bottom: 4px;
  }
  
  .popularity-value {
    font-size: 24px;
    font-weight: 800;
    color: var(--accent-primary);
  }
  
  .imdb-rating {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    background: var(--surface-2);
    border: 1px solid var(--border-medium);
    border-radius: var(--radius-lg);
    border-left: 4px solid var(--rating-color);
    backdrop-filter: blur(8px);
  }
  
  .rating-score {
    font-size: 20px;
    font-weight: 800;
    color: var(--rating-color);
  }
  
  .rating-votes {
    font-size: 14px;
    color: var(--text-tertiary);
  }
  
  .crew-section {
    margin-bottom: 20px;
  }
  
  .crew-section h3 {
    margin: 0 0 8px 0;
    font-size: 16px;
    color: var(--text-primary);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .crew-section p {
    margin: 0;
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.6;
  }
  
  .plot-section,
  .tagline-section,
  .awards-section,
  .box-office-section,
  .runtime-section,
  .release-section,
  .votes-section,
  .popularity-section,
  .budget-section,
  .revenue-section,
  .status-section {
    margin-bottom: 32px;
  }
  
  .plot-section h3,
  .tagline-section h3,
  .awards-section h3,
  .box-office-section h3,
  .runtime-section h3,
  .release-section h3,
  .votes-section h3,
  .popularity-section h3,
  .budget-section h3,
  .revenue-section h3,
  .status-section h3 {
    margin: 0 0 16px 0;
    font-size: 20px;
    color: var(--text-primary);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .plot-text,
  .tagline-text {
    margin: 0;
    font-size: 18px;
    color: var(--text-primary);
    line-height: 1.6;
    background: var(--surface-2);
    padding: 24px;
    border-radius: var(--radius-lg);
    border: 2px solid var(--accent-primary);
    font-style: italic;
    text-align: center;
    font-weight: 500;
  }
  
  .awards-text,
  .awards-text,
  .box-office-text,
  .runtime-text,
  .release-text,
  .votes-text,
  .popularity-text,
  .budget-text,
  .revenue-text,
  .status-text {
    margin: 0;
    font-size: 16px;
    color: var(--text-secondary);
    line-height: 1.7;
    background: var(--surface-1);
    padding: 20px;
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-light);
  }
  
  @media (max-width: 768px) {
    .modal-container {
      max-height: 95vh;
    }
    
    .movie-header {
      grid-template-columns: 1fr;
      gap: 20px;
    }
    
    .poster-section {
      max-width: 280px;
      margin: 0 auto;
    }
    
    .movie-title {
      font-size: 2.25rem;
      text-align: center;
    }
    
    .modal-content {
      padding: 20px;
    }
    
    .movie-meta {
      justify-content: center;
    }
    
    .genres {
      justify-content: center;
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
      font-size: 2rem;
    }
    
    .movie-meta {
      gap: 8px;
    }
    
    .meta-item {
      font-size: 12px;
      padding: 6px 12px;
    }
    
    .modal-content {
      padding: 16px;
    }
  }
</style>


