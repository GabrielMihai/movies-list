<template>
  <div :class="show ? 'dialog' : 'd-none'">
    <div class="banner-dialog-container">
      <div class="banner-dialog-header warning-dialog-header">
        <span>Delete movie</span>
        <mv-icon icon="close" @click="closeDialog" class="cursor-pointer" />
      </div>
      <div class="banner-dialog-body">
        <span
          >Are you sure you want to delete the movie
          <b>{{ props.movie ? props.movie.title : undefined }}</b
          >?</span
        >
      </div>
      <div class="warning-dialog-footer">
        <mv-button icon="delete" @click="confirmHandler">CONFIRM</mv-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Movie } from '@/types/Movie'
import MvIcon from './MvIcon.vue'
import MvButton from './MvButton.vue'
import MovieService from '@/service/MovieService'

const show = defineModel({ default: false })

const props = defineProps<{
  movie: Movie
}>()

const emits = defineEmits(['close'])

const closeDialog = () => {
  show.value = false
  emits('close')
}

const confirmHandler = () => {
  MovieService.delete(props.movie.id!)
  closeDialog()
}
</script>

<style scoped></style>
