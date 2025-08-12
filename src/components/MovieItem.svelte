<script>
  import { createEventDispatcher } from 'svelte';
  export let movie;
  const dispatch = createEventDispatcher();
  function handleClick() { dispatch('showDetails', { movie }); }
  const poster = movie?.Poster && movie.Poster !== 'N/A' ? movie.Poster : '';
  const title = movie?.Title || movie?.title || 'Unknown title';
  const rating = movie?.imdbRating || movie?.rating || null;
  const year = movie?.Year || '';
</script>

<article class="tile" role="button" tabindex="0" aria-label={`Open details for ${title}`} on:keydown={(e)=> (e.key==='Enter'||e.key===' ') && handleClick()} on:click={handleClick}>
  <div class="poster-wrap">
    {#if poster}
      <img src={poster} alt={title} />
    {:else}
      <div class="ph">
        <span>🎬</span>
      </div>
    {/if}
    {#if rating}
      <div class="badge">⭐ {rating}</div>
    {/if}
    <div class="hover-glow"></div>
  </div>
  <h3 class="title" title={title}>{title}</h3>
  {#if year}<div class="meta">{year}</div>{/if}
</article>
  
  <style>
    .tile { cursor: pointer; user-select: none; }
    .poster-wrap {
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid var(--border);
      background: var(--surface-2);
      aspect-ratio: 2/3;
      transition: transform .25s ease, box-shadow .25s ease;
    }
    .tile:hover .poster-wrap { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,.25); }
    img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .ph { width: 100%; height: 100%; display: grid; place-items: center; color: var(--text-dim); font-size: 42px; }
    .badge {
      position: absolute; top: 8px; left: 8px;
      background: rgba(0,0,0,.65);
      color: #ffd166; font-weight: 700; font-size: 12px;
      padding: 4px 8px; border-radius: 999px; border: 1px solid rgba(255,255,255,.1);
    }
    .hover-glow { position: absolute; inset: 0; background: radial-gradient(200px 80px at 50% 110%, rgba(31,111,235,.35), transparent 60%); opacity: 0; transition: opacity .25s; }
    .tile:hover .hover-glow { opacity: 1; }
    .title { margin: 8px 2px 2px; font-size: 14px; color: var(--text-strong); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .meta { color: var(--text-dim); font-size: 12px; }
  
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
  