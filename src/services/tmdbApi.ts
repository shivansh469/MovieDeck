import axios from 'axios'

const TMDB_API_KEY = '8c7a6d8b2f4e3d8f1c5b9a7e3f8d2c1b' // Demo API key - replace with your own
const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

// Create axios instance
const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
})

export interface Movie {
  id: number
  title: string
  poster_path: string
  backdrop_path: string
  overview: string
  release_date: string
  vote_average: number
  genre_ids: number[]
  adult: boolean
  original_language: string
  original_title: string
  popularity: number
  video: boolean
  vote_count: number
}

export interface MovieDetails extends Movie {
  runtime: number
  genres: { id: number; name: string }[]
  production_companies: { id: number; name: string; logo_path: string }[]
  production_countries: { iso_3166_1: string; name: string }[]
  spoken_languages: { iso_639_1: string; name: string }[]
  status: string
  tagline: string
  budget: number
  revenue: number
  homepage: string
  imdb_id: string
}

export interface Cast {
  id: number
  name: string
  character: string
  profile_path: string
  order: number
}

export interface MoviesResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

// API functions
export const moviesApi = {
  // Get popular movies
  getPopularMovies: async (page: number = 1): Promise<MoviesResponse> => {
    const response = await tmdbApi.get('/movie/popular', {
      params: { page }
    })
    return response.data
  },

  // Get now playing movies
  getNowPlayingMovies: async (page: number = 1): Promise<MoviesResponse> => {
    const response = await tmdbApi.get('/movie/now_playing', {
      params: { page }
    })
    return response.data
  },

  // Get top rated movies
  getTopRatedMovies: async (page: number = 1): Promise<MoviesResponse> => {
    const response = await tmdbApi.get('/movie/top_rated', {
      params: { page }
    })
    return response.data
  },

  // Get upcoming movies
  getUpcomingMovies: async (page: number = 1): Promise<MoviesResponse> => {
    const response = await tmdbApi.get('/movie/upcoming', {
      params: { page }
    })
    return response.data
  },

  // Search movies
  searchMovies: async (query: string, page: number = 1): Promise<MoviesResponse> => {
    const response = await tmdbApi.get('/search/movie', {
      params: { query, page }
    })
    return response.data
  },

  // Get movie details
  getMovieDetails: async (movieId: number): Promise<MovieDetails> => {
    const response = await tmdbApi.get(`/movie/${movieId}`)
    return response.data
  },

  // Get movie cast
  getMovieCredits: async (movieId: number): Promise<{ cast: Cast[] }> => {
    const response = await tmdbApi.get(`/movie/${movieId}/credits`)
    return response.data
  },

  // Get movie genres
  getGenres: async (): Promise<{ genres: { id: number; name: string }[] }> => {
    const response = await tmdbApi.get('/genre/movie/list')
    return response.data
  },
}

// Utility functions
export const getImageUrl = (path: string, size: string = 'w500'): string => {
  if (!path) return '/placeholder-movie.jpg'
  return `https://image.tmdb.org/t/p/${size}${path}`
}

export const formatDate = (dateString: string): string => {
  if (!dateString) return 'Unknown'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const formatRuntime = (minutes: number): string => {
  if (!minutes) return 'Unknown'
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}m`
}

export const formatRating = (rating: number): string => {
  return (rating / 2).toFixed(1) // Convert from 10-point to 5-point scale
}