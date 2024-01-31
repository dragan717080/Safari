<template lang="">
  <div class="">
    <Header />
    <div v-if="species" class="min-h-screen">
      <div class="banner">
        <NuxtImg :src="species.banner" :alt="name" class="d-full absolute" />
        <div class="absolute top-1/2 left-1/2 row">
          <ul
            ref="subspeciesListRef"
            class="mask-holder glow-list"
            @mouseover="handleSubspeciesMouseOver"
            @mouseout="handleSubspeciesMouseOut"
          >
            <li v-for="(item, index) in subspecies" :key="index" @click="setActiveIndex(index)">
              {{ item.name }}
            </li>
          </ul>
          <div class="content">
            1
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <Footer class="absolute bottom-[-0.75rem] row z-40" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
let name = (route.params.name as string)
name = name.charAt(0).toUpperCase() + name.slice(1)
const query = `*[_type == 'species' && name == '${name}'][0] { 
  _id, 
  name, 
  'imageUrl': images[0].asset->url,
  description,
  'banner': banner.asset->url
}`

console.log(query)

const { data } = await useSanityQuery(query)
const species = data.value
console.log(species.name)
console.log(species.banner)

const subspeciesQuery = `*[_type == 'subspecies' && species->name == '${name}'] { 
  _id, 
  name, 
  'imageUrl': images[0].asset->url,
  description
}`

const activeIndex: ref<number> = ref(0)

watchEffect(() => {
  console.log('new active index', activeIndex.value)
})

const setActiveIndex = (index: number) => {
  activeIndex.value = index
}

const subspeciesData = await useSanityQuery(subspeciesQuery)
const subspecies = subspeciesData.data.value
console.log(subspecies)

const subspeciesListRef = ref<HTMLUListElement | null>(null)

const handleSubspeciesMouseOver = () => {
  Array.from(subspeciesListRef.value!.getElementsByTagName('li')).forEach((subspeciesItem: HTMLLIElement) => {
    subspeciesItem.style.backgroundColor = 'inherit'
  })
}

const handleSubspeciesMouseOut = () => {
  console.log(subspeciesListRef.value)
  Array.from(subspeciesListRef.value!.getElementsByTagName('li')).forEach((subspeciesItem: HTMLLIElement, index: number) => {
    subspeciesItem.style.backgroundColor = index === activeIndex.value ? '#f75239' : 'inherit'
  })
}

onMounted(() => {
  subspeciesListRef.value!.getElementsByTagName('li')[activeIndex.value].style.backgroundColor = '#f75239'
})
</script>

<style scoped>
  .banner {
    min-height: calc(100vh + 50px);
    margin-top: -50px;
    width: 100vw;
    overflow: hidden;
    position: relative;
  }

  .mask-holder {
    text-align: left;
    width: 100%;
    transition: 0.3s ease-out;
    backdrop-filter: blur(0.25rem) brightness(1.2);
    -webkit-backdrop-filter: blur(0.25rem) brightness(1.2);
    text-shadow: 0 0 5px rgba(0,0,0,0.5);
    color: white;
    font-size: 1rem;
  }

  .mask-holder li {
    padding: 0.75rem 2.1875rem;
  }
</style>
