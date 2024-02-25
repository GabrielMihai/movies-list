<template>
  <div class="movie-card">
    <div class="movie-card-img" @click="tapped = !tapped">
      <img v-if="props.movie.poster" :src="props.movie.poster" :alt="props.movie.fileName" />
      <img v-else src="@/assets/images/noImage.jpg" alt="No image found" />
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
    <div class="movie-card-mobile-tap-info" :class="{ 'd-none': tapped }">
      <span>Tap image for details</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Movie } from '@/types/Movie'
import { computed, ref } from 'vue'
import MvButton from './MvButton.vue'

interface MovieDetails {
  key: string
  value: string
}

const props = defineProps<{
  movie: Movie
}>()

const emits = defineEmits(['movie:edit', 'movie:delete'])

const screenWidth = computed(() => screen.width)
const tapped = ref(false)

const computedMovies = computed(() => {
  let movieDetails: MovieDetails[] = []

  for (const [key, value] of Object.entries(props.movie)) {
    if (key !== 'fileName' && key !== 'poster' && key !== 'id') {
      movieDetails.push({
        key: key === 'releaseYear' ? 'Release year' : key.charAt(0).toUpperCase() + key.slice(1),
        value: value.toString()
      })
    }
  }
  return movieDetails
})

const deleteHandler = () => {
  emits('movie:delete', props.movie)
}

const editHandler = () => {
  emits('movie:edit', props.movie)
}
</script>

<style scoped></style>
