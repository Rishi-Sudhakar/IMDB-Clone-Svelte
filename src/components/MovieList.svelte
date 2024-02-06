<!-- src/components/MovieList.svelte -->

<script>
    // You may import any necessary modules here
  
    // Declare the 'movies' prop that will be passed to the component
    export let movies;
  </script>
  
  <!-- The template for displaying the list of movies -->
  <div>
    {#each movies as movie (movie.id)}
      <div class="movie-item">
        <h2>{movie.title}</h2>
        <p>{movie.description}</p>
        <p>Rating: {movie.rating}</p>
      </div>
    {/each}
  </div>
  
  <style>
    /* You can add styles for the movie list items here */
    .movie-item {
      border: 1px solid #ccc;
      padding: 10px;
      margin-bottom: 10px;
    }
  </style>
  