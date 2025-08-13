<!-- src/App.svelte -->

<script>
  import { onMount } from 'svelte';
  import Header from './components/Header.svelte';
  import Navigation from './components/Navigation.svelte';
  import SearchBar from './components/SearchBar.svelte';
  import MovieGrid from './components/MovieGrid.svelte';
  import MovieItem from './components/MovieItem.svelte';
  import MovieModal from './components/MovieModal.svelte';
  import Section from './components/Section.svelte';
  import Carousel from './components/Carousel.svelte';
  import SkeletonCard from './components/SkeletonCard.svelte';
  import MoviesPage from './pages/MoviesPage.svelte';
  import TVShowsPage from './pages/TVShowsPage.svelte';
  import PeoplePage from './pages/PeoplePage.svelte';
  import NewsPage from './pages/NewsPage.svelte';
  import AwardsPage from './pages/AwardsPage.svelte';
  import { 
    getTrendingMovies, 
    getTopRatedMovies, 
    getNewReleases,
    searchMovies,
    getMovieDetails,
    getMovieGenres,
    getConfiguration,
    transformMovieData
  } from './services/tmdb.js';
  import { tmdbGenres, tmdbConfiguration, page } from './stores.js';

  let trending = [];
  let topRated = [];
  let newReleases = [];
  let selectedMovie = null;
  let loading = {
    trending: true,
    topRated: true,
    newReleases: true
  };

  async function loadHomeData() {
    try {
      // Load genres and configuration first
      const [genresData, configData] = await Promise.all([
        getMovieGenres(),
        getConfiguration()
      ]);
      
      tmdbGenres.set(genresData.genres || []);
      tmdbConfiguration.set(configData);
      
      // Now load movie data after genres are available
      const [trendingData, topRatedData, newReleasesData] = await Promise.all([
        getTrendingMovies(),
        getTopRatedMovies(),
        getNewReleases()
      ]);
      
      // Transform movies and add genre names
      const addGenreNames = (movies) => {
        return movies.map(movie => {
          const transformed = transformMovieData(movie);
          if ($tmdbGenres.length > 0 && transformed.genre) {
            transformed.genreNames = transformed.genre.map(genreId => {
              const genre = $tmdbGenres.find(g => g.id === genreId);
              return genre ? genre.name : genreId;
            });
          }
          return transformed;
        });
      };
      
      trending = addGenreNames(trendingData.results || []);
      topRated = addGenreNames(topRatedData.results || []);
      newReleases = addGenreNames(newReleasesData.results || []);
      
    } catch (error) {
      console.error('Error loading home data:', error);
    } finally {
      loading.trending = false;
      loading.topRated = false;
      loading.newReleases = false;
    }
  }

  async function handleShowDetails(movie) {
    // Validate that we have a movie with an ID
    if (!movie || !movie.id) {
      console.error('Invalid movie data - missing ID:', movie);
      // Try to use the movie as-is if it has basic info
      if (movie && (movie.title || movie.Title)) {
        selectedMovie = movie;
        return;
      }
      return;
    }
    
    // Set the movie immediately to show loading state
    selectedMovie = movie;
    
    try {
      const data = await getMovieDetails(movie.id);
      
      // Transform the detailed movie data with genre names
      const transformedMovie = transformMovieData(data);
      
      // Add genre names from the genres store
      if ($tmdbGenres.length > 0 && transformedMovie.genre) {
        transformedMovie.genreNames = transformedMovie.genre.map(genreId => {
          const genre = $tmdbGenres.find(g => g.id === genreId);
          return genre ? genre.name : genreId;
        });
      }
      
      selectedMovie = transformedMovie;
    } catch (error) {
      console.error('Error loading movie details:', error);
      // Fallback to the original movie data
      if ($tmdbGenres.length > 0 && movie.genre) {
        movie.genreNames = movie.genre.map(genreId => {
          const genre = $tmdbGenres.find(g => g.id === genreId);
          return genre ? genre.name : genreId;
        });
      }
      selectedMovie = movie;
    }
  }

  async function handleSearch(query) {
    try {
      const results = await searchMovies(query);
      // Handle search results - could navigate to a search page or show results inline
      console.log('Search results:', results);
    } catch (error) {
      console.error('Search error:', error);
    }
  }

  function handleSearchClear() {
    // Handle search clear
    console.log('Search cleared');
  }

  function handlePageChange(event) {
    const { page: newPage } = event.detail;
    page.set(newPage);
  }

  onMount(() => {
    loadHomeData();
  });
</script>

<div class="page-wrapper">
  <Header title="Bingelist" />
  <Navigation on:pageChange={handlePageChange} />
  
  <main class="main-content">
    {#if $page === 'movies'}
      <!-- Movies Page -->
      <MoviesPage onSelect={handleShowDetails} />

    {:else if $page === 'tv'}
      <!-- TV Shows Page -->
      <TVShowsPage onSelect={handleShowDetails} />

    {:else if $page === 'celebs'}
      <!-- Celebrities Page -->
      <PeoplePage onSelect={handleShowDetails} />

    {:else if $page === 'awards'}
      <!-- Awards Page -->
      <AwardsPage />

    {:else if $page === 'news'}
      <!-- News Page -->
      <NewsPage />

    {:else}
      <!-- Default Homepage -->
      <div class="hero">
        <div class="hero-inner">
          <h1>Welcome to Bingelist</h1>
          <p class="tag">Entertainment as a list</p>
          <div class="search-wrap">
            <SearchBar on:search={(e) => handleSearch(e.detail.query)} on:clear={handleSearchClear} />
          </div>
        </div>
      </div>

      <!-- Trending Movies -->
      <Section title="Trending Now" subtitle="What's hot this week">
        {#if loading.trending}
          <div class="skeleton-grid">
            {#each Array(8) as _}
              <SkeletonCard />
            {/each}
          </div>
        {:else}
          <Carousel items={trending} itemWidth={200} showArrows={true}>
            {#each trending as movie (movie.imdbID)}
              <MovieItem {movie} on:showDetails={(e) => handleShowDetails(e.detail.movie)} />
            {/each}
          </Carousel>
        {/if}
      </Section>

      <!-- New Releases -->
      <Section title="New Releases" subtitle="Fresh content just for you">
        {#if loading.newReleases}
          <div class="skeleton-grid">
            {#each Array(8) as _}
              <SkeletonCard />
            {/each}
          </div>
        {:else}
          <Carousel items={newReleases} itemWidth={200} showArrows={true}>
            {#each newReleases as movie (movie.imdbID)}
              <MovieItem {movie} on:showDetails={(e) => handleShowDetails(e.detail.movie)} />
            {/each}
          </Carousel>
        {/if}
      </Section>

      <!-- Top Rated -->
      <Section title="Top Rated" subtitle="Critically acclaimed favorites">
        {#if loading.topRated}
          <div class="skeleton-grid">
            {#each Array(8) as _}
              <SkeletonCard />
            {/each}
          </div>
        {:else}
          <Carousel items={topRated} itemWidth={200} showArrows={true}>
            {#each topRated as movie (movie.imdbID)}
              <MovieItem {movie} on:showDetails={(e) => handleShowDetails(e.detail.movie)} />
            {/each}
          </Carousel>
        {/if}
      </Section>
    {/if}
  </main>
</div>

<MovieModal movie={selectedMovie} on:close={() => selectedMovie = null} />

<style>
  :global(body) {
    background: var(--bg-primary);
    color: var(--text-primary);
    margin: 0;
    padding: 0;
  }
  
  .page-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .main-content {
    flex: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    width: 100%;
    box-sizing: border-box;
  }
  
  .hero {
    background: var(--surface-1);
    margin: 0 -24px 80px -24px;
    padding: 0 24px;
    border-bottom: 1px solid var(--border-light);
    position: relative;
    overflow: hidden;
  }
  
  .hero-inner { 
    padding: 80px 0 64px; 
    text-align: center; 
    position: relative;
    z-index: 1;
  }
  
  .hero h1 { 
    margin: 0 0 20px; 
    font-size: clamp(36px, 6vw, 56px); 
    color: var(--text-primary);
    font-weight: 800;
    letter-spacing: -1.5px;
    line-height: 1.1;
  }
  
  .tag { 
    color: var(--text-secondary); 
    margin: 0 0 40px; 
    font-size: 20px;
    font-weight: 500;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .search-wrap {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .skeleton-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 24px;
  }
  
  @media (max-width: 768px) {
    .main-content {
      padding: 0 20px;
    }
    
    .hero {
      margin: 0 -20px 60px -20px;
      padding: 0 20px;
    }
    
    .hero-inner {
      padding: 60px 0 48px;
    }
    
    .hero h1 {
      font-size: clamp(28px, 6vw, 42px);
    }
    
    .tag {
      font-size: 18px;
      margin-bottom: 32px;
    }
    
    .skeleton-grid {
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 20px;
    }
  }
  
  @media (max-width: 480px) {
    .main-content {
      padding: 0 16px;
    }
    
    .hero {
      margin: 0 -16px 48px -16px;
      padding: 0 16px;
    }
    
    .hero-inner {
      padding: 48px 0 40px;
    }
    
    .hero h1 {
      font-size: clamp(24px, 6vw, 32px);
    }
    
    .tag {
      font-size: 16px;
      margin-bottom: 24px;
    }
    
    .skeleton-grid {
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 16px;
    }
  }
</style>
