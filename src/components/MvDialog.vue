<template>
  <div :class="show ? 'dialog' : 'd-none'">
    <div class="dialog-container">
      <div class="dialog-header"><mv-button icon="close" @click="closeDialog" /></div>
      <div class="dialog-body">
        <input
          v-model="movieState.title"
          type="text"
          name=""
          id=""
          class="text-input"
          placeholder="Title"
        />
        <input
          v-model="movieState.summary"
          type="text"
          name=""
          id=""
          class="text-input"
          placeholder="Summary"
        />
        <input
          v-model="movieState.director"
          type="text"
          name=""
          id=""
          class="text-input"
          placeholder="Director"
        />
        <input
          v-model.number="movieState.releaseYear"
          type="text"
          name=""
          id=""
          class="text-input"
          placeholder="Release year"
        />
        <label for="file-input" class="file-input-label">
          Select a file...
          <mv-icon icon="file-outline" class="file-icon" />
        </label>
        <input type="file" name="file-input" id="file-input" class="file-input" />
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
import { ref, watch } from 'vue'
import type { Movie } from '@/types/Movie'
import MvButton from './MvButton.vue'
import MvIcon from './MvIcon.vue'
import MovieService from '@/service/MovieService'

const show = defineModel({ default: false })
watch(
  () => show.value,
  () => {
    if (show.value && props.movie) {
      console.log('showing dialog')
      movieState.value = {
        id: props.movie ? props.movie.id : undefined,
        title: props.movie ? props.movie.title : undefined,
        summary: props.movie ? props.movie.summary : undefined,
        director: props.movie ? props.movie.director : undefined,
        releaseYear: props.movie ? props.movie.releaseYear : undefined,
        poster: props.movie ? props.movie.poster : undefined
      }
    }
  }
)

const props = defineProps<{
  movie?: Movie | null
}>()

const emits = defineEmits(['dialog:close'])

const movieState = ref({
  id: undefined,
  title: undefined,
  summary: undefined,
  director: undefined,
  releaseYear: undefined,
  poster: undefined
} as Movie)

const saveHandler = () => {
  MovieService.update(movieState.value)
  closeDialog()
}

const createHandler = () => {
  MovieService.create(movieState.value)
  closeDialog()
}

const closeDialog = () => {
  emits('dialog:close')
}
</script>

<style scoped></style>
