<template>
  <i class="mdi" :class="`mdi-${props.icon}`" />
</template>

<script setup lang="ts">
const props = defineProps<{
  icon: string
}>()
</script>

<style scoped></style>
