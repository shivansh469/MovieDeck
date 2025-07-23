# 🎬 MovieDeck - Production-Ready Movie Listing App

A modern, responsive movie listing application built with ReactJS, featuring secure authentication, advanced search capabilities, and detailed movie information from The Movie Database (TMDB) API.

![MovieDeck Screenshot](https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1)

## ✨ Features

### 🔐 Authentication System
- **Secure Login/Signup Flow**: Complete user authentication with form validation
- **Token Management**: JWT tokens stored securely in localStorage
- **Protected Routes**: Dashboard access restricted to authenticated users only
- **Demo Account**: Pre-configured demo account for testing

### 🎭 Movie Discovery
- **Popular Movies**: Browse trending and popular movies
- **Advanced Search**: Real-time movie search with query persistence
- **Multiple Categories**: Popular, Top Rated, Now Playing, and Upcoming movies
- **Detailed Information**: Comprehensive movie details including cast, runtime, and ratings
- **Modal View**: Clean, responsive modals for detailed movie information

### 🛠️ Technical Features
- **Redux Toolkit**: Centralized state management for auth and movies
- **React Query**: Efficient API data fetching with caching and background updates
- **React Hook Form**: Robust form handling with validation
- **React Router**: Client-side routing with protected routes
- **Bootstrap 5**: Responsive design with modern UI components
- **TypeScript**: Full type safety throughout the application

### 📱 User Experience
- **Responsive Design**: Optimized for all screen sizes (mobile, tablet, desktop)
- **Loading States**: Smooth loading indicators and skeleton screens
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Pagination**: Navigate through large movie collections efficiently
- **Search Persistence**: Search queries and pagination state maintained across navigation

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/moviedeck.git
   cd moviedeck
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up TMDB API** (Optional - Demo API key included)
   - Visit [TMDB API](https://www.themoviedb.org/settings/api) to get your API key
   - Replace the API key in `src/services/tmdbApi.ts`

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Use the demo account: `demo@moviedeck.com` / `password123`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar/         # Navigation component
│   ├── MovieCard/      # Movie card component
│   ├── MovieModal/     # Movie details modal
│   ├── SearchForm/     # Search functionality
│   ├── Pagination/     # Pagination component
│   ├── LoadingSpinner/ # Loading indicator
│   └── ProtectedRoute/ # Route protection
├── pages/              # Page components
│   ├── HomePage/       # Public landing page
│   ├── LoginPage/      # User login
│   ├── SignupPage/     # User registration
│   └── DashboardPage/  # Protected dashboard
├── store/              # Redux store configuration
│   ├── store.ts        # Store setup
│   └── slices/         # Redux slices
│       ├── authSlice.ts    # Authentication state
│       └── moviesSlice.ts  # Movies state
├── services/           # API services
│   ├── tmdbApi.ts      # TMDB API integration
│   └── authService.ts  # Authentication service
└── App.tsx             # Main application component
```

## 🎯 Key Technologies

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Framework | ^18.2.0 |
| **TypeScript** | Type Safety | ^5.3.3 |
| **Vite** | Build Tool | ^5.0.12 |
| **Redux Toolkit** | State Management | ^2.0.1 |
| **React Query** | Data Fetching | ^5.17.1 |
| **React Router** | Routing | ^6.21.3 |
| **React Hook Form** | Form Management | ^7.49.3 |
| **Bootstrap** | UI Components | ^5.3.2 |
| **Axios** | HTTP Client | ^1.6.7 |

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Integration

### The Movie Database (TMDB)
- **Base URL**: `https://api.themoviedb.org/3`
- **Endpoints Used**:
  - `/movie/popular` - Popular movies
  - `/movie/top_rated` - Top rated movies
  - `/movie/now_playing` - Currently playing
  - `/movie/upcoming` - Upcoming releases
  - `/search/movie` - Movie search
  - `/movie/{id}` - Movie details
  - `/movie/{id}/credits` - Cast information

### Rate Limiting
- TMDB allows 40 requests per 10 seconds
- React Query caching minimizes API calls
- 5-minute stale time for efficient data management

## 🔒 Security Features

- **Token-based Authentication**: Secure JWT token management
- **Protected Routes**: Unauthorized access prevention
- **Input Validation**: Comprehensive form validation
- **XSS Protection**: Safe data rendering
- **Error Boundary**: Graceful error handling

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Flexible Grid**: Bootstrap's responsive grid system
- **Touch Friendly**: Optimized for touch interactions

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Set up redirects for client-side routing

### Deploy to Vercel
1. Connect your GitHub repository
2. Vercel will automatically detect the Vite configuration
3. Deploy with zero configuration

### Environment Variables
For production deployment, set up these environment variables:
- `VITE_TMDB_API_KEY` - Your TMDB API key
- `VITE_API_BASE_URL` - Backend API URL (if using real authentication)

## 🧪 Testing the Application

### Demo Credentials
- **Email**: `demo@moviedeck.com`
- **Password**: `password123`

### Test Scenarios
1. **Authentication Flow**
   - Register a new account
   - Login with demo credentials
   - Access protected dashboard

2. **Movie Discovery**
   - Browse popular movies
   - Search for specific movies
   - Navigate through categories
   - View movie details

3. **Responsive Design**
   - Test on different screen sizes
   - Verify mobile navigation
   - Check modal responsiveness

## 🔄 Future Enhancements

- [ ] User favorites and watchlist
- [ ] Movie recommendations
- [ ] User reviews and ratings
- [ ] Social features (sharing, comments)
- [ ] Advanced filtering (genre, year, rating)
- [ ] Dark mode theme
- [ ] Progressive Web App (PWA) features
- [ ] Real-time notifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API
- [Bootstrap](https://getbootstrap.com/) for the UI components
- [React Query](https://tanstack.com/query) for excellent data fetching capabilities
- [Redux Toolkit](https://redux-toolkit.js.org/) for simplified state management

## 📞 Support

If you have any questions or need help with the project, please:
- Open an issue on GitHub
- Check the documentation
- Review the demo implementation

---

**Built with ❤️ using React, TypeScript, and modern web technologies**