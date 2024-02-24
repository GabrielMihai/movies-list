<template>
  <div class="movie-table-container">
    <div class="movie-table-data">
      <table>
        <thead>
          <tr>
            <th v-for="(header, headerIndex) in headers" :key="headerIndex">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movie in props.movies" :key="movie.id">
            <td>{{ movie.title }}</td>
            <td>
              {{
                movie.summary && movie.summary.length > 50
                  ? movie.summary.slice(0, 50) + '...'
                  : movie.summary
              }}
            </td>
            <td>{{ movie.director }}</td>
            <td>{{ movie.releaseYear }}</td>
            <td>
              <div class="movie-table-actions">
                <mv-icon icon="pencil" class="table-action-icon" @click="editMovieHandler(movie)" />
                <mv-icon
                  icon="delete"
                  class="table-action-icon"
                  @click="deleteMovieHandler(movie)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="movie-table-no-data" v-if="!movies || movies.length === 0">
        No movies found...
      </div>
    </div>
    <div class="movie-table-footer-actions">
      <mv-button icon="plus" @click="emitShowDialog">ADD</mv-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import MovieService from '@/service/MovieService'
import type { Movie } from '@/types/Movie'
import MvButton from './MvButton.vue'
import MvIcon from './MvIcon.vue'

const props = defineProps<{
  movies: Movie[]
}>()

const emits = defineEmits(['dialog:show', 'movie:edit', 'refresh'])

const headers = ['Title', 'Summary', 'Director', 'Release year', 'Actions']

const emitShowDialog = (movie?: Movie) => {
  emits('dialog:show', movie)
}

const editMovieHandler = (movie: Movie) => {
  emits('movie:edit', movie)
}

const deleteMovieHandler = (movie: Movie) => {
  MovieService.delete(movie.id!)
  emits('refresh')
}
</script>

<style scoped></style>
