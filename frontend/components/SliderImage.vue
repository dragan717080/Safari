<template lang="">
  <div class="item">
    <NuxtImg
      :src="species.imageUrl"
      :alt="species.name"
    />
    <div class="content">
      <div class="author">
        DRAGAN
      </div>
      <div class="title">
        DESIGN SLIDER
      </div>
      <div class="topic">
        {{ species.name }}
      </div>
      <div class="des">
        {{ species.description }}
      </div>
      <div class="buttons">
        <button class="text-primary">
          <NuxtLink :to="`species/${getName()}`">
            SEE MORE
          </NuxtLink>
        </button>
        <button>SUBSCRIBE</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const getName = () => props.name.toLowerCase()

const props = defineProps({
  species: {
    type: Object,
    default: () => ({})
  },
  name: {
    type: String,
    default: 'Default Species'
  }
})
</script>
