<template>
  <div class="movie-container">
    <div class="movie-container-header">
      <div class="movie-container-header-title">
        <span>Movie list</span>
        <img src="@/assets/images/movie.png" alt="Movie icon" />
      </div>
      <label class="switch">
        <input type="checkbox" class="checkbox" v-model="checked" />
        <span class="toggle-thumb">
          <i class="mdi mdi-table" />
          <i class="mdi mdi-cards-variant" />
        </span>
      </label>

      <mv-button
        icon="plus"
        v-if="!checked"
        @click="openEditDialog"
        class="movie-add-button-small-screen"
      />
    </div>
    <div class="movie-container-body">
      <mv-table
        v-if="checked"
        :movies="movies"
        @dialog:show="openEditDialog"
        @movie:delete="deleteMovieHandler"
        @movie:edit="editMovieHandler"
        @refresh="getAllMovies"
      />
      <div v-else-if="movies.length > 0" class="movie-card-container">
        <mv-card
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
          @movie:edit="editMovieHandler"
          @movie:delete="deleteMovieHandler"
        />
      </div>
      <span v-else> No movies found... </span>
      <mv-button
        icon="plus"
        v-if="screenWidth >= 1024 && !checked"
        class="movie-add-button-card-case"
        @click="openEditDialog"
      />
    </div>
    <mv-dialog
      v-model="showEditDialog"
      :movie="selectedMovie"
      @create:error="openErrorDialog"
      @dialog:close="closeEditDialogHandler"
    />
    <mv-error-dialog v-model="showErrorDialog" :error-name="errorName" />
    <mv-warning-dialog
      v-model="showDeleteDialog"
      :movie="selectedMovie!"
      @close="closeDeleteDialogHandler"
    />
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
import MvErrorDialog from './components/MvErrorDialog.vue'
import MvWarningDialog from './components/MvWarningDialog.vue'

onMounted(() => {
  getAllMovies()
})

const screenWidth = computed(() => screen.width)
const checked = ref(false)

const movies = ref<Movie[]>([])
const getAllMovies = () => {
  movies.value = MovieService.getAll()
}

const showEditDialog = ref(false)

const openEditDialog = () => {
  showEditDialog.value = true
}

const closeEditDialogHandler = () => {
  showEditDialog.value = false
  selectedMovie.value = null
  getAllMovies()
}

const selectedMovie = ref(null as Movie | null)
const editMovieHandler = (movie: Movie) => {
  selectedMovie.value = movie
  openEditDialog()
}

const showDeleteDialog = ref(false)
const openDeleteDialog = () => {
  showDeleteDialog.value = true
}

const closeDeleteDialogHandler = () => {
  showDeleteDialog.value = false
  selectedMovie.value = null
  getAllMovies()
}

const deleteMovieHandler = (movie: Movie) => {
  selectedMovie.value = movie
  openDeleteDialog()
}

const showErrorDialog = ref(false)
const errorName = ref('')
const openErrorDialog = (error: string) => {
  errorName.value = error
  showErrorDialog.value = true
}
</script>

<style lang="scss"></style>
