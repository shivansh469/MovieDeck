import React from 'react'
import { Movie } from '../../services/tmdbApi'
import { getImageUrl, formatRating } from '../../services/tmdbApi'

interface MovieCardProps {
  movie: Movie
  onClick: (movie: Movie) => void
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="card movie-card h-100" onClick={() => onClick(movie)}>
        <img
          src={getImageUrl(movie.poster_path)}
          className="card-img-top movie-poster"
          alt={movie.title}
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&dpr=1'
          }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="movie-title">{movie.title}</h5>
          <p className="card-text text-muted small flex-grow-1">
            {movie.overview ? movie.overview.substring(0, 100) + '...' : 'No description available'}
          </p>
          <div className="d-flex justify-content-between align-items-center mt-auto">
            <small className="text-muted">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown'}
            </small>
            <span className="movie-rating">
              ⭐ {formatRating(movie.vote_average)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard