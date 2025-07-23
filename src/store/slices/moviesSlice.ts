import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Movie } from '../../services/tmdbApi'  // ✅ Use the *same* Movie everywhere!

interface MoviesState {
  selectedMovie: Movie | null
  searchQuery: string
  currentPage: number
  totalPages: number
}

const initialState: MoviesState = {
  selectedMovie: null,
  searchQuery: '',
  currentPage: 1,
  totalPages: 1,
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSelectedMovie: (state, action: PayloadAction<Movie | null>) => {
      state.selectedMovie = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      state.currentPage = 1 // Reset to first page when searching
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload
    },
  },
})

export const { setSelectedMovie, setSearchQuery, setCurrentPage, setTotalPages } = moviesSlice.actions
export default moviesSlice.reducer
