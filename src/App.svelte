<!-- src/App.svelte -->

<script>
  import Header from './components/Header.svelte';
  import Navigation from './components/Navigation.svelte';
  import SearchBar from './components/SearchBar.svelte';
  import MovieGrid from './components/MovieGrid.svelte';
  import MovieModal from './components/MovieModal.svelte';
  import Section from './components/Section.svelte';
  import Carousel from './components/Carousel.svelte';
  import SkeletonCard from './components/SkeletonCard.svelte';
  import MoviesPage from './pages/MoviesPage.svelte';
  import { lastQuery, page, filters } from './stores.js';
  import { onMount } from 'svelte';

  // search state
  let movies = [];
  let loading = false;
  let error = '';
  // homepage sections
  let trending = [];
  let topRated = [];
  let newReleases = [];
  let loadingHome = true;
  let selectedMovie = null;

  const OMDB_API_KEY = '8ac01c0f';

  async function searchMovies(query) {
    loading = true; error = ''; movies = [];
    try {
      const res = await fetch(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}&type=movie`);
      const data = await res.json();
      if (data.Response === 'False') {
        error = data.Error || 'No results';
        return;
      }
      movies = data.Search || [];
    } catch (e) {
      error = 'Failed to fetch movies';
    } finally {
      loading = false;
    }
  }

  async function handleShowDetails(event) {
    const { imdbID } = event.detail.movie;
    try {
      const res = await fetch(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${imdbID}&plot=full`);
      const data = await res.json();
      selectedMovie = data;
    } catch {}
  }

  async function loadHome() {
    loadingHome = true;
    try {
      // OMDb doesn't expose real trending; approximate with year filters and popular titles
      const year = new Date().getFullYear();
      const [resNew, resTrend, resTop] = await Promise.all([
        fetch(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${year}&type=movie`),
        fetch(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=Avengers&type=movie`),
        fetch(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=The&type=movie`)
      ]);
      const [dataNew, dataTrend, dataTop] = await Promise.all([resNew.json(), resTrend.json(), resTop.json()]);
      newReleases = dataNew.Search || [];
      trending = dataTrend.Search || [];
      topRated = dataTop.Search || [];
    } catch {}
    loadingHome = false;
  }

  function handlePageChange(event) {
    const { page: newPage } = event.detail;
    page.set(newPage);
  }

  function handleFilterChange(event) {
    const newFilters = event.detail;
    filters.update(current => ({ ...current, ...newFilters }));
  }

  function handleSearchClear() {
    movies = [];
    error = '';
  }

  onMount(() => {
    loadHome();
  });
</script>

<div class="page-wrapper">
  <Header title="IMDb Clone" />
  <Navigation on:pageChange={handlePageChange} on:filterChange={handleFilterChange} />

  <main class="main-content">
    {#if $page === 'home'}
      <!-- Homepage Content -->
      <div class="hero">
        <div class="hero-inner">
          <h1>Find your next favorite movie</h1>
          <p class="tag">Search the OMDb database. Discover new, trending and top rated picks.</p>
          <div class="search-wrap">
            <SearchBar on:search={(e) => searchMovies(e.detail.query)} on:clear={handleSearchClear} />
          </div>
        </div>
      </div>

      {#if loading}
        <div class="state">Searching…</div>
      {:else if error}
        <div class="state error">{error}</div>
      {:else if movies.length}
        <Section title="Search results">
          <MovieGrid {movies} onSelect={handleShowDetails} />
        </Section>
      {/if}

      <Section title="New releases" subtitle="Fresh in theaters and digital">
        {#if loadingHome}
          <div class="skeleton-grid">
            {#each Array(8) as _}
              <SkeletonCard />
            {/each}
          </div>
        {:else}
          <Carousel items={newReleases} itemWidth={180} showArrows={true}>
            {#each newReleases as movie (movie.imdbID)}
              <MovieGrid movies={[movie]} onSelect={handleShowDetails} />
            {/each}
          </Carousel>
        {/if}
      </Section>

      <Section title="Trending now" subtitle="What everyone's watching">
        {#if loadingHome}
          <div class="skeleton-grid">
            {#each Array(8) as _}
              <SkeletonCard />
            {/each}
          </div>
        {:else}
          <Carousel items={trending} itemWidth={180} showArrows={true}>
            {#each trending as movie (movie.imdbID)}
              <MovieGrid movies={[movie]} onSelect={handleShowDetails} />
            {/each}
          </Carousel>
        {/if}
      </Section>

      <Section title="Top rated" subtitle="Critically acclaimed favorites">
        {#if loadingHome}
          <div class="skeleton-grid">
            {#each Array(8) as _}
              <SkeletonCard />
            {/each}
          </div>
        {:else}
          <Carousel items={topRated} itemWidth={180} showArrows={true}>
            {#each topRated as movie (movie.imdbID)}
              <MovieGrid movies={[movie]} onSelect={handleShowDetails} />
            {/each}
          </Carousel>
        {/if}
      </Section>

    {:else if $page === 'movies'}
      <!-- Movies Page -->
      <MoviesPage onSelect={handleShowDetails} />

    {:else if $page === 'tv'}
      <!-- TV Shows Page -->
      <div class="page-placeholder">
        <h1>TV Shows</h1>
        <p>Coming soon! TV shows functionality will be implemented here.</p>
      </div>

    {:else if $page === 'celebs'}
      <!-- Celebrities Page -->
      <div class="page-placeholder">
        <h1>Celebrities</h1>
        <p>Coming soon! Celebrity information will be implemented here.</p>
      </div>

    {:else if $page === 'awards'}
      <!-- Awards Page -->
      <div class="page-placeholder">
        <h1>Awards</h1>
        <p>Coming soon! Awards and nominations will be implemented here.</p>
      </div>

    {:else if $page === 'news'}
      <!-- News Page -->
      <div class="page-placeholder">
        <h1>Movie News</h1>
        <p>Coming soon! Latest movie news and updates will be implemented here.</p>
      </div>

    {:else}
      <!-- Default Homepage -->
      <div class="hero">
        <div class="hero-inner">
          <h1>Welcome to IMDb Clone</h1>
          <p class="tag">Your ultimate destination for movie information and discovery</p>
          <div class="search-wrap">
            <SearchBar on:search={(e) => searchMovies(e.detail.query)} on:clear={handleSearchClear} />
          </div>
        </div>
      </div>
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
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 16px;
    width: 100%;
    box-sizing: border-box;
  }
  
  .hero {
    background: var(--gradient-hero);
    margin: 0 -16px 32px -16px;
    padding: 0 16px;
  }
  
  .hero-inner { 
    padding: 48px 0 24px; 
    text-align: center; 
  }
  
  .hero h1 { 
    margin: 0 0 8px; 
    font-size: clamp(28px, 5vw, 42px); 
    color: var(--text-primary); 
  }
  
  .tag { 
    color: var(--text-secondary); 
    margin: 0 0 16px; 
  }
  
  .search-wrap { 
    max-width: 700px; 
    margin: 0 auto; 
  }
  
  .state { 
    text-align: center; 
    color: var(--text-secondary); 
    padding: 24px; 
  }
  
  .state.error { 
    color: var(--accent-error); 
  }
  
  .skeleton-grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); 
    gap: 16px; 
  }
  
  .page-placeholder {
    text-align: center;
    padding: 64px 32px;
    color: var(--text-secondary);
  }
  
  .page-placeholder h1 {
    margin: 0 0 16px 0;
    color: var(--text-primary);
    font-size: 2.5rem;
  }
  
  .page-placeholder p {
    font-size: 1.125rem;
    margin: 0;
  }
</style>
