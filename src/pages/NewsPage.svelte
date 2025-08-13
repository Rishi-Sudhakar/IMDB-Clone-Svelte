<!-- src/pages/NewsPage.svelte -->
<script>
  import Section from '../components/Section.svelte';
  
  // Mock news data - in a real app, this would come from a news API
  const newsItems = [
    {
      id: 1,
      title: "New Blockbuster Movie Breaks Box Office Records",
      excerpt: "The latest superhero film has shattered previous records, becoming the highest-grossing movie of the year.",
      date: "2024-01-15",
      category: "Box Office"
    },
    {
      id: 2,
      title: "Academy Awards Nominations Announced",
      excerpt: "The complete list of nominees for the 96th Academy Awards has been revealed, with several surprises.",
      date: "2024-01-14",
      category: "Awards"
    },
    {
      id: 3,
      title: "Streaming Services Revolutionize Movie Distribution",
      excerpt: "Major studios are adapting to the changing landscape of movie consumption and distribution.",
      date: "2024-01-13",
      category: "Industry"
    },
    {
      id: 4,
      title: "New Technology Enhances Movie-Going Experience",
      excerpt: "Cutting-edge innovations are transforming how audiences experience films in theaters.",
      date: "2024-01-12",
      category: "Technology"
    },
    {
      id: 5,
      title: "Independent Films Gain Recognition",
      excerpt: "Small-budget productions are receiving critical acclaim and finding wider audiences.",
      date: "2024-01-11",
      category: "Independent"
    },
    {
      id: 6,
      title: "International Cinema Spotlight",
      excerpt: "Films from around the world are gaining popularity and critical recognition in global markets.",
      date: "2024-01-10",
      category: "International"
    }
  ];
  
  const categories = ['All', 'Box Office', 'Awards', 'Industry', 'Technology', 'Independent', 'International'];
  let selectedCategory = 'All';
  
  $: filteredNews = selectedCategory === 'All' 
    ? newsItems 
    : newsItems.filter(item => item.category === selectedCategory);
</script>

<div class="news-page">
  <div class="page-header">
    <h1>Movie News</h1>
    <p class="page-subtitle">Stay updated with the latest happenings in the world of cinema</p>
  </div>
  
  <!-- Category Filter -->
  <div class="category-filter">
    {#each categories as category}
      <button 
        class="category-btn {selectedCategory === category ? 'active' : ''}"
        on:click={() => selectedCategory = category}
      >
        {category}
      </button>
    {/each}
  </div>
  
  <!-- News Grid -->
  <Section title="Latest News" subtitle="Stay informed about the movie industry">
    <div class="news-grid">
      {#each filteredNews as news (news.id)}
        <article class="news-card">
          <div class="news-header">
            <span class="news-category">{news.category}</span>
            <time class="news-date">{new Date(news.date).toLocaleDateString()}</time>
          </div>
          <h3 class="news-title">{news.title}</h3>
          <p class="news-excerpt">{news.excerpt}</p>
          <button class="read-more-btn">Read More</button>
        </article>
      {/each}
    </div>
  </Section>
  
  <!-- Coming Soon Section -->
  <Section title="Coming Soon" subtitle="Upcoming features and improvements">
    <div class="coming-soon">
      <div class="feature-item">
        <div class="feature-icon">🔍</div>
        <h3>Advanced Search</h3>
        <p>Enhanced search functionality with filters for cast, crew, awards, and more.</p>
      </div>
      <div class="feature-item">
        <div class="feature-icon">📱</div>
        <h3>Mobile App</h3>
        <p>Native mobile applications for iOS and Android devices.</p>
      </div>
      <div class="feature-item">
        <div class="feature-icon">🎬</div>
        <h3>Watchlist</h3>
        <p>Create and manage your personal watchlist of movies and TV shows.</p>
      </div>
      <div class="feature-item">
        <div class="feature-icon">⭐</div>
        <h3>User Reviews</h3>
        <p>Rate and review movies, and see what others think.</p>
      </div>
    </div>
  </Section>
</div>

<style>
  .news-page {
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
    margin: 0;
  }
  
  .category-filter {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 32px;
    flex-wrap: wrap;
  }
  
  .category-btn {
    padding: 8px 16px;
    border: 2px solid var(--border);
    background: var(--surface-1);
    color: var(--text-primary);
    border-radius: var(--radius-md);
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition-normal);
  }
  
  .category-btn:hover {
    border-color: var(--accent-primary);
    background: var(--surface-2);
  }
  
  .category-btn.active {
    background: var(--accent-primary);
    color: white;
    border-color: var(--accent-primary);
  }
  
  .news-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 24px;
    margin-bottom: 32px;
  }
  
  .news-card {
    background: var(--surface-1);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 24px;
    transition: all var(--transition-normal);
  }
  
  .news-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--accent-primary);
  }
  
  .news-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  
  .news-category {
    background: var(--accent-primary);
    color: white;
    padding: 4px 12px;
    border-radius: var(--radius-sm);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
  }
  
  .news-date {
    color: var(--text-secondary);
    font-size: 14px;
  }
  
  .news-title {
    margin: 0 0 12px 0;
    font-size: 18px;
    font-weight: 600;
    color: var(--text-strong);
    line-height: 1.4;
  }
  
  .news-excerpt {
    margin: 0 0 16px 0;
    color: var(--text-secondary);
    line-height: 1.6;
  }
  
  .read-more-btn {
    background: var(--accent-secondary);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: var(--radius-md);
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition-normal);
  }
  
  .read-more-btn:hover {
    background: var(--accent-primary);
    transform: translateY(-1px);
  }
  
  .coming-soon {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 24px;
  }
  
  .feature-item {
    text-align: center;
    padding: 24px;
    background: var(--surface-1);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border);
  }
  
  .feature-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }
  
  .feature-item h3 {
    margin: 0 0 12px 0;
    color: var(--text-strong);
    font-size: 18px;
  }
  
  .feature-item p {
    margin: 0;
    color: var(--text-secondary);
    line-height: 1.5;
  }
  
  @media (max-width: 768px) {
    .page-header h1 {
      font-size: 2.5rem;
    }
    
    .page-subtitle {
      font-size: 1.125rem;
    }
    
    .category-filter {
      gap: 8px;
    }
    
    .category-btn {
      padding: 6px 12px;
      font-size: 14px;
    }
    
    .news-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    
    .coming-soon {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }
</style>
