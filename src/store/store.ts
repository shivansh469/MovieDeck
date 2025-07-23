import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import moviesReducer from './slices/moviesSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch