<script>
  export let movie;
  const title = movie?.Title || movie?.title;
  const plot = movie?.Plot || movie?.description;
  const rating = movie?.imdbRating || movie?.rating;
</script>

<div class="movie-details">
  <div class="poster-container">
    {#if movie?.Poster && movie.Poster !== 'N/A'}
      <img src={movie.Poster} alt={title} class="poster" />
    {/if}
  </div>
  <div class="details">
    <h2>{title}</h2>
    <p>{plot}</p>
    <div class="rating-container">
      <div class="rating">{rating}</div>
      <div class="star">&#9733;</div>
    </div>
  </div>
</div>
  
  <style>
    .movie-details {
      display: flex;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      background-color: var(--card-bg);
      color: var(--text-color);
    }
  
    .poster-container {
      width: 300px;
      border-radius: 10px 0 0 10px;
      overflow: hidden;
    }
  
    .poster {
      width: 100%;
      height: auto;
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
  