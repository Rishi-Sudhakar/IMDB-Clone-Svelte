<script>
    import { createEventDispatcher } from 'svelte';
  
    export let movie;
  
    const dispatch = createEventDispatcher();
  
    function handleClick() {
      dispatch('showDetails', { movie });
    }
  </script>
  
  <div class="movie-item" on:click={handleClick}>
    <div class="poster-container">
      <img src={`http://img.omdbapi.com/?apikey='350c734b'&i=${movie.imdbID}`} alt={movie.title} class="poster" />
      <div class="overlay">
        <button class="btn">View Details</button>
      </div>
    </div>
    <div class="details">
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <div class="rating-container">
        <div class="rating">{movie.rating}</div>
        <div class="star">&#9733;</div>
      </div>
    </div>
  </div>
  
  <style>
    .movie-item {
      display: flex;
      align-items: center;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      cursor: pointer;
      background-color: var(--card-bg);
      color: var(--text-color);
    }
  
    .movie-item:hover {
      transform: translateY(-5px);
      box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
    }
  
    .poster-container {
      position: relative;
      width: 200px;
      border-radius: 10px 0 0 10px;
      overflow: hidden;
    }
  
    .poster {
      width: 100%;
      height: auto;
      transition: transform 0.3s ease;
    }
  
    .poster-container:hover .poster {
      transform: scale(1.05);
    }
  
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
  
    .poster-container:hover .overlay {
      opacity: 1;
    }
  
    .btn {
      background-color: transparent;
      color: #fff;
      border: 2px solid #fff;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
      text-transform: uppercase;
      transition: background-color 0.3s ease, color 0.3s ease;
    }
  
    .btn:hover {
      background-color: #fff;
      color: #333;
    }
  
    .details {
      flex-grow: 1;
      padding: 20px;
    }
  
    h2 {
      margin-bottom: 10px;
      color: var(--heading-color);
    }
  
    p {
      margin-bottom: 15px;
      color: var(--text-color);
    }
  
    .rating-container {
      display: flex;
      align-items: center;
    }
  
    .rating {
      background-color: var(--rating-bg);
      color: var(--rating-text-color);
      font-weight: bold;
      padding: 5px 10px;
      border-radius: 5px;
      margin-right: 10px;
    }
  
    .star {
      color: var(--rating-bg);
      font-size: 20px;
    }
  </style>
  