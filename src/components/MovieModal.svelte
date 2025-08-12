<script>
  import { createEventDispatcher } from 'svelte';
  export let movie = null;
  const dispatch = createEventDispatcher();
  function close() { dispatch('close'); }
  function onKeydown(e) { if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') close(); }
</script>

{#if movie}
  <div class="scrim" role="button" tabindex="0" aria-label="Close dialog" on:keydown={onKeydown} on:click|self={close}>
    <div class="modal">
      <button class="close" on:click={close} aria-label="Close">×</button>
      <div class="content">
        <img src={`https://img.omdbapi.com/?apikey=8ac01c0f&i=${movie.imdbID}`} alt={movie.Title} />
        <div class="details">
          <h2>{movie.Title}</h2>
          <p class="meta">{movie.Year} • {movie.Runtime} • {movie.Genre}</p>
          <p>{movie.Plot}</p>
          <div class="stats">
            <span>⭐ {movie.imdbRating}</span>
            <span>Votes: {movie.imdbVotes}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .scrim {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    display: grid;
    place-items: center;
    padding: 16px;
  }
  .modal {
    width: min(900px, 100%);
    background: var(--surface-1);
    border: 1px solid var(--border);
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.35);
    position: relative;
  }
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    border: 0;
    background: transparent;
    font-size: 24px;
    color: var(--text);
    cursor: pointer;
  }
  .content {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 16px;
    padding: 16px;
  }
  img { width: 100%; border-radius: 12px; border: 1px solid var(--border); }
  h2 { margin: 0 0 8px; color: var(--text-strong); }
  .meta { color: var(--text-dim); margin: 0 0 12px; }
  .stats { display: flex; gap: 16px; color: var(--text-strong); font-weight: 600; }

  @media (max-width: 700px) {
    .content { grid-template-columns: 1fr; }
  }
</style>


