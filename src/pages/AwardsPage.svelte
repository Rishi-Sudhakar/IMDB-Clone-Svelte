<!-- src/pages/AwardsPage.svelte -->
<script>
  import Section from '../components/Section.svelte';
  
  // Mock awards data - in a real app, this would come from TMDB or another API
  const awards = [
    {
      id: 1,
      name: "Academy Awards (Oscars)",
      description: "The most prestigious awards in the film industry, presented annually by the Academy of Motion Picture Arts and Sciences.",
      nextCeremony: "2024-03-10",
      categories: ["Best Picture", "Best Director", "Best Actor", "Best Actress", "Best Supporting Actor", "Best Supporting Actress"]
    },
    {
      id: 2,
      name: "Golden Globe Awards",
      description: "Annual awards for both film and television, presented by the Hollywood Foreign Press Association.",
      nextCeremony: "2024-01-07",
      categories: ["Best Motion Picture", "Best Director", "Best Actor", "Best Actress", "Best Supporting Actor", "Best Supporting Actress"]
    },
    {
      id: 3,
      name: "BAFTA Awards",
      description: "British Academy Film Awards, presented by the British Academy of Film and Television Arts.",
      nextCeremony: "2024-02-18",
      categories: ["Best Film", "Best Director", "Best Actor", "Best Actress", "Best Supporting Actor", "Best Supporting Actress"]
    },
    {
      id: 4,
      name: "Cannes Film Festival",
      description: "One of the most prestigious film festivals in the world, held annually in Cannes, France.",
      nextCeremony: "2024-05-14",
      categories: ["Palme d'Or", "Grand Prix", "Best Director", "Best Actor", "Best Actress", "Best Screenplay"]
    },
    {
      id: 5,
      name: "Venice Film Festival",
      description: "The oldest film festival in the world, held annually in Venice, Italy.",
      nextCeremony: "2024-08-28",
      categories: ["Golden Lion", "Silver Lion", "Best Director", "Best Actor", "Best Actress", "Best Screenplay"]
    },
    {
      id: 6,
      name: "Sundance Film Festival",
      description: "The largest independent film festival in the United States, held annually in Park City, Utah.",
      nextCeremony: "2024-01-18",
      categories: ["Grand Jury Prize", "Audience Award", "Best Director", "Best Screenplay", "Best Cinematography"]
    }
  ];
  
  const recentWinners = [
    {
      id: 1,
      movie: "Everything Everywhere All at Once",
      award: "Best Picture",
      ceremony: "Academy Awards 2023",
      year: "2023"
    },
    {
      id: 2,
      movie: "The Whale",
      award: "Best Actor",
      ceremony: "Academy Awards 2023",
      year: "2023"
    },
    {
      id: 3,
      movie: "Tár",
      award: "Best Actress",
      ceremony: "Academy Awards 2023",
      year: "2023"
    },
    {
      id: 4,
      movie: "Top Gun: Maverick",
      award: "Best Sound",
      ceremony: "Academy Awards 2023",
      year: "2023"
    }
  ];
</script>

<div class="awards-page">
  <div class="page-header">
    <h1>Awards & Recognition</h1>
    <p class="page-subtitle">Celebrating excellence in filmmaking and performance</p>
  </div>
  
  <!-- Major Awards Section -->
  <Section title="Major Film Awards" subtitle="The most prestigious honors in cinema">
    <div class="awards-grid">
      {#each awards as award (award.id)}
        <div class="award-card">
          <div class="award-header">
            <h3 class="award-name">{award.name}</h3>
            <span class="award-date">
              {new Date(award.nextCeremony).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </span>
          </div>
          <p class="award-description">{award.description}</p>
          <div class="award-categories">
            <h4>Categories:</h4>
            <div class="category-tags">
              {#each award.categories as category}
                <span class="category-tag">{category}</span>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </Section>
  
  <!-- Recent Winners Section -->
  <Section title="Recent Winners" subtitle="Latest award recipients">
    <div class="winners-grid">
      {#each recentWinners as winner (winner.id)}
        <div class="winner-card">
          <div class="winner-info">
            <h3 class="winner-movie">{winner.movie}</h3>
            <p class="winner-award">{winner.award}</p>
            <p class="winner-ceremony">{winner.ceremony}</p>
            <span class="winner-year">{winner.year}</span>
          </div>
        </div>
      {/each}
    </div>
  </Section>
  
  <!-- Awards Calendar Section -->
  <Section title="Awards Calendar" subtitle="Upcoming ceremonies and deadlines">
    <div class="calendar-grid">
      {#each awards.filter(a => new Date(a.nextCeremony) > new Date()).sort((a, b) => new Date(a.nextCeremony) - new Date(b.nextCeremony)) as award (award.id)}
        <div class="calendar-item">
          <div class="calendar-date">
            <span class="month">{new Date(award.nextCeremony).toLocaleDateString('en-US', { month: 'short' })}</span>
            <span class="day">{new Date(award.nextCeremony).getDate()}</span>
          </div>
          <div class="calendar-info">
            <h4>{award.name}</h4>
            <p>Submission deadline: {new Date(new Date(award.nextCeremony).getTime() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
          </div>
        </div>
      {/each}
    </div>
  </Section>
  
  <!-- Fun Facts Section -->
  <Section title="Did You Know?" subtitle="Interesting facts about film awards">
    <div class="facts-grid">
      <div class="fact-card">
        <div class="fact-icon">🏆</div>
        <h3>First Academy Awards</h3>
        <p>The first Academy Awards ceremony was held in 1929 at the Hollywood Roosevelt Hotel, with only 270 people in attendance.</p>
      </div>
      <div class="fact-card">
        <div class="fact-icon">🎭</div>
        <h3>Most Oscars</h3>
        <p>Walt Disney holds the record for most Academy Awards won by an individual, with 22 competitive Oscars and 4 honorary awards.</p>
      </div>
      <div class="fact-card">
        <div class="fact-icon">👑</div>
        <h3>Youngest Winner</h3>
        <p>Tatum O'Neal became the youngest Oscar winner at age 10 for her role in "Paper Moon" (1973).</p>
      </div>
      <div class="fact-card">
        <div class="fact-icon">🌟</div>
        <h3>International Recognition</h3>
        <p>The Cannes Film Festival's Palme d'Or is considered one of the most prestigious awards in world cinema.</p>
      </div>
    </div>
  </Section>
</div>

<style>
  .awards-page {
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
  
  .awards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 24px;
    margin-bottom: 32px;
  }
  
  .award-card {
    background: var(--surface-1);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 24px;
    transition: all var(--transition-normal);
  }
  
  .award-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--accent-primary);
  }
  
  .award-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
  }
  
  .award-name {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: var(--text-strong);
    flex: 1;
    margin-right: 16px;
  }
  
  .award-date {
    background: var(--accent-primary);
    color: white;
    padding: 4px 12px;
    border-radius: var(--radius-sm);
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
  }
  
  .award-description {
    margin: 0 0 20px 0;
    color: var(--text-secondary);
    line-height: 1.6;
  }
  
  .award-categories h4 {
    margin: 0 0 12px 0;
    color: var(--text-strong);
    font-size: 16px;
  }
  
  .category-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .category-tag {
    background: var(--surface-2);
    color: var(--text-primary);
    padding: 4px 8px;
    border-radius: var(--radius-sm);
    font-size: 12px;
    font-weight: 500;
  }
  
  .winners-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 32px;
  }
  
  .winner-card {
    background: var(--surface-1);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 20px;
    text-align: center;
    transition: all var(--transition-normal);
  }
  
  .winner-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: var(--accent-secondary);
  }
  
  .winner-movie {
    margin: 0 0 8px 0;
    font-size: 18px;
    font-weight: 600;
    color: var(--text-strong);
  }
  
  .winner-award {
    margin: 0 0 4px 0;
    color: var(--accent-primary);
    font-weight: 500;
  }
  
  .winner-ceremony {
    margin: 0 0 8px 0;
    color: var(--text-secondary);
    font-size: 14px;
  }
  
  .winner-year {
    background: var(--accent-secondary);
    color: white;
    padding: 2px 8px;
    border-radius: var(--radius-sm);
    font-size: 12px;
    font-weight: 600;
  }
  
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 32px;
  }
  
  .calendar-item {
    display: flex;
    align-items: center;
    gap: 16px;
    background: var(--surface-1);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 20px;
    transition: all var(--transition-normal);
  }
  
  .calendar-item:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: var(--accent-primary);
  }
  
  .calendar-date {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 60px;
  }
  
  .month {
    background: var(--accent-primary);
    color: white;
    padding: 4px 8px;
    border-radius: var(--radius-sm);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
  }
  
  .day {
    font-size: 24px;
    font-weight: 700;
    color: var(--text-strong);
    margin-top: 4px;
  }
  
  .calendar-info h4 {
    margin: 0 0 8px 0;
    color: var(--text-strong);
    font-size: 16px;
  }
  
  .calendar-info p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 14px;
  }
  
  .facts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 24px;
  }
  
  .fact-card {
    text-align: center;
    padding: 24px;
    background: var(--surface-1);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border);
  }
  
  .fact-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }
  
  .fact-card h3 {
    margin: 0 0 12px 0;
    color: var(--text-strong);
    font-size: 18px;
  }
  
  .fact-card p {
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
    
    .awards-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    
    .award-header {
      flex-direction: column;
      gap: 12px;
    }
    
    .award-date {
      align-self: flex-start;
    }
    
    .winners-grid {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
    }
    
    .calendar-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    
    .facts-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }
</style>
