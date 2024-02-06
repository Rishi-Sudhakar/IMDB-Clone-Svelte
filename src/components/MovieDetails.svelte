<script>
    export let movie;
  </script>
  
  <div class="movie-details">
    <div class="poster-container">
      <img src={`http://img.omdbapi.com/?apikey='350c734b'&i=${movie.imdbID}`} alt={movie.title} class="poster" />
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
  