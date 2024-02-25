import type { Movie } from '@/types/Movie'

const MOVIES_LOCAL_STORAGE_KEY = 'movies'

export default {
  getAll(): Movie[] {
    const moviesJsonString: string | null = localStorage.getItem(MOVIES_LOCAL_STORAGE_KEY)
    if (moviesJsonString) {
      const movies: Movie[] = JSON.parse(moviesJsonString)
      return movies
    }
    return []
  },
  create(movie: Movie): void {
    movie.id = Math.random().toString(16).slice(2)

    const movies = this.getAll()
    movies.push(movie)
    setMovies(movies)
    alert(this.getAll())
  },
  update(movie: Movie): void {
    const movies = this.getAll()

    const foundIndex = movies.findIndex((mov) => mov.id === movie.id)
    if (foundIndex !== -1) {
      movies[foundIndex] = movie
      setMovies(movies)
    }
  },
  delete(movieId: string): void {
    const movies = this.getAll()

    const foundIndex = movies.findIndex((mov) => mov.id === movieId)
    if (foundIndex !== -1) {
      movies.splice(foundIndex, 1)
      setMovies(movies)
    }
  }
}

const setMovies = (movies: Movie[]) => {
  localStorage.setItem(MOVIES_LOCAL_STORAGE_KEY, JSON.stringify(movies))
}
