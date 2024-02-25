<template>
  <div :class="show ? 'dialog' : 'd-none'">
    <div class="dialog-container">
      <div class="dialog-header"><mv-button icon="close" @click="closeDialog" /></div>
      <div class="dialog-body">
        <input v-model="movieState.title" type="text" class="text-input" placeholder="Title" />
        <textarea
          v-model="movieState.summary"
          type="text"
          class="text-input textarea"
          placeholder="Summary"
        />
        <input v-model="movieState.director" class="text-input" placeholder="Director" />
        <input
          v-model.number="movieState.releaseYear"
          type="number"
          class="text-input"
          placeholder="Release year"
        />
        <label for="file-input" class="file-input-label">
          {{
            movieState.fileName
              ? movieState.fileName.length > 20
                ? movieState.fileName.slice(0, 20)
                : movieState.fileName
              : 'Select a file...'
          }}
          <mv-icon icon="file-outline" class="file-icon" />
        </label>
        <input
          type="file"
          name="file-input"
          id="file-input"
          class="file-input"
          @change="handlePosterInput"
        />
      </div>
      <div class="dialog-footer">
        <mv-button
          :icon="props.movie ? 'floppy' : 'plus'"
          @click="props.movie ? saveHandler() : createHandler()"
        >
          {{ props.movie ? 'SAVE' : 'CREATE' }}
        </mv-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MovieService from '@/service/MovieService'
import type { Movie } from '@/types/Movie'
import { ref, watch } from 'vue'
import MvButton from './MvButton.vue'
import MvIcon from './MvIcon.vue'

const show = defineModel({ default: false })
watch(
  () => show.value,
  () => {
    if (show.value && props.movie) {
      movieState.value = {
        id: props.movie ? props.movie.id : undefined,
        title: props.movie ? props.movie.title : undefined,
        summary: props.movie ? props.movie.summary : undefined,
        director: props.movie ? props.movie.director : undefined,
        releaseYear: props.movie ? props.movie.releaseYear : undefined,
        poster: props.movie ? props.movie.poster : undefined,
        fileName: props.movie ? props.movie.fileName : undefined
      }
    }
  }
)

const props = defineProps<{
  movie?: Movie | null
}>()

const showSpan = ref(false)

const emits = defineEmits(['dialog:close'])

const movieState = ref({
  id: undefined,
  title: undefined,
  summary: undefined,
  director: undefined,
  releaseYear: undefined,
  poster: undefined
} as Movie)

const handlePosterInput = (event: any) => {
  let file = event.target.files[0]
  movieState.value.fileName = file.name
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    alert((file.name + ' ' + reader.result) as string)
    movieState.value.poster = reader.result as string
  }
}

const saveHandler = () => {
  MovieService.update(movieState.value)
  closeDialog()
}

const createHandler = () => {
  try {
    MovieService.create(movieState.value)
    closeDialog()
  } catch (e: any) {
    alert(e.name + ' ' + e.message + ' ' + e.stack)
  }
}

const closeDialog = () => {
  show.value = false
  showSpan.value = false

  movieState.value = {
    id: undefined,
    title: undefined,
    summary: undefined,
    director: undefined,
    releaseYear: undefined,
    fileName: undefined,
    poster: undefined
  }
  emits('dialog:close')
}
</script>

<style scoped></style>
