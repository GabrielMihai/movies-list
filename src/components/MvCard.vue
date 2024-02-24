<template>
  <div class="movie-card" @touchstart="tapped = !tapped">
    <div class="movie-card-img">
      <img :src="movie.poster" :alt="movie.fileName" />
    </div>
    <div class="movie-card-details">
      <div
        v-for="(computedMovie, computedMovieIndex) in computedMovies"
        :key="computedMovieIndex"
        :class="screenWidth < 768 ? (tapped ? 'movie-card-detail' : 'd-none') : 'movie-card-detail'"
      >
        <span class="movie-card-detail-key">{{ computedMovie.key }}</span>
        <span class="movie-card-detail-value">{{ computedMovie.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Movie } from '@/types/Movie'
import { computed, ref } from 'vue'

interface MovieDetails {
  key: string
  value: string
}

const props = defineProps<{
  movie: Movie
}>()

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
</script>

<style scoped></style>
