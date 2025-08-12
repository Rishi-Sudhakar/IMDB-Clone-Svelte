<!-- src/App.svelte -->

<script>
  import Header from './components/Header.svelte';
  import SearchBar from './components/SearchBar.svelte';
  import MovieGrid from './components/MovieGrid.svelte';
  import MovieModal from './components/MovieModal.svelte';
  import Section from './components/Section.svelte';
  import Carousel from './components/Carousel.svelte';
  import SkeletonCard from './components/SkeletonCard.svelte';
  import { lastQuery } from './stores.js';
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

  onMount(() => {
    loadHome();
    if ($lastQuery) searchMovies($lastQuery);
  });
</script>

<Header title="IMDb Clone" />

<main class="container">
  <div class="hero">
    <div class="hero-inner">
      <h1>Find your next favorite movie</h1>
      <p class="tag">Search the OMDb database. Discover new, trending and top rated picks.</p>
      <div class="search-wrap">
        <SearchBar on:search={(e) => searchMovies(e.detail.query)} />
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
      <div class="grid-skel">{#each Array(10) as _}<SkeletonCard />{/each}</div>
    {:else}
      <Carousel items={newReleases} let:items>
        {#each items as m (m.imdbID)}
          <div style="width: var(--w)"><MovieGrid movies={[m]} onSelect={handleShowDetails} /></div>
        {/each}
      </Carousel>
    {/if}
  </Section>

  <Section title="Trending now" subtitle="What everyone’s watching">
    {#if loadingHome}
      <div class="grid-skel">{#each Array(10) as _}<SkeletonCard />{/each}</div>
    {:else}
      <Carousel items={trending} let:items>
        {#each items as m (m.imdbID)}
          <div style="width: var(--w)"><MovieGrid movies={[m]} onSelect={handleShowDetails} /></div>
        {/each}
      </Carousel>
    {/else}
  </Section>

  <Section title="Top rated" subtitle="Critically acclaimed favorites">
    {#if loadingHome}
      <div class="grid-skel">{#each Array(10) as _}<SkeletonCard />{/each}</div>
    {:else}
      <Carousel items={topRated} let:items>
        {#each items as m (m.imdbID)}
          <div style="width: var(--w)"><MovieGrid movies={[m]} onSelect={handleShowDetails} /></div>
        {/each}
      </Carousel>
    {/if}
  </Section>
</main>

<MovieModal movie={selectedMovie} on:close={() => selectedMovie = null} />

<style>
  :global(body) {
    background: var(--bg);
    color: var(--text);
  }
  .container {
    max-width: 1100px;
    margin: 24px auto;
    padding: 0 16px;
    display: grid;
    gap: 16px;
  }
  .state { text-align: center; color: var(--text-dim); padding: 24px; }
  .state.error { color: #d64545; }
</style>
