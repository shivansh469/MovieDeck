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

const HomePage: React.FC = () => {
  const dispatch = useDispatch()
  const { selectedMovie, searchQuery, currentPage } = useSelector((state: RootState) => state.movies)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Fetch movies based on search query
  const { data: moviesData, isLoading, error } = useQuery({
    queryKey: ['movies', searchQuery, currentPage],
    queryFn: () => {
      if (searchQuery) {
        return moviesApi.searchMovies(searchQuery, currentPage)
      }
      return moviesApi.getPopularMovies(currentPage)
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
    // This triggers a new query due to the dependency array
  }

  const handlePageChange = (page: number) => {
    // Page change is handled by the currentPage state change in Pagination
    // This triggers a new query due to the dependency array
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    console.error('Movies API Error:', error)
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          <h4>Error loading movies</h4>
          <p>Unable to fetch movies from TMDB API. This might be due to API rate limits or network issues.</p>
          <button 
            className="btn btn-primary mt-2" 
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <h1 className="hero-title">Welcome to MovieDeck</h1>
          <p className="hero-subtitle">
            Discover amazing movies, get detailed information, and explore the world of cinema
          </p>
        </div>
      </div>

      <div className="container">
        {/* Search Form */}
        <SearchForm onSearch={handleSearch} />

        {/* Results Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h4 mb-0">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Movies'}
          </h2>
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
            <p className="text-muted">Try searching for something else</p>
          </div>
        )}
      </div>

      {/* Movie Modal */}
      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default HomePage