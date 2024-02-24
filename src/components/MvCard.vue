<template>
  <div class="movie-card">
    <div class="movie-card-img" @click="tapped = !tapped">
      <img :src="movie.poster" :alt="movie.fileName" />
    </div>
    <div
      :class="screenWidth < 768 ? (tapped ? 'movie-card-details' : 'd-none') : 'movie-card-details'"
      @click="tapped = !tapped"
    >
      <div
        v-for="(computedMovie, computedMovieIndex) in computedMovies"
        :key="computedMovieIndex"
        class="movie-card-detail"
      >
        <span class="movie-card-detail-key">{{ computedMovie.key }}</span>
        <span class="movie-card-detail-value">{{ computedMovie.value }}</span>
      </div>
    </div>

    <div class="movie-card-actions">
      <mv-button icon="pencil" @click="editHandler" />
      <mv-button icon="delete" @click="deleteHandler" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Movie } from '@/types/Movie'
import MvButton from './MvButton.vue'
import MovieService from '@/service/MovieService'

interface MovieDetails {
  key: string
  value: string
}

const props = defineProps<{
  movie: Movie
}>()

const emits = defineEmits(['refresh', 'movie:edit'])

const screenWidth = computed(() => screen.width)
const tapped = ref(false)

const computedMovies = computed(() => {
  let movieDetails: MovieDetails[] = []

  for (const [key, value] of Object.entries(props.movie)) {
    if (key !== 'fileName' && key !== 'poster' && key !== 'id') {
      movieDetails.push({
        key: key === 'releaseYear' ? 'RELEASE YEAR' : key.toUpperCase(),
        value: value.toString()
      })
    }
  }
  return movieDetails
})

const deleteHandler = () => {
  if (props.movie) {
    MovieService.delete(props.movie.id!)
    emits('refresh')
  }
}

const editHandler = () => {
  emits('movie:edit', props.movie)
}
</script>

<style scoped></style>
