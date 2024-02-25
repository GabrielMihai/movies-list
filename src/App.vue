<template>
  <!-- TODO rimuovere tutti gli stili inline -->
  <div class="movie-container">
    <div class="movie-container-header">
      <div style="display: flex; align-items: center; gap: 0.3rem">
        <span style="font-size: 2rem">Movie list</span>
        <img src="@/assets/images/movie.png" style="height: 30px" alt="" />
      </div>
      <label class="switch" v-if="screenWidth >= 1024">
        <input type="checkbox" class="checkbox" v-model="checked" />
        <span class="toggle-thumb">
          <i class="mdi mdi-table" style="margin-left: 0.5rem; font-size: 1.3rem; color: white" />
          <i
            class="mdi mdi-cards-variant"
            style="margin-right: 0.5rem; font-size: 1.3rem; color: white"
          />
        </span>
      </label>

      <mv-button icon="plus" v-if="screenWidth < 1024 && !checked" @click="openDialog" />
    </div>
    <div class="movie-container-body">
      <mv-table
        v-if="checked"
        :movies="movies"
        @dialog:show="openDialog"
        @movie:edit="editMovieHandler"
        @refresh="getAllMovies"
      />
      <div v-else class="movie-card-container">
        <mv-card
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
          @refresh="getAllMovies"
          @movie:edit="editMovieHandler"
        />
      </div>
      <mv-button
        icon="plus"
        v-if="screenWidth >= 1024 && !checked"
        class="movie-add-button-card-case"
        @click="openDialog"
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
import MvCard from './components/MvCard.vue'
import MvButton from './components/MvButton.vue'

onMounted(() => {
  getAllMovies()
})

const screenWidth = computed(() => screen.width)
const checked = ref(false)

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
  selectedMovie.value = null
  getAllMovies()
}

const selectedMovie = ref(null as Movie | null)
const editMovieHandler = (movie: Movie) => {
  selectedMovie.value = movie
  openDialog()
}
</script>

<style lang="scss"></style>
