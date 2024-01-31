<script setup lang="ts">
import '~/assets/css/carousel.css'

const query = `*[_type == 'species'][] { 
  _id, 
  name, 
  'imageUrl': images[0].asset->url,
  description
}`
const { data } = await useSanityQuery(query)
const species = data.value

const prevIndex = ref(0)
const activeIndex = ref(0)

const hideSliderItems = (activeIndex: number) => {
/*   for (let i = species.length; i--;) {
    if (sliderItemElements[i].getElementsByTagName('img')[0].getAttribute('alt') === species[activeIndex].name) {
      sliderItemElements[i].style.zIndex = 2
    } else {
      sliderItemElements[i].style.zIndex = 1
    }
  } */
}

const range = (start: number, stop: number, step = 1) =>
  Array.from({ length: Math.ceil((stop - start) / step) }, (_, i) => start + i * step)

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const setPrevIndex = async (activeIndex) => {
  await wait(400)
  prevIndex.value = activeIndex
}

const incrementActiveIndex = () => {
  activeIndex.value = activeIndex.value === species.length - 1
    ? 0
    : activeIndex.value + 1
  hideSliderItems(activeIndex.value)
  setPrevIndex(activeIndex.value)
}

const decrementActiveIndex = async () => {
  activeIndex.value = activeIndex.value === 0
    ? species.length - 1
    : activeIndex.value - 1
  hideSliderItems(activeIndex.value)
  setPrevIndex(activeIndex.value)
  console.log(thumbnailIndexes.value)
  console.log(activeIndex.value)

  // thumbnailIndexes.value = []
  console.log([thumbnailIndexes.value.slice(-1)[0], ...thumbnailIndexes.value.slice(0, thumbnailIndexes.value.length - 1)])
  thumbnailIndexes.value = [thumbnailIndexes.value.slice(-1)[0], ...thumbnailIndexes.value.slice(0, thumbnailIndexes.value.length - 1)]

  await wait(10)

  console.log('original src: ', thumbnailElement.value.getElementsByClassName('item')[0].getElementsByTagName('img')[0].getAttribute('alt'))
  console.log('current src: ', thumbnailElement.value.getElementsByClassName('item')[0].getElementsByTagName('img')[0].getAttribute('alt'))
  thumbnailElement.value.getElementsByClassName('item')[0].getElementsByTagName('img')[0]
    .setAttribute('src', species[thumbnailIndexes.value[0]].imageUrl)
}

watchEffect(() => {
  console.log('activeIndex changed:', activeIndex.value)
})

const thumbnailIndexes = ref([...Object.keys(species).slice(1, species.length).map(index => parseInt(index)), 0])
console.log(thumbnailIndexes.value)
console.log(thumbnailIndexes.value.map(i => species[i].name))

const nextElement = ref<HTMLButtonElement>(null!)
const prevElement = ref<HTMLButtonElement>(null!)
const carouselElement = ref<HTMLDivElement>(null!)
const sliderElement = ref<HTMLDivElement>(null!)
const thumbnailElement = ref<HTMLDivElement>(null!)

let sliderItemElements: HTMLDivElement[]
let thumbnailItemElements: HTMLDivElement[]

const timeRunning = 3000
const timeAutoNext = 8717000

const showSlider = (type: 'next' | 'prev') => {
  if (type === 'next') {
    incrementActiveIndex()
    sliderElement.value.appendChild(sliderItemElements[0])
    thumbnailElement.value.appendChild(thumbnailItemElements[0])
    // Update references to the elements for the next iteration
    sliderItemElements = Array.from(sliderElement.value.getElementsByClassName('item')) as HTMLDivElement[]
    thumbnailItemElements = Array.from(thumbnailElement.value.getElementsByClassName('item')) as HTMLDivElement[]
    // thumbnailElement.value.appendChild(thumbnailItemElements[0])
    carouselElement.value.classList.add('next')
    thumbnailItemElements[0].classList.remove('prev')
  } else {
    decrementActiveIndex()
    sliderElement.value.prepend(sliderItemElements[sliderItemElements.length - 1])
    // thumbnailElement.value.prepend(thumbnailItemElements[thumbnailItemElements.length - 1])
    // Update references to the elements for the next iteration
    sliderItemElements = Array.from(sliderElement.value.getElementsByClassName('item')) as HTMLDivElement[]
    thumbnailItemElements = Array.from(thumbnailElement.value.getElementsByClassName('item')) as HTMLDivElement[]
    carouselElement.value.classList.add('prev')
    // Controlling styles
    thumbnailItemElements[0].classList.add('prev')
  }

  clearTimeout(runTimeOut)
  runTimeOut = setTimeout(() => {
    carouselElement.value?.classList.remove('next')
    carouselElement.value?.classList.remove('prev')
  }, timeRunning)

  clearTimeout(runNextAuto)
  runNextAuto = setTimeout(() => {
    nextElement.value?.click()
  }, timeAutoNext)
}

let runTimeOut: ReturnType<typeof setTimeout>
let runNextAuto: ReturnType<typeof setTimeout> = setTimeout(() => {
  nextElement.value?.click()
}, timeAutoNext)

onMounted(() => {
  sliderItemElements = Array.from(sliderElement.value!.getElementsByClassName('item')) as HTMLDivElement[]
  thumbnailItemElements = Array.from(thumbnailElement.value!.getElementsByClassName('item')) as HTMLDivElement[]
  // thumbnailElement.value.appendChild(thumbnailItemElements[0])

  nextElement.value!.addEventListener('click', () => {
    showSlider('next')
  })

  prevElement.value!.addEventListener('click', () => {
    showSlider('prev')
  })

  hideSliderItems(0)
})
</script>

<template>
  <div>
    <Header />
    <div ref="carouselElement" class="carousel">
      <!-- list item -->
      <div ref="sliderElement" class="list">
        <div class="constant-background">
          <NuxtImg
            :src="species[prevIndex].imageUrl"
            :alt="species[prevIndex].name"
            class="-z-10"
          />
        </div>
        <div class="item">
          <SliderImage :species="species[activeIndex]" :name="species[activeIndex].name" />
        </div>
      </div>
      <!-- list thumbnail -->
      <div ref="thumbnailElement" class="thumbnail">
        <div v-for="index in thumbnailIndexes" :key="index" class="item">
          <NuxtImg :src="species[index].imageUrl" :alt="species[index].name" />
          <div class="content">
            <div class="title">
              {{ species[index].name }}
            </div>
          </div>
        </div>
      </div>
      <!-- next prev -->
      <div class="arrows">
        <button id="prev" ref="prevElement">
          &lt;
        </button>
        <button id="next" ref="nextElement">
          &gt;
        </button>
      </div>
      <!-- time running -->
      <div class="time" />
    </div>
    <div class="row">
      <Footer class="absolute bottom-[-12rem] row z-40" />
    </div>
  </div>
</template>
