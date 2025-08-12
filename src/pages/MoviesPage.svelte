<script>
  import { onMount } from 'svelte';
  import { filters } from '../stores.js';
  import Section from '../components/Section.svelte';
  import MovieGrid from '../components/MovieGrid.svelte';
  import Carousel from '../components/Carousel.svelte';
  import SkeletonCard from '../components/SkeletonCard.svelte';
  
  export let onSelect;
  
  let movies = [];
  let loading = true;
  let error = '';
  let currentPage = 1;
  let hasMore = true;
  
  const OMDB_API_KEY = '8ac01c0f';
  
  async function loadMovies(page = 1, reset = false) {
    if (reset) {
      movies = [];
      currentPage = 1;
      hasMore = true;
    }
    
    if (!hasMore && !reset) return;
    
    loading = true;
    error = '';
    
    try {
      const params = new URLSearchParams({
        apikey: OMDB_API_KEY,
        s: 'movie',
        type: 'movie',
        page: page.toString()
      });
      
      if ($filters.genre) params.append('genre', $filters.genre);
      if ($filters.year) params.append('y', $filters.year);
      
      const response = await fetch(`http://www.omdbapi.com/?${params}`);
      const data = await response.json();
      
      if (data.Response === 'False') {
        error = data.Error || 'No movies found';
        hasMore = false;
        return;
      }
      
      const newMovies = data.Search || [];
      
      if (reset) {
        movies = newMovies;
      } else {
        movies = [...movies, ...newMovies];
      }
      
      hasMore = newMovies.length === 10; // OMDb returns max 10 per page
      currentPage = page;
      
    } catch (err) {
      error = 'Failed to load movies';
      console.error('Error loading movies:', err);
    } finally {
      loading = false;
    }
  }
  
  function loadMore() {
    if (!loading && hasMore) {
      loadMovies(currentPage + 1);
    }
  }
  
  function handleFilterChange() {
    loadMovies(1, true);
  }
  
  $: if ($filters.genre || $filters.year) {
    handleFilterChange();
  }
  
  onMount(() => {
    loadMovies(1, true);
  });
</script>

<div class="movies-page">
  <div class="page-header">
    <h1>Movies</h1>
    <p class="page-subtitle">Discover the latest and greatest films from around the world</p>
  </div>
  
  {#if error && movies.length === 0}
    <div class="error-state">
      <div class="error-icon">🎬</div>
      <h3>No movies found</h3>
      <p>{error}</p>
      <button class="retry-btn" on:click={() => loadMovies(1, true)}>
        Try Again
      </button>
    </div>
  {:else}
    <Section title="All Movies" subtitle="Browse our collection of films">
      {#if movies.length > 0}
        <div class="movies-grid">
          {#each movies as movie (movie.imdbID)}
            <MovieGrid movies={[movie]} {onSelect} />
          {/each}
        </div>
        
        {#if hasMore}
          <div class="load-more">
            <button 
              class="load-more-btn"
              on:click={loadMore}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load More Movies'}
            </button>
          </div>
        {/if}
      {:else if loading}
        <div class="loading-state">
          <div class="skeleton-grid">
            {#each Array(12) as _}
              <SkeletonCard />
            {/each}
          </div>
        </div>
      {:else}
        <div class="empty-state">
          <div class="empty-icon">🎭</div>
          <h3>No movies available</h3>
          <p>Try adjusting your filters or search criteria</p>
        </div>
      {/if}
    </Section>
  {/if}
</div>

<style>
  .movies-page {
    width: 100%;
  }
  
  .page-header {
    text-align: center;
    margin-bottom: 48px;
    padding: 32px 0;
    background: var(--gradient-hero);
    border-radius: var(--radius-xl);
  }
  
  .page-header h1 {
    margin: 0 0 16px 0;
    font-size: 3rem;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .page-subtitle {
    font-size: 1.25rem;
    color: var(--text-secondary);
    margin: 0;
  }
  
  .movies-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 32px;
  }
  
  .load-more {
    text-align: center;
    margin-top: 32px;
  }
  
  .load-more-btn {
    padding: 16px 32px;
    background: var(--accent-primary);
    color: white;
    border-radius: var(--radius-md);
    font-size: 16px;
    font-weight: 600;
    transition: all var(--transition-normal);
    box-shadow: var(--shadow-md);
  }
  
  .load-more-btn:hover:not(:disabled) {
    background: var(--accent-secondary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
  
  .load-more-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .error-state,
  .empty-state {
    text-align: center;
    padding: 64px 32px;
    color: var(--text-secondary);
  }
  
  .error-icon,
  .empty-icon {
    font-size: 64px;
    margin-bottom: 16px;
    opacity: 0.5;
  }
  
  .error-state h3,
  .empty-state h3 {
    margin: 0 0 8px 0;
    color: var(--text-primary);
  }
  
  .retry-btn {
    margin-top: 16px;
    padding: 12px 24px;
    background: var(--accent-primary);
    color: white;
    border-radius: var(--radius-md);
    font-weight: 600;
    transition: all var(--transition-normal);
  }
  
  .retry-btn:hover {
    background: var(--accent-secondary);
    transform: translateY(-1px);
  }
  
  .loading-state {
    padding: 32px 0;
  }
  
  .skeleton-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
  
  @media (max-width: 768px) {
    .page-header h1 {
      font-size: 2.5rem;
    }
    
    .page-subtitle {
      font-size: 1.125rem;
    }
    
    .movies-grid {
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 16px;
    }
    
    .skeleton-grid {
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 16px;
    }
  }
</style>
