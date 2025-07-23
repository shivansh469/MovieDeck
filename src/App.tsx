import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store/store'
import { validateToken } from './store/slices/authSlice'
import Navbar from './components/Navbar/Navbar'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import SignupPage from './pages/SignupPage/SignupPage'
import DashboardPage from './pages/DashboardPage/DashboardPage'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'
import { AppDispatch } from './store/store'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    const token = localStorage.getItem('movieDeckToken')
    if (token) {
      dispatch(validateToken(token))
    }
  }, [dispatch])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} 
        />
        <Route 
          path="/signup" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignupPage />} 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App