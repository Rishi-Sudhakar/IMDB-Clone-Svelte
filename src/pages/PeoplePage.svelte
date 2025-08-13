<!-- src/pages/PeoplePage.svelte -->
<script>
  import { onMount } from 'svelte';
  import Section from '../components/Section.svelte';
  import SkeletonCard from '../components/SkeletonCard.svelte';
  import { 
    getTrendingPeople,
    getPopularPeople,
    searchPeople,
    transformPersonData 
  } from '../services/tmdb.js';
  
  let people = [];
  let loading = true;
  let error = '';
  let currentPage = 1;
  let hasMore = true;
  let searchQuery = '';
  
  // Homepage sections
  let trending = [];
  let popular = [];
  let loadingHome = true;
  
  async function loadPeople(page = 1, reset = false) {
    if (reset) {
      people = [];
      currentPage = 1;
      hasMore = true;
    }
    
    if (!hasMore && !reset) return;
    
    loading = true;
    error = '';
    
    try {
      let data;
      
      if (searchQuery) {
        data = await searchPeople(searchQuery, page);
      } else {
        data = await getPopularPeople(page);
      }
      
      if (!data.results) {
        error = 'No people found';
        hasMore = false;
        return;
      }
      
      const newPeople = data.results.map(transformPersonData);
      
      if (reset) {
        people = newPeople;
      } else {
        people = [...people, ...newPeople];
      }
      
      hasMore = newPeople.length === 20 && page < data.total_pages;
      currentPage = page;
      
    } catch (err) {
      error = 'Failed to load people';
      console.error('Error loading people:', err);
    } finally {
      loading = false;
    }
  }
  
  async function loadHome() {
    loadingHome = true;
    try {
      const [trendingData, popularData] = await Promise.all([
        getTrendingPeople('week'),
        getPopularPeople()
      ]);
      
      trending = (trendingData.results || []).map(transformPersonData);
      popular = (popularData.results || []).map(transformPersonData);
      
    } catch (error) {
      console.error('Error loading people homepage data:', error);
    } finally {
      loadingHome = false;
    }
  }
  
  function loadMore() {
    if (!loading && hasMore) {
      loadPeople(currentPage + 1);
    }
  }
  
  function handleSearch(query) {
    searchQuery = query;
    loadPeople(1, true);
  }
  
  function clearSearch() {
    searchQuery = '';
    loadPeople(1, true);
  }
  
  onMount(() => {
    loadHome();
    loadPeople(1, true);
  });
</script>

<div class="people-page">
  <div class="page-header">
    <h1>Celebrities</h1>
    <p class="page-subtitle">Discover actors, directors, and other film industry professionals</p>
    
    <!-- Search Bar -->
    <div class="search-container">
      <input 
        type="text" 
        placeholder="Search for celebrities..."
        bind:value={searchQuery}
        on:input={() => handleSearch(searchQuery)}
        class="search-input"
      />
      {#if searchQuery}
        <button on:click={clearSearch} class="clear-search-btn">Clear</button>
      {/if}
    </div>
  </div>
  
  <!-- Homepage sections -->
  <Section title="Trending Now" subtitle="Celebrities everyone's talking about">
    {#if loadingHome}
      <div class="skeleton-grid">
        {#each Array(8) as _}
          <SkeletonCard />
        {/each}
      </div>
    {:else}
      <div class="people-grid">
        {#each trending as person (person.id)}
          <div class="person-card">
            <div class="person-image">
              {#if person.profile}
                <img src={person.profile} alt={person.name} />
              {:else}
                <div class="person-placeholder">👤</div>
              {/if}
            </div>
            <div class="person-info">
              <h3 class="person-name">{person.name}</h3>
              <p class="person-known-for">{person.knownFor}</p>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </Section>
  
  <Section title="Popular People" subtitle="Most recognized celebrities">
    {#if loadingHome}
      <div class="skeleton-grid">
        {#each Array(8) as _}
          <SkeletonCard />
        {/each}
      </div>
    {:else}
      <div class="people-grid">
        {#each popular as person (person.id)}
          <div class="person-card">
            <div class="person-image">
              {#if person.profile}
                <img src={person.profile} alt={person.name} />
              {:else}
                <div class="person-placeholder">👤</div>
              {/if}
            </div>
            <div class="person-info">
              <h3 class="person-name">{person.name}</h3>
              <p class="person-known-for">{person.knownFor}</p>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </Section>
  
  <!-- Search Results or All People -->
  {#if searchQuery}
    <Section title="Search Results" subtitle="Results for '{searchQuery}'">
      {#if error && people.length === 0}
        <div class="error-state">
          <div class="error-icon">👤</div>
          <h3>No people found</h3>
          <p>{error}</p>
        </div>
      {:else if people.length > 0}
        <div class="people-grid">
          {#each people as person (person.id)}
            <div class="person-card">
              <div class="person-image">
                {#if person.profile}
                  <img src={person.profile} alt={person.name} />
                {:else}
                  <div class="person-placeholder">👤</div>
                {/if}
              </div>
              <div class="person-info">
                <h3 class="person-name">{person.name}</h3>
                <p class="person-known-for">{person.knownFor}</p>
              </div>
            </div>
          {/each}
        </div>
        
        {#if hasMore}
          <div class="load-more">
            <button 
              class="load-more-btn"
              on:click={loadMore}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load More People'}
            </button>
          </div>
        {/if}
      {:else if loading}
        <div class="loading-state">
          <div class="skeleton-grid">
            {#each Array(12) as _}
              <SkeletonCard />
            {/each}
          </div>
        </div>
      {/if}
    </Section>
  {:else}
    <Section title="All People" subtitle="Browse our collection of celebrities">
      {#if error && people.length === 0}
        <div class="error-state">
          <div class="error-icon">👤</div>
          <h3>No people found</h3>
          <p>{error}</p>
          <button class="retry-btn" on:click={() => loadPeople(1, true)}>
            Try Again
          </button>
        </div>
      {:else if people.length > 0}
        <div class="people-grid">
          {#each people as person (person.id)}
            <div class="person-card">
              <div class="person-image">
                {#if person.profile}
                  <img src={person.profile} alt={person.name} />
                {:else}
                  <div class="person-placeholder">👤</div>
                {/if}
              </div>
              <div class="person-info">
                <h3 class="person-name">{person.name}</h3>
                <p class="person-known-for">{person.knownFor}</p>
              </div>
            </div>
          {/each}
        </div>
        
        {#if hasMore}
          <div class="load-more">
            <button 
              class="load-more-btn"
              on:click={loadMore}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load More People'}
            </button>
          </div>
        {/if}
      {:else if loading}
        <div class="loading-state">
          <div class="skeleton-grid">
            {#each Array(12) as _}
              <SkeletonCard />
            {/each}
          </div>
        </div>
      {:else}
        <div class="empty-state">
          <div class="empty-icon">👤</div>
          <h3>No people available</h3>
          <p>Try searching for a celebrity or browse the popular sections above</p>
        </div>
      {/if}
    </Section>
  {/if}
</div>

<style>
  .people-page {
    width: 100%;
  }
  
  .page-header {
    text-align: center;
    margin-bottom: 48px;
    padding: 32px 0;
    background: var(--gradient-hero);
    border-radius: var(--radius-xl);
  }
  
  .page-header h1 {
    margin: 0 0 16px 0;
    font-size: 3rem;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .page-subtitle {
    font-size: 1.25rem;
    color: var(--text-secondary);
    margin: 0 0 24px 0;
  }
  
  .search-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    max-width: 500px;
    margin: 0 auto;
  }
  
  .search-input {
    flex: 1;
    padding: 12px 16px;
    border: 2px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface-1);
    color: var(--text-primary);
    font-size: 16px;
    transition: all var(--transition-normal);
  }
  
  .search-input:focus {
    outline: none;
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 3px var(--accent-primary-alpha);
  }
  
  .clear-search-btn {
    padding: 12px 16px;
    background: var(--accent-secondary);
    color: white;
    border: none;
    border-radius: var(--radius-md);
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-normal);
  }
  
  .clear-search-btn:hover {
    background: var(--accent-primary);
    transform: translateY(-1px);
  }
  
  .people-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 32px;
  }
  
  .person-card {
    background: var(--surface-1);
    border-radius: var(--radius-lg);
    overflow: hidden;
    border: 1px solid var(--border);
    transition: all var(--transition-normal);
    cursor: pointer;
  }
  
  .person-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--accent-primary);
  }
  
  .person-image {
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    background: var(--surface-2);
  }
  
  .person-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .person-placeholder {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    font-size: 48px;
    color: var(--text-dim);
    background: var(--surface-3);
  }
  
  .person-info {
    padding: 16px;
  }
  
  .person-name {
    margin: 0 0 8px 0;
    font-size: 16px;
    font-weight: 600;
    color: var(--text-strong);
    line-height: 1.3;
  }
  
  .person-known-for {
    margin: 0;
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .load-more {
    text-align: center;
    margin-top: 32px;
  }
  
  .load-more-btn {
    padding: 16px 32px;
    background: var(--accent-primary);
    color: white;
    border-radius: var(--radius-md);
    font-size: 16px;
    font-weight: 600;
    transition: all var(--transition-normal);
    box-shadow: var(--shadow-md);
  }
  
  .load-more-btn:hover:not(:disabled) {
    background: var(--accent-secondary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
  
  .load-more-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .error-state,
  .empty-state {
    text-align: center;
    padding: 64px 32px;
    color: var(--text-secondary);
  }
  
  .error-icon,
  .empty-icon {
    font-size: 64px;
    margin-bottom: 16px;
    opacity: 0.5;
  }
  
  .error-state h3,
  .empty-state h3 {
    margin: 0 0 8px 0;
    color: var(--text-primary);
  }
  
  .retry-btn {
    margin-top: 16px;
    padding: 12px 24px;
    background: var(--accent-primary);
    color: white;
    border-radius: var(--radius-md);
    font-weight: 600;
    transition: all var(--transition-normal);
  }
  
  .retry-btn:hover {
    background: var(--accent-secondary);
    transform: translateY(-1px);
  }
  
  .loading-state {
    padding: 32px 0;
  }
  
  .skeleton-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
  
  @media (max-width: 768px) {
    .page-header h1 {
      font-size: 2.5rem;
    }
    
    .page-subtitle {
      font-size: 1.125rem;
    }
    
    .search-container {
      flex-direction: column;
      gap: 8px;
    }
    
    .people-grid {
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 16px;
    }
    
    .skeleton-grid {
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 16px;
    }
  }
</style>
