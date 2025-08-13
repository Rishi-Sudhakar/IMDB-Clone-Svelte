// src/services/tmdb.js
const TMDB_API_KEY = '3bc81f48f6cf71cb59d2b8caf9b8e657';
const TMDB_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYmM4MWY0OGY2Y2Y3MWNiNTlkMmI4Y2FmOWI4ZTY1NyIsIm5iZiI6MTc1NDk5MjYzMi4wNTUsInN1YiI6IjY4OWIwZmY4N2U0MzUxNDEwZmI3MDdiYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pMkiQgzxKi9s73lb6kDgRQcfT3QH6l1l1Qg7kVMlFik';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// TMDB API configuration
const tmdbConfig = {
  baseURL: TMDB_BASE_URL,
  headers: {
    'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
  }
};

// Helper function to make API calls
async function tmdbRequest(endpoint, params = {}) {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  
  // Add timestamp to prevent caching
  params.timestamp = Date.now();
  
  // Add params to URL (excluding api_key since we're using Bearer token)
  Object.keys(params).forEach(key => {
    if (params[key] !== null && params[key] !== undefined) {
      url.searchParams.append(key, params[key]);
    }
  });

  try {
    const response = await fetch(url.toString(), {
      headers: tmdbConfig.headers
    });
    
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('TMDB API request failed:', error);
    throw error;
  }
}

// Image URL helpers
export function getPosterUrl(posterPath, size = 'w500') {
  if (!posterPath) return null;
  return `${TMDB_IMAGE_BASE_URL}/${size}${posterPath}`;
}

export function getBackdropUrl(backdropPath, size = 'w1280') {
  if (!backdropPath) return null;
  return `${TMDB_IMAGE_BASE_URL}/${size}${backdropPath}`;
}

export function getProfileUrl(profilePath, size = 'w185') {
  if (!profilePath) return null;
  return `${TMDB_IMAGE_BASE_URL}/${size}${profilePath}`;
}

// Movie endpoints
export async function getTrendingMovies(timeWindow = 'week', page = 1) {
  return tmdbRequest('/trending/movie/' + timeWindow, { page });
}

export async function getPopularMovies(page = 1) {
  return tmdbRequest('/movie/popular', { page });
}

export async function getTopRatedMovies(page = 1) {
  return tmdbRequest('/movie/top_rated', { page });
}

export async function getUpcomingMovies(page = 1) {
  return tmdbRequest('/movie/upcoming', { page });
}

export async function getNewReleases(page = 1) {
  return tmdbRequest('/movie/now_playing', { page });
}

export async function getNowPlayingMovies(page = 1) {
  return tmdbRequest('/movie/now_playing', { page });
}

export async function getMovieDetails(movieId) {
  return tmdbRequest(`/movie/${movieId}`, {
    append_to_response: 'credits,videos,images,reviews,similar'
  });
}

export async function searchMovies(query, page = 1) {
  return tmdbRequest('/search/movie', {
    query,
    page,
    include_adult: false
  });
}

export async function discoverMovies(filters = {}, page = 1) {
  const params = { page, ...filters };
  return tmdbRequest('/discover/movie', params);
}

// Genre endpoints
export async function getMovieGenres() {
  return tmdbRequest('/genre/movie/list');
}

// TV Show endpoints
export async function getTrendingTVShows(timeWindow = 'week', page = 1) {
  return tmdbRequest('/trending/tv/' + timeWindow, { page });
}

export async function getPopularTVShows(page = 1) {
  return tmdbRequest('/tv/popular', { page });
}

export async function getTopRatedTVShows(page = 1) {
  return tmdbRequest('/tv/top_rated', { page });
}

export async function searchTVShows(query, page = 1) {
  return tmdbRequest('/search/tv', {
    query,
    page,
    include_adult: false
  });
}

export async function discoverTVShows(filters = {}, page = 1) {
  const params = { page, ...filters };
  return tmdbRequest('/discover/tv', params);
}

export async function getTVShowDetails(tvShowId) {
  return tmdbRequest(`/tv/${tvShowId}`, {
    append_to_response: 'credits,videos,images,reviews,similar'
  });
}

// People endpoints
export async function getTrendingPeople(timeWindow = 'week', page = 1) {
  return tmdbRequest('/trending/person/' + timeWindow, { page });
}

export async function getPopularPeople(page = 1) {
  return tmdbRequest('/person/popular', { page });
}

export async function getPersonDetails(personId) {
  return tmdbRequest(`/person/${personId}`, {
    append_to_response: 'credits,images,external_ids'
  });
}

export async function searchPeople(query, page = 1) {
  return tmdbRequest('/search/person', {
    query,
    page,
    include_adult: false
  });
}

// Multi-search
export async function multiSearch(query, page = 1) {
  return tmdbRequest('/search/multi', {
    query,
    page,
    include_adult: false
  });
}

// Configuration
export async function getConfiguration() {
  return tmdbRequest('/configuration');
}

