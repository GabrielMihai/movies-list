<template>
  <div class="movie-container">
    <div class="movie-container-header">
      <div style="display: flex; align-items: center; gap: 0.3rem">
        <h1>Movie list</h1>
        <img src="@/assets/images/movie.png" style="height: 30px" alt="" />
      </div>
      <h3 v-if="screenWidth > 1024">Switch</h3>
    </div>
    <div class="movie-container-body">
      <mv-table
        :movies="movies"
        @dialog:show="openDialog"
        @movie:edit="editMovieHandler"
        @refresh="getAllMovies"
      />
    </div>
    <mv-dialog v-model="showDialog" @dialog:close="closeDialogHandler" :movie="selectedMovie" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { Movie } from '@/types/Movie'
import MovieService from '@/service/MovieService'
import MvTable from '@/components/MvTable.vue'
import MvDialog from './components/MvDialog.vue'

const screenWidth = computed(() => screen.width)

onMounted(() => {
  getAllMovies()
})

const movies = ref<Movie[]>([])
const getAllMovies = () => {
  movies.value = MovieService.getAll()
}

const showDialog = ref(false)

const openDialog = () => {
  showDialog.value = true
}

const closeDialogHandler = () => {
  showDialog.value = false
  getAllMovies()
}

const selectedMovie = ref(null as Movie | null)
const editMovieHandler = (movie: Movie) => {
  selectedMovie.value = movie
  openDialog()
}
</script>

<style lang="scss"></style>
