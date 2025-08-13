<script>
  import { onMount } from 'svelte';
  import { filters } from '../stores.js';
  import Section from '../components/Section.svelte';
  import MovieGrid from '../components/MovieGrid.svelte';
  import Carousel from '../components/Carousel.svelte';
  import SkeletonCard from '../components/SkeletonCard.svelte';
  import GenreFilter from '../components/GenreFilter.svelte';
  import YearFilter from '../components/YearFilter.svelte';
  import SortFilter from '../components/SortFilter.svelte';
  import { discoverMovies, transformMovieData } from '../services/tmdb.js';
  
  export let onSelect;
  
  let movies = [];
  let loading = true;
  let error = '';
  let currentPage = 1;
  let hasMore = true;
  
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
      // Build TMDB discover parameters
      const discoverParams = {
        page,
        sort_by: $filters.sort || 'popularity.desc',
        include_adult: $filters.includeAdult || false
      };
      
      if ($filters.genre) discoverParams.with_genres = $filters.genre;
      if ($filters.year) discoverParams.primary_release_year = $filters.year;
      
      const data = await discoverMovies(discoverParams);
      
      if (!data.results) {
        error = 'No movies found';
        hasMore = false;
        return;
      }
      
      const newMovies = data.results.map(transformMovieData);
      
      if (reset) {
        movies = newMovies;
      } else {
        movies = [...movies, ...newMovies];
      }
      
      // TMDB returns up to 20 per page
      hasMore = newMovies.length === 20 && page < data.total_pages;
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
  
  function handleGenreChange(event) {
    const { genre } = event.detail;
    filters.update(current => ({ ...current, genre }));
    loadMovies(1, true);
  }
  
  function handleYearChange(event) {
    const { year } = event.detail;
    filters.update(current => ({ ...current, year }));
    loadMovies(1, true);
  }
  
  function handleSortChange(event) {
    const { sort } = event.detail;
    filters.update(current => ({ ...current, sort }));
    loadMovies(1, true);
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
  
  <!-- Filters Section -->
  <div class="filters-section">
    <div class="filters-container">
      <div class="filters-header">
        <h3>Filter & Sort</h3>
        <p>Refine your movie discovery</p>
      </div>
      <div class="filters-grid">
        <GenreFilter 
          selectedGenre={$filters.genre} 
          on:change={handleGenreChange}
        />
        <YearFilter 
          selectedYear={$filters.year} 
          on:change={handleYearChange}
        />
        <SortFilter 
          selectedSort={$filters.sort} 
          on:change={handleSortChange}
        />
      </div>
    </div>
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
    padding: 40px 0;
    background: var(--surface-1);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-lg);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .page-header h1 {
    margin: 0 0 16px 0;
    font-size: 3rem;
    color: var(--text-primary);
    font-weight: 800;
    letter-spacing: -1px;
  }
  
  .page-subtitle {
    font-size: 1.25rem;
    color: var(--text-secondary);
    margin: 0;
    font-weight: 500;
  }
  
  .filters-section {
    margin-bottom: 48px;
  }
  
  .filters-container {
    background: var(--surface-1);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-lg);
    padding: 32px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .filters-header {
    text-align: center;
    margin-bottom: 32px;
  }
  
  .filters-header h3 {
    margin: 0 0 8px 0;
    font-size: 1.5rem;
    color: var(--text-primary);
    font-weight: 700;
  }
  
  .filters-header p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 1rem;
    font-weight: 500;
  }
  
  .filters-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 24px;
    align-items: end;
  }
  
  .movies-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 24px;
    margin-bottom: 32px;
  }
  
  .load-more {
    text-align: center;
    margin-top: 32px;
  }
  
  .load-more-btn {
    background: var(--accent-primary);
    color: white;
    border: none;
    padding: 16px 32px;
    border-radius: var(--radius-lg);
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-normal);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
  
  .load-more-btn:hover:not(:disabled) {
    background: var(--accent-primary-dark);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  .load-more-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  .error-state,
  .empty-state {
    text-align: center;
    padding: 80px 24px;
    color: var(--text-secondary);
  }
  
  .error-icon,
  .empty-icon {
    font-size: 64px;
    margin-bottom: 24px;
    display: block;
  }
  
  .error-state h3,
  .empty-state h3 {
    margin: 0 0 16px 0;
    font-size: 1.5rem;
    color: var(--text-primary);
    font-weight: 700;
  }
  
  .error-state p,
  .empty-state p {
    margin: 0 0 24px 0;
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  .retry-btn {
    background: var(--accent-primary);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: var(--radius-lg);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-normal);
  }
  
  .retry-btn:hover {
    background: var(--accent-primary-dark);
    transform: translateY(-1px);
  }
  
  .loading-state {
    padding: 40px 0;
  }
  
  .skeleton-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 24px;
  }
  
  @media (max-width: 768px) {
    .page-header {
      padding: 32px 0;
      margin-bottom: 32px;
    }
    
    .page-header h1 {
      font-size: 2.5rem;
    }
    
    .filters-container {
      padding: 24px;
      margin-bottom: 32px;
    }
    
    .filters-grid {
      grid-template-columns: 1fr;
      gap: 20px;
    }
    
    .movies-grid {
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 20px;
    }
    
    .skeleton-grid {
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 20px;
    }
  }
  
  @media (max-width: 480px) {
    .page-header {
      padding: 24px 0;
      margin-bottom: 24px;
    }
    
    .page-header h1 {
      font-size: 2rem;
    }
    
    .filters-container {
      padding: 20px;
      margin-bottom: 24px;
    }
    
    .filters-header h3 {
      font-size: 1.25rem;
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
