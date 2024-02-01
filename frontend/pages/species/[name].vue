<template lang="">
  <div class="">
    <Header />
    <div v-if="species" class="min-h-screen">
      <div class="banner">
        <div class="constant-background">
          <NuxtImg
            :src="allSubspecies[prevIndex].imageUrl"
            :alt="allSubspecies[prevIndex].name"
            class="-z-10"
          />
        </div>
        <NuxtImg
          ref="speciesImg"
          :src="allSubspecies[activeIndex].imageUrl"
          :alt="name"
          class="d-full absolute species-img hidden"
        />
        <div class="absolute top-1/5 left-0 md:left-1/4 md:m-inline-auto col-h md:flex-row gap-12">
          <ul
            ref="subspeciesListRef"
            class="mask-holder glow-list"
            @mouseover="handleSubspeciesMouseOver"
            @mouseout="handleSubspeciesMouseOut"
          >
            <li v-for="(subspecies, index) in allSubspecies" :key="index" class="pointer md:min-w-60" @click="setActiveIndex(index)">
              {{ subspecies.name }}
            </li>
          </ul>
          <div class="content">
            <div
              :key="activeIndex"
              class="home-title"
              :class="{ 'animate': titleAnimationStates[activeIndex] }"
            >
              {{ allSubspecies[activeIndex].name }}
            </div>
            <div class="row gap-6 my-5">
              <country-flag v-for="(flag, index) in flags" :key="index" :country="flag.alpha" size="big" :title="flag.country" />
            </div>
            <div
              :key="activeIndex"
              class="description mask-holder max-w-7/10 ml-auto mr-auto"
              :class="{ 'animate': titleAnimationStates[activeIndex] }"
            >
              {{ allSubspecies[activeIndex].description }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <Footer class="absolute bottom-0 row z-40" />
    </div>
  </div>
</template>
<script setup lang="ts">
import '~/assets/css/species.css'
import CountryFlag from 'vue-country-flag-next'
import { useRoute } from 'vue-router'
import { ref as firebaseRef, onValue } from 'firebase/database'
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
  description,
  countries
}`

const activeIndex = ref<number>(0)
const prevIndex = ref<number>(0)

const allFlags = ref([])
const flags = ref([])

const subspeciesData = await useSanityQuery(subspeciesQuery)
const allSubspecies = subspeciesData.data.value
// console.log(allSubspecies)
const titleAnimationStates = ref(allSubspecies.map(() => false))

const speciesImg = ref<HTMLImageElement | null>(null)

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

interface Image extends HTMLImageElement {
  $el: HTMLImageElement
}

const getFlags = async () => {
  const { $firebaseDb } = useNuxtApp()
  const flagsRef = firebaseRef($firebaseDb, 'flags')
  console.log(flagsRef)

  onValue(flagsRef, (snapshot) => {
    if (snapshot.exists()) {
      allFlags.value = snapshot.val()

      console.log('new flags', allFlags.value)
    } else {
      console.log('No data available')
    }
  }, (error) => {
    console.error('Error getting data:', error)
  })
}

watchEffect(() => {
  console.log('new active index', activeIndex.value)
  titleAnimationStates.value = titleAnimationStates.value.map((_: unknown, index: number) => index === activeIndex.value)
  flags.value = allFlags.value.filter(flag => allSubspecies[activeIndex.value].countries.includes(flag.country))
  if (speciesImg.value) {
    const imgElement = (speciesImg.value as Image).$el

    console.log(imgElement.classList)

    imgElement.classList.contains('hide')
      ? imgElement.classList.remove('hide')
      : imgElement.classList.add('hide')
    console.log(imgElement.classList)
  }
})

const setActiveIndex = async (index: number) => {
  activeIndex.value = index
  const imgElement = (speciesImg.value as Image).$el
  await wait(600)
  if (activeIndex.value || prevIndex.value) {
    if (imgElement.classList.contains('hidden')) {
      imgElement.classList.remove('hidden')
      imgElement.classList.add('absolute')
    }
    console.log(activeIndex, prevIndex)
    if (!(imgElement.classList.contains('hide'))) { imgElement.classList.add('hide') }
  }
  prevIndex.value = index
}

const subspeciesListRef = ref<HTMLUListElement | null>(null)

const handleSubspeciesMouseOver = () => {
  Array.from(subspeciesListRef.value!.getElementsByTagName('li')).forEach((subspeciesItem: HTMLLIElement) => {
    subspeciesItem.style.backgroundColor = 'inherit'
  })
}

const handleSubspeciesMouseOut = () => {
  Array.from(subspeciesListRef.value!.getElementsByTagName('li')).forEach((subspeciesItem: HTMLLIElement, index: number) => {
    subspeciesItem.style.backgroundColor = index === activeIndex.value ? '#f75239' : 'inherit'
  })
}

onMounted(async () => {
  subspeciesListRef.value!.getElementsByTagName('li')[activeIndex.value].style.backgroundColor = '#f75239'
  await getFlags()
})
</script>

<style scoped>
  .banner {
    min-height: calc(98vh + 50px);
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

  .description {
    animation-delay: 0.7s !important;
    transform: translateY(50px);
    filter: blur(20px);
    opacity: 0;
    color: #fff;
    animation: showContent .5s 1s linear 1 forwards;
    padding: 0.75rem 1.5rem;
  }

  .species-img {
    width: 150px;
    height: 220px;
    position: absolute;
    bottom: 50px;
    left: 50%;
    border-radius: 30px;
    animation: showImage .5s linear 1 forwards;
  }

  .species-img.hide {
    animation: hideImage 0s linear 1 forwards;
  }

  @keyframes showImage {
    to {
        bottom: 0;
        left: 0;
        width: 100%;
        height: calc(98vh + 50px);
        border-radius: 0;
        object-fit: cover;
    }
  }

  @keyframes hideImage {
      to {
        height: 0;
        width: 0;
      }
  }

  @keyframes showContent {
    to {
        transform: translateY(0px);
        filter: blur(0px);
        opacity: 1;
      }
  }
</style>
