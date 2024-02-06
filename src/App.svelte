<!-- src/App.svelte -->

<script>
	import ThemeToggle from './components/ThemeToggle.svelte';
	import MovieList from './components/MovieList.svelte';
	import MovieDetails from './components/MovieDetails.svelte';
  
	let movies = [
	  { id: 1, title: "Inception", description: "A thief who enters the dreams of others to steal secrets from their subconscious.", rating: 8.8, imdbID: "tt1375666" },
	  { id: 2, title: "The Shawshank Redemption", description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", rating: 9.3, imdbID: "tt0111161" },
	  { id: 3, title: "The Godfather", description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.", rating: 9.2, imdbID: "tt0068646" }
	];
  
	let selectedMovie;
  
	async function handleShowDetails(event) {
	  const { imdbID } = event.detail.movie;
	  const response = await fetch(`http://www.omdbapi.com/?apikey='350c734b'&i=${imdbID}`);
	  const data = await response.json();
	  selectedMovie = data;
	}
  </script>
  
  <div>
	<h1>IMDb Clone</h1>
  
	<ThemeToggle />
  
	<MovieList {movies} on:showDetails={handleShowDetails} />
	
	{#if selectedMovie}
	  <MovieDetails movie={selectedMovie} />

	{/if}
  </div>
  
  <style>
	h1 {
	  text-align: center;
	  margin-bottom: 20px;
	  color: var(--heading-color);
	}
  
	:root {
	  --bg-color: #f4f4f4;
	  --text-color: #333;
	  --card-bg: #fff;
	  --heading-color: #333;
	  --rating-bg: #ffcc00;
	  --rating-text-color: #333;
	}
  </style>
  