# IMDb Clone - TMDB API Integration

A modern, responsive movie and TV show discovery application built with Svelte and powered by The Movie Database (TMDB) API.

## 🚀 Features

### Core Functionality
- **Movie Discovery**: Browse trending, popular, top-rated, and upcoming movies
- **TV Show Discovery**: Explore trending, popular, and top-rated TV series
- **Advanced Search**: Search across movies, TV shows, and people
- **Comprehensive Filtering**: Filter by genre, year, and sort by various criteria
- **Responsive Design**: Mobile-first design that works on all devices

### Pages & Sections
- **Home**: Featured content with trending movies and TV shows
- **Movies**: Comprehensive movie browsing with advanced filters
- **TV Shows**: TV series discovery and browsing
- **Celebrities**: Actor, director, and crew information
- **Awards**: Information about major film awards and ceremonies
- **News**: Movie industry news and updates

### Technical Features
- **TMDB API Integration**: Full integration with The Movie Database
- **Real-time Data**: Live data from TMDB's comprehensive database
- **Image Optimization**: High-quality posters and backdrops
- **State Management**: Svelte stores for persistent data
- **Modern UI/UX**: Beautiful, intuitive interface with smooth animations

## 🛠️ Technology Stack

- **Frontend**: Svelte 3
- **Build Tool**: Rollup
- **API**: TMDB (The Movie Database)
- **Styling**: CSS with CSS Variables for theming
- **State Management**: Svelte Stores
- **Deployment**: Static hosting ready

## 🔑 API Configuration

This application uses the TMDB API. You'll need to configure your API credentials using environment variables:

### Required Environment Variables
Create a `.env` file in the root directory with the following variables:
```bash
TMDB_API_KEY=your_api_key_here
TMDB_ACCESS_TOKEN=your_access_token_here
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

### Getting TMDB API Access
1. Visit [TMDB](https://www.themoviedb.org/)
2. Create an account and request API access
3. Get your API key and access token
4. Copy `.env.example` to `.env` and fill in your credentials

**Note**: The `.env` file is already in `.gitignore` to prevent committing sensitive credentials.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Carousel.svelte
│   ├── GenreFilter.svelte
│   ├── Header.svelte
│   ├── MovieGrid.svelte
│   ├── MovieItem.svelte
│   ├── MovieModal.svelte
│   ├── Navigation.svelte
│   ├── SearchBar.svelte
│   ├── Section.svelte
│   ├── SkeletonCard.svelte
│   ├── SortFilter.svelte
│   ├── ThemeToggle.svelte
│   └── YearFilter.svelte
├── pages/              # Page components
│   ├── AwardsPage.svelte
│   ├── MoviesPage.svelte
│   ├── NewsPage.svelte
│   ├── PeoplePage.svelte
│   └── TVShowsPage.svelte
├── services/           # API and external services
│   └── tmdb.js        # TMDB API integration
├── stores.js          # Svelte stores for state management
├── App.svelte         # Main application component
└── main.js            # Application entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd IMDB-Clone-Svelte
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure TMDB API:
   - Copy `.env.example` to `.env`
   - Fill in your TMDB API credentials in the `.env` file

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5000`

## 📱 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server

## 🌟 TMDB API Features Used

### Movies
- Trending movies (daily/weekly)
- Popular movies
- Top-rated movies
- Upcoming movies
- Now playing movies
- Movie discovery with filters
- Movie details with credits, videos, and reviews

### TV Shows
- Trending TV shows
- Popular TV series
- Top-rated TV shows
- TV show discovery
- TV show details

### People
- Trending people
- Popular celebrities
- People search
- Person details

### Search & Discovery
- Multi-search across movies, TV shows, and people
- Advanced filtering by genre, year, rating, etc.
- Sorting by popularity, rating, release date, etc.

## 🎨 Customization

### Theming
The application uses CSS variables for easy theming. Key variables include:
- `--accent-primary`: Primary accent color
- `--accent-secondary`: Secondary accent color
- `--surface-1`, `--surface-2`, `--surface-3`: Surface colors
- `--text-primary`, `--text-secondary`: Text colors

### Adding New Features
1. **New API Endpoints**: Add to `src/services/tmdb.js`
2. **New Pages**: Create in `src/pages/` and add to navigation
3. **New Components**: Create in `src/components/` for reusability
4. **New Stores**: Add to `src/stores.js` for state management

## 🔒 Security Considerations

- API keys are stored in environment variables (`.env` file)
- The `.env` file is excluded from version control via `.gitignore`
- CORS is handled by TMDB API
- No sensitive user data is stored

## 📈 Performance Features

- Lazy loading of images
- Skeleton loading states
- Efficient pagination
- Optimized API calls
- Responsive image sizes

## 🌐 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers
- Progressive Web App ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing the comprehensive movie and TV show database
- [Svelte](https://svelte.dev/) for the amazing reactive framework
- The open-source community for inspiration and tools

## 📞 Support

For questions or issues:
1. Check the existing issues
2. Create a new issue with detailed information
3. Include browser and device information

---

**Note**: This application is for educational and demonstration purposes. Please respect TMDB's terms of service and rate limits when using their API.
