<template lang="">
  <button
    type="submit"
    class="
    row-h
    rounded-md
    px-3
    py-2
    text-sm
    font-semibold
    focus-visible:outline
    focus-visible:outline-2
    focus-visible:outline-offset-2
    w-full
    bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600
    text-white
    "
  >
    {{ text }}
  </button>
</template>
<script setup lang="ts">
defineProps({
  text: {
    type: String,
    default: 'Default Text'
  }
})
</script>
