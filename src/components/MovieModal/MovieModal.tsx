import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Movie, moviesApi, getImageUrl, formatDate, formatRuntime, formatRating } from '../../services/tmdbApi'

interface MovieModalProps {
  movie: Movie | null
  isOpen: boolean
  onClose: () => void
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, isOpen, onClose }) => {
  const { data: movieDetails, isLoading: detailsLoading } = useQuery({
    queryKey: ['movieDetails', movie?.id],
    queryFn: () => moviesApi.getMovieDetails(movie!.id),
    enabled: !!movie,
  })

  const { data: credits, isLoading: creditsLoading } = useQuery({
    queryKey: ['movieCredits', movie?.id],
    queryFn: () => moviesApi.getMovieCredits(movie!.id),
    enabled: !!movie,
  })

  if (!movie || !isOpen) return null

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{movie.title}</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {detailsLoading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-4 mb-3">
                  <img
                    src={getImageUrl(movie.poster_path)}
                    className="img-fluid rounded"
                    alt={movie.title}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&dpr=1'
                    }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="mb-3">
                    <h6 className="fw-bold">Overview</h6>
                    <p className="text-muted">{movie.overview || 'No overview available'}</p>
                  </div>
                  
                  <div className="row mb-3">
                    <div className="col-6">
                      <h6 className="fw-bold">Release Date</h6>
                      <p className="text-muted">{formatDate(movie.release_date)}</p>
                    </div>
                    <div className="col-6">
                      <h6 className="fw-bold">Rating</h6>
                      <p className="text-muted">⭐ {formatRating(movie.vote_average)} / 5</p>
                    </div>
                  </div>

                  {movieDetails && (
                    <>
                      <div className="row mb-3">
                        <div className="col-6">
                          <h6 className="fw-bold">Runtime</h6>
                          <p className="text-muted">{formatRuntime(movieDetails.runtime)}</p>
                        </div>
                        <div className="col-6">
                          <h6 className="fw-bold">Status</h6>
                          <p className="text-muted">{movieDetails.status}</p>
                        </div>
                      </div>

                      {movieDetails.genres && movieDetails.genres.length > 0 && (
                        <div className="mb-3">
                          <h6 className="fw-bold">Genres</h6>
                          <div className="d-flex flex-wrap gap-2">
                            {movieDetails.genres.map((genre) => (
                              <span key={genre.id} className="badge bg-secondary">
                                {genre.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {movieDetails.tagline && (
                        <div className="mb-3">
                          <h6 className="fw-bold">Tagline</h6>
                          <p className="text-muted fst-italic">"{movieDetails.tagline}"</p>
                        </div>
                      )}
                    </>
                  )}

                  {credits && credits.cast && credits.cast.length > 0 && (
                    <div className="mb-3">
                      <h6 className="fw-bold">Cast</h6>
                      <div className="row">
                        {credits.cast.slice(0, 6).map((actor) => (
                          <div key={actor.id} className="col-4 mb-2">
                            <div className="d-flex align-items-center">
                              <img
                                src={getImageUrl(actor.profile_path, 'w92')}
                                className="rounded-circle me-2"
                                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                alt={actor.name}
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=92&h=92&dpr=1'
                                }}
                              />
                              <div>
                                <small className="fw-bold d-block">{actor.name}</small>
                                <small className="text-muted">{actor.character}</small>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieModal