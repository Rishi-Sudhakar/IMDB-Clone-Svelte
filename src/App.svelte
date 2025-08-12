<!-- src/App.svelte -->

<script>
  import Header from './components/Header.svelte';
  import SearchBar from './components/SearchBar.svelte';
  import MovieGrid from './components/MovieGrid.svelte';
  import MovieModal from './components/MovieModal.svelte';
  import { lastQuery } from './stores.js';
  import { onMount } from 'svelte';

  let movies = [];
  let loading = false;
  let error = '';
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

  onMount(() => {
    if ($lastQuery) searchMovies($lastQuery);
  });
</script>

<Header title="IMDb Clone" />

<main class="container">
  <SearchBar on:search={(e) => searchMovies(e.detail.query)}>
    <div slot="extra"></div>
  </SearchBar>

  {#if loading}
    <div class="state">Loading…</div>
  {:else if error}
    <div class="state error">{error}</div>
  {:else}
    <MovieGrid {movies} onSelect={handleShowDetails} />
  {/if}
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
