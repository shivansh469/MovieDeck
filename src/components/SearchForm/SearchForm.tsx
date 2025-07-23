import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { setSearchQuery } from '../../store/slices/moviesSlice'

interface SearchFormData {
  query: string
}

interface SearchFormProps {
  onSearch: (query: string) => void
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const dispatch = useDispatch()
  const { searchQuery } = useSelector((state: RootState) => state.movies)
  
  const { register, handleSubmit, reset } = useForm<SearchFormData>({
    defaultValues: { query: searchQuery }
  })

  const onSubmit = (data: SearchFormData) => {
    const query = data.query.trim()
    dispatch(setSearchQuery(query))
    onSearch(query)
  }

  const handleClear = () => {
    reset({ query: '' })
    dispatch(setSearchQuery(''))
    onSearch('')
  }

  return (
    <div className="search-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row g-3 align-items-end">
          <div className="col-md-8">
            <label htmlFor="search" className="form-label fw-bold">
              Search Movies
            </label>
            <input
              {...register('query')}
              type="text"
              className="form-control"
              id="search"
              placeholder="Search for movies..."
            />
          </div>
          <div className="col-md-4">
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary flex-grow-1">
                🔍 Search
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={handleClear}>
                Clear
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SearchForm