<template>
  <div :class="show ? 'dialog' : 'd-none'">
    <div class="banner-dialog-container">
      <div class="banner-dialog-header error-dialog-header">
        <span>{{ props.errorName }}</span>
        <mv-icon icon="close" @click="closeDialog" />
      </div>
      <div class="banner-dialog-body">
        <span v-html="errorMessage" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MvIcon from './MvIcon.vue'
const show = defineModel({ default: false })

const props = defineProps<{
  errorName: string
}>()

const emits = defineEmits(['error:close'])

const errorMessage = computed(() =>
  props.errorName === 'QuotaExceededError'
    ? 'Browser memory is full.<br>Try using a lower quality image.'
    : 'Generic error.'
)

const closeDialog = () => {
  show.value = false
  emits('error:close')
}
</script>

<style scoped></style>