// Helper function to transform TMDB movie data to match our app's format
export function transformMovieData(tmdbMovie) {
  // Handle different genre formats (search results vs detailed data)
  let genreIds = [];
  let genreNames = [];
  
  if (tmdbMovie.genres && tmdbMovie.genres.length > 0) {
    // Detailed movie data has genres array with objects
    genreIds = tmdbMovie.genres.map(g => g.id);
    genreNames = tmdbMovie.genres.map(g => g.name);
  } else if (tmdbMovie.genre_ids && tmdbMovie.genre_ids.length > 0) {
    // Search results have genre_ids array with numbers
    genreIds = tmdbMovie.genre_ids;
    genreNames = tmdbMovie.genre_ids; // Will be populated with names later
  }
  
  return {
    id: tmdbMovie.id,
    imdbID: tmdbMovie.imdb_id || `tmdb_${tmdbMovie.id}`,
    title: tmdbMovie.title,
    Title: tmdbMovie.title, // Keep for backward compatibility
    year: tmdbMovie.release_date ? new Date(tmdbMovie.release_date).getFullYear() : null,
    Year: tmdbMovie.release_date ? new Date(tmdbMovie.release_date).getFullYear() : null,
    poster: tmdbMovie.poster_path ? getPosterUrl(tmdbMovie.poster_path) : null,
    Poster: tmdbMovie.poster_path ? getPosterUrl(tmdbMovie.poster_path) : null,
    backdrop: tmdbMovie.backdrop_path ? getBackdropUrl(tmdbMovie.backdrop_path) : null,
    rating: tmdbMovie.vote_average ? tmdbMovie.vote_average.toFixed(1) : null,
    imdbRating: tmdbMovie.vote_average ? tmdbMovie.vote_average.toFixed(1) : null,
    overview: tmdbMovie.overview,
    genre: genreIds,
    genreNames: genreNames,
    releaseDate: tmdbMovie.release_date,
    runtime: tmdbMovie.runtime,
    voteCount: tmdbMovie.vote_count,
    popularity: tmdbMovie.popularity,
    originalLanguage: tmdbMovie.original_language,
    originalTitle: tmdbMovie.original_title,
    adult: tmdbMovie.adult,
    video: tmdbMovie.video,
    voteAverage: tmdbMovie.vote_average,
    // Additional detailed movie data
    budget: tmdbMovie.budget,
    revenue: tmdbMovie.revenue,
    status: tmdbMovie.status,
    tagline: tmdbMovie.tagline,
    productionCompanies: tmdbMovie.production_companies,
    productionCountries: tmdbMovie.production_countries,
    spokenLanguages: tmdbMovie.spoken_languages
  };
}

// Helper function to transform TMDB search results
export function transformSearchResults(tmdbResponse) {
  if (!tmdbResponse.results) return { Search: [], totalResults: 0 };
  
  return {
    Search: tmdbResponse.results.map(transformMovieData),
    totalResults: tmdbResponse.total_results,
    Response: 'True'
  };
}

// Helper function to transform TMDB TV show data
export function transformTVShowData(tmdbTVShow) {
  return {
    id: tmdbTVShow.id,
    imdbID: tmdbTVShow.imdb_id || `tmdb_tv_${tmdbTVShow.id}`,
    title: tmdbTVShow.name,
    Title: tmdbTVShow.name, // Keep for backward compatibility
    year: tmdbTVShow.first_air_date ? new Date(tmdbTVShow.first_air_date).getFullYear() : null,
    Year: tmdbTVShow.first_air_date ? new Date(tmdbTVShow.first_air_date).getFullYear() : null,
    poster: tmdbTVShow.poster_path ? getPosterUrl(tmdbTVShow.poster_path) : null,
    Poster: tmdbTVShow.poster_path ? getPosterUrl(tmdbTVShow.poster_path) : null,
    backdrop: tmdbTVShow.backdrop_path ? getBackdropUrl(tmdbTVShow.backdrop_path) : null,
    rating: tmdbTVShow.vote_average ? tmdbTVShow.vote_average.toFixed(1) : null,
    imdbRating: tmdbTVShow.vote_average ? tmdbTVShow.vote_average.toFixed(1) : null,
    overview: tmdbTVShow.overview,
    genre: tmdbTVShow.genre_ids || [],
    firstAirDate: tmdbTVShow.first_air_date,
    lastAirDate: tmdbTVShow.last_air_date,
    numberOfSeasons: tmdbTVShow.number_of_seasons,
    numberOfEpisodes: tmdbTVShow.number_of_episodes,
    status: tmdbTVShow.status,
    voteCount: tmdbTVShow.vote_count,
    popularity: tmdbTVShow.popularity,
    originalLanguage: tmdbTVShow.original_language,
    originalName: tmdbTVShow.original_name,
    type: 'tv' // Mark as TV show
  };
}

// Helper function to transform TMDB person data
export function transformPersonData(tmdbPerson) {
  return {
    id: tmdbPerson.id,
    name: tmdbPerson.name,
    profile: tmdbPerson.profile_path ? getProfileUrl(tmdbPerson.profile_path) : null,
    knownFor: tmdbPerson.known_for_department || 'Actor',
    popularity: tmdbPerson.popularity,
    adult: tmdbPerson.adult,
    gender: tmdbPerson.gender,
    knownForMovies: tmdbPerson.known_for || [],
    type: 'person'
  };
}
