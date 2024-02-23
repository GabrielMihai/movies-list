<template>
  <button
    :class="isDefaultSlotEmpty ? 'button-icon' : 'button-with-text'"
    class="button cursor-pointer"
    @click="emits('click')"
  >
    <mv-icon
      v-if="props.icon"
      :icon="props.icon"
      :class="{ 'button-with-text-icon': !isDefaultSlotEmpty }"
    />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import MvIcon from './MvIcon.vue'

const slots = useSlots()

const isDefaultSlotEmpty = computed(() => slots.default === undefined)

const props = defineProps<{
  icon?: string
}>()

const emits = defineEmits(['click'])
</script>

<style scoped></style>
