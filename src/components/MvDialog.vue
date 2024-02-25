<template>
  <div :class="show ? 'dialog' : 'd-none'">
    <div class="dialog-container">
      <div class="dialog-header">
        <span>{{ props.movie ? 'Edit movie' : 'New movie' }}</span>
        <mv-button icon="close" @click="closeDialog" />
      </div>
      <div class="dialog-body">
        <div class="input-container">
          <input
            v-model="movieState.title"
            type="text"
            class="text-input"
            :class="{ 'error-input': !validationState.title }"
            placeholder="Title"
            required
            maxlength="50"
          />
          <div class="error-message-container" v-if="!validationState.title">
            <span> Mandatory field </span>
            <i class="mdi mdi-exclamation-thick" style="font-size: 1.3rem"></i>
          </div>
        </div>
        <div class="input-container">
          <textarea
            v-model="movieState.summary"
            type="text"
            :class="{ 'error-input': !validationState.summary }"
            class="text-input textarea"
            placeholder="Summary"
            required
            maxlength="500"
          />
          <div class="error-message-container-no-transform" v-if="!validationState.summary">
            <span> Mandatory field </span>
            <i class="mdi mdi-exclamation-thick" style="font-size: 1.3rem"></i>
          </div>
        </div>
        <div class="input-container">
          <input
            v-model="movieState.director"
            class="text-input"
            :class="{ 'error-input': !validationState.director }"
            placeholder="Director"
            required
            maxlength="20"
          />
          <div class="error-message-container" v-if="!validationState.director">
            <span> Mandatory field </span>
            <i class="mdi mdi-exclamation-thick" style="font-size: 1.3rem"></i>
          </div>
        </div>
        <div class="input-container">
          <input
            v-model.number="movieState.releaseYear"
            type="number"
            class="text-input"
            :class="{ 'error-input': !validationState.releaseYear }"
            placeholder="Release year"
            min="1900"
            :max="currentYear"
            required
          />
          <div class="error-message-container" v-if="!validationState.releaseYear">
            <span
              :class="{ 'font-small': movieState.releaseYear }"
              v-html="
                !movieState.releaseYear
                  ? 'Mandatory field'
                  : 'Invalid year<br>Must be between 1900 and ' + currentYear
              "
            >
            </span>
            <i class="mdi mdi-exclamation-thick" style="font-size: 1.3rem"></i>
          </div>
        </div>
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
        <mv-button :icon="props.movie ? 'floppy' : 'plus'" @click="validateForm">
          {{ props.movie ? 'SAVE' : 'CREATE' }}
        </mv-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MovieService from '@/service/MovieService'
import type { Movie } from '@/types/Movie'
import { computed, ref, watch } from 'vue'
import MvButton from './MvButton.vue'
import MvIcon from './MvIcon.vue'

const currentYear = new Date().getFullYear() + 10

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

const emits = defineEmits(['dialog:close', 'create:error'])

const movieState = ref({
  id: undefined,
  title: undefined,
  summary: undefined,
  director: undefined,
  releaseYear: undefined,
  poster: undefined
} as Movie)

const buttonHasBeenClickedOnce = ref(false)

const validationState = computed(() => {
  return {
    title: buttonHasBeenClickedOnce.value
      ? movieState.value?.title && movieState.value.title.length > 0
        ? true
        : false
      : true,
    summary: buttonHasBeenClickedOnce.value
      ? movieState.value?.summary && movieState.value.summary.length > 0
        ? true
        : false
      : true,
    director: buttonHasBeenClickedOnce.value
      ? movieState.value?.director && movieState.value.director.length > 0
        ? true
        : false
      : true,
    releaseYear: buttonHasBeenClickedOnce.value
      ? movieState.value?.releaseYear &&
        movieState.value.releaseYear >= 1900 &&
        movieState.value.releaseYear <= currentYear
        ? true
        : false
      : true
  }
})

const handlePosterInput = (event: any) => {
  let file = event.target.files[0]
  movieState.value.fileName = file.name
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    movieState.value.poster = reader.result as string
  }
}

const saveHandler = () => {
  try {
    MovieService.update(movieState.value)
    closeDialog()
  } catch (e: any) {
    emits('create:error', e.name)
  }
}

const createHandler = () => {
  try {
    MovieService.create(movieState.value)
    closeDialog()
  } catch (e: any) {
    emits('create:error', e.name)
  }
}

const validateForm = () => {
  buttonHasBeenClickedOnce.value = true
  if (
    validationState.value.title &&
    validationState.value.summary &&
    validationState.value.director &&
    validationState.value.releaseYear
  ) {
    if (props.movie) {
      saveHandler()
    } else {
      createHandler()
    }
  }
}

const closeDialog = () => {
  show.value = false
  showSpan.value = false
  buttonHasBeenClickedOnce.value = false

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
