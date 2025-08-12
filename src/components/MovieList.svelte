<!-- src/components/MovieList.svelte -->

<script>
  import MovieItem from './MovieItem.svelte';
  export let movies = [];
  export let onSelect;
</script>

<div class="list">
  {#each movies as movie (movie.imdbID || movie.id)}
    <MovieItem {movie} on:showDetails={(e) => onSelect ? onSelect(e) : null} />
  {/each}
</div>

<style>
  .list { display: grid; gap: 16px; }
</style>
