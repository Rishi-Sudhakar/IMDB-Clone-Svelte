<!-- src/pages/TVShowsPage.svelte -->
<script>
  import { onMount } from 'svelte';
  import { filters } from '../stores.js';
  import Section from '../components/Section.svelte';
  import MovieGrid from '../components/MovieGrid.svelte';
  import Carousel from '../components/Carousel.svelte';
  import SkeletonCard from '../components/SkeletonCard.svelte';
  import { 
    getTrendingTVShows, 
    getPopularTVShows, 
    getTopRatedTVShows,
    discoverTVShows,
    transformTVShowData 
  } from '../services/tmdb.js';
  
  export let onSelect;
  
  let tvShows = [];
  let loading = true;
  let error = '';
  let currentPage = 1;
  let hasMore = true;
  
  // Homepage sections
  let trending = [];
  let popular = [];
  let topRated = [];
  let loadingHome = true;
  
  async function loadTVShows(page = 1, reset = false) {
    if (reset) {
      tvShows = [];
      currentPage = 1;
      hasMore = true;
    }
    
    if (!hasMore && !reset) return;
    
    loading = true;
    error = '';
    
    try {
      // Build TMDB discover parameters for TV shows
      const discoverParams = {
        page,
        sort_by: $filters.sort || 'popularity.desc',
        include_adult: $filters.includeAdult || false
      };
      
      if ($filters.genre) discoverParams.with_genres = $filters.genre;
      if ($filters.year) discoverParams.first_air_date_year = $filters.year;
      
      const data = await discoverTVShows(discoverParams);
      
      if (!data.results) {
        error = 'No TV shows found';
        hasMore = false;
        return;
      }
      
      const newShows = data.results.map(transformTVShowData);
      
      if (reset) {
        tvShows = newShows;
      } else {
        tvShows = [...tvShows, ...newShows];
      }
      
      // TMDB returns up to 20 per page
      hasMore = newShows.length === 20 && page < data.total_pages;
      currentPage = page;
      
    } catch (err) {
      error = 'Failed to load TV shows';
      console.error('Error loading TV shows:', err);
    } finally {
      loading = false;
    }
  }
  
  async function loadHome() {
    loadingHome = true;
    try {
      const [trendingData, popularData, topRatedData] = await Promise.all([
        getTrendingTVShows('week'),
        getPopularTVShows(),
        getTopRatedTVShows()
      ]);
      
      trending = (trendingData.results || []).map(transformTVShowData);
      popular = (popularData.results || []).map(transformTVShowData);
      topRated = (topRatedData.results || []).map(transformTVShowData);
      
    } catch (error) {
      console.error('Error loading TV shows homepage data:', error);
    } finally {
      loadingHome = false;
    }
  }
  
  function loadMore() {
    if (!loading && hasMore) {
      loadTVShows(currentPage + 1);
    }
  }
  
  function handleFilterChange() {
    loadTVShows(1, true);
  }
  
  $: if ($filters.genre || $filters.year) {
    handleFilterChange();
  }
  
  onMount(() => {
    loadHome();
    loadTVShows(1, true);
  });
</script>

<div class="tvshows-page">
  <div class="page-header">
    <h1>TV Shows</h1>
    <p class="page-subtitle">Discover the latest and greatest television series from around the world</p>
  </div>
  
  <!-- Homepage sections -->
  <Section title="Trending Now" subtitle="What everyone's watching on TV">
    {#if loadingHome}
      <div class="skeleton-grid">
        {#each Array(8) as _}
          <SkeletonCard />
        {/each}
      </div>
    {:else}
      <Carousel items={trending} itemWidth={180} showArrows={true}>
        {#each trending as show (show.id)}
          <MovieGrid movies={[show]} {onSelect} />
        {/each}
      </Carousel>
    {/if}
  </Section>
  
  <Section title="Popular TV Shows" subtitle="Most watched series">
    {#if loadingHome}
      <div class="skeleton-grid">
        {#each Array(8) as _}
          <SkeletonCard />
        {/each}
      </div>
    {:else}
      <Carousel items={popular} itemWidth={180} showArrows={true}>
        {#each popular as show (show.id)}
          <MovieGrid movies={[show]} {onSelect} />
        {/each}
      </Carousel>
    {/if}
  </Section>
  
  <Section title="Top Rated" subtitle="Critically acclaimed series">
    {#if loadingHome}
      <div class="skeleton-grid">
        {#each Array(8) as _}
          <SkeletonCard />
        {/each}
      </div>
    {:else}
      <Carousel items={topRated} itemWidth={180} showArrows={true}>
        {#each topRated as show (show.id)}
          <MovieGrid movies={[show]} {onSelect} />
        {/each}
      </Carousel>
    {/if}
  </Section>
  
  <!-- All TV Shows -->
  {#if error && tvShows.length === 0}
    <div class="error-state">
      <div class="error-icon">📺</div>
      <h3>No TV shows found</h3>
      <p>{error}</p>
      <button class="retry-btn" on:click={() => loadTVShows(1, true)}>
        Try Again
      </button>
    </div>
  {:else}
    <Section title="All TV Shows" subtitle="Browse our collection of series">
      {#if tvShows.length > 0}
        <div class="tvshows-grid">
          {#each tvShows as show (show.id)}
            <MovieGrid movies={[show]} {onSelect} />
          {/each}
        </div>
        
        {#if hasMore}
          <div class="load-more">
            <button 
              class="load-more-btn"
              on:click={loadMore}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load More TV Shows'}
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
          <div class="empty-icon">📺</div>
          <h3>No TV shows available</h3>
          <p>Try adjusting your filters or search criteria</p>
        </div>
      {/if}
    </Section>
  {/if}
</div>

<style>
  .tvshows-page {
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
  
  .tvshows-grid {
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
    
    .tvshows-grid {
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 16px;
    }
    
    .skeleton-grid {
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 16px;
    }
  }
</style>
