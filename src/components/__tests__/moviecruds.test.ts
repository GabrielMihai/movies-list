import { test, expect } from 'vitest'
import MovieService from '../../service/MovieService.ts'
import { Movie } from '../../types/Movie.ts'

// const sum = (a: number, b: number) => {
//   return a + b
// }

// test('add 2 number', () => {
//   expect(sum(2, 3)).toEqual(5)
// })

test('Get movies, expect empty array', () => {
  expect(MovieService.getAll()).toEqual([])
})

test('Add one movie', () => {
  MovieService.create({
    id: undefined,
    title: 'Test Movie',
    summary: 'Test Movie summary',
    director: 'Test Movie director',
    releaseYear: 2022,
    poster: undefined,
    fileName: undefined
  } as Movie)
})

test('Get movies, expect one with title "Test Movie"', () => {
  const movies: Movie[] = MovieService.getAll()
  expect(movies && movies.length === 1 && movies[0].title).toEqual('Test Movie')
})

test('Edit the only movie, set title = "Test Movie ALPHA" and set releaseYear = 1999', () => {
  const movies: Movie[] = MovieService.getAll()
  if (movies?.length === 1 && movies[0].title === 'Test Movie') {
    const tempMovie: Movie = movies[0]
    tempMovie.title = `${tempMovie.title} ALPHA`
    tempMovie.releaseYear = 1999

    MovieService.update(tempMovie)
  }
})

test('Get movies, expect one movie with title = "Test Movie ALPHA" and releaseYear = 1999', () => {
  const movies: Movie[] = MovieService.getAll()
  expect(movies?.length === 1 && movies[0].title).toEqual('Test Movie ALPHA')
  expect(movies?.length === 1 && movies[0].releaseYear).toEqual(1999)
})

test('Delete the only movie', () => {
  const movies: Movie[] = MovieService.getAll()
  if (movies?.length === 1) {
    MovieService.delete(movies[0].id!)
  }
})

test('Get movies, expect empty array', () => {
  expect(MovieService.getAll()).toEqual([])
})
