import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { moviesApi, Movie } from '../../services/tmdbApi'
import { RootState } from '../../store/store'
import { setSelectedMovie, setTotalPages } from '../../store/slices/moviesSlice'
import MovieCard from '../../components/MovieCard/MovieCard'
import MovieModal from '../../components/MovieModal/MovieModal'
import SearchForm from '../../components/SearchForm/SearchForm'
import Pagination from '../../components/Pagination/Pagination'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)
  const { selectedMovie, searchQuery, currentPage } = useSelector((state: RootState) => state.movies)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<'popular' | 'top_rated' | 'now_playing' | 'upcoming'>('popular')

  // Fetch movies based on search query and category
  const { data: moviesData, isLoading, error } = useQuery({
    queryKey: ['dashboard-movies', searchQuery, currentPage, activeCategory],
    queryFn: () => {
      if (searchQuery) {
        return moviesApi.searchMovies(searchQuery, currentPage)
      }
      
      switch (activeCategory) {
        case 'top_rated':
          return moviesApi.getTopRatedMovies(currentPage)
        case 'now_playing':
          return moviesApi.getNowPlayingMovies(currentPage)
        case 'upcoming':
          return moviesApi.getUpcomingMovies(currentPage)
        default:
          return moviesApi.getPopularMovies(currentPage)
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  // Update total pages when data changes
  React.useEffect(() => {
    if (moviesData) {
      dispatch(setTotalPages(Math.min(moviesData.total_pages, 500))) // TMDB limits to 500 pages
    }
  }, [moviesData, dispatch])

  const handleMovieClick = (movie: Movie) => {
    dispatch(setSelectedMovie(movie))
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    dispatch(setSelectedMovie(null))
  }

  const handleSearch = (query: string) => {
    // Search is handled by the searchQuery state change in SearchForm
  }

  const handlePageChange = (page: number) => {
    // Page change is handled by the currentPage state change in Pagination
  }

  const getCategoryTitle = () => {
    if (searchQuery) return `Search Results for "${searchQuery}"`
    
    switch (activeCategory) {
      case 'top_rated':
        return 'Top Rated Movies'
      case 'now_playing':
        return 'Now Playing'
      case 'upcoming':
        return 'Upcoming Movies'
      default:
        return 'Popular Movies'
    }
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          <h4>Error loading movies</h4>
          <p>Please try again later or check your internet connection.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mt-4">
      {/* Welcome Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="bg-primary text-white rounded p-4 mb-4">
            <h1 className="h3 mb-2">Welcome back, {user?.name}! 👋</h1>
            <p className="mb-0">Explore your personalized movie dashboard with advanced search and filtering options.</p>
          </div>
        </div>
      </div>

      {/* Search Form */}
      <SearchForm onSearch={handleSearch} />

      {/* Category Tabs */}
      {!searchQuery && (
        <div className="mb-4">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeCategory === 'popular' ? 'active' : ''}`}
                onClick={() => setActiveCategory('popular')}
              >
                🔥 Popular
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeCategory === 'top_rated' ? 'active' : ''}`}
                onClick={() => setActiveCategory('top_rated')}
              >
                ⭐ Top Rated
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeCategory === 'now_playing' ? 'active' : ''}`}
                onClick={() => setActiveCategory('now_playing')}
              >
                🎬 Now Playing
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeCategory === 'upcoming' ? 'active' : ''}`}
                onClick={() => setActiveCategory('upcoming')}
              >
                🚀 Upcoming
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Results Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 mb-0">{getCategoryTitle()}</h2>
        {moviesData && (
          <span className="text-muted">
            {moviesData.total_results.toLocaleString()} results
          </span>
        )}
      </div>

      {/* Movies Grid */}
      {moviesData && moviesData.results.length > 0 ? (
        <>
          <div className="row">
            {moviesData.results.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={handleMovieClick}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination onPageChange={handlePageChange} />
        </>
      ) : (
        <div className="text-center py-5">
          <h3 className="text-muted">No movies found</h3>
          <p className="text-muted">Try searching for something else or check a different category</p>
        </div>
      )}

      {/* Movie Modal */}
      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default DashboardPage