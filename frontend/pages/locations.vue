<script setup lang="ts">
import CountryFlag from 'vue-country-flag-next'
import { ref as firebaseRef, onValue } from 'firebase/database'
import { watch } from 'vue'

const route = useRoute()

const capitalize = (inputStr: string) => inputStr[0].toUpperCase() + inputStr.slice(1)

const species = capitalize(route.query["species"] as string)

const query = `*[_type == "locations" && count(*[_type == "subspecies" && references(^._id, subspecies[]._ref) && species->name == "${species}"]) > 0] {
  name,
  country,
  description,
  "banner": banner.asset->url,
  "subspecies": *[_type == "subspecies" && references(^._id, subspecies[]._ref) && species->name == "${species}"] {
    name,
    "imageUrl": images[0].asset->url
  }
}`

const { data } = await useSanityQuery(query)
const locations = data.value

const activeIndex = ref<number>(0)
const prevIndex = ref<number>(0)

const allFlags = ref([])
const flag = ref([])
const flags = ref([])

watch(allFlags, (newValue, _) => {
  if (!allFlags.value) {
    return
  }

  flags.value = newValue
  const allCountries = locations.map(location => location.country)
  flags.value = allCountries.map(country => allFlags.value.find(flag => flag.country === country)).filter(flag => flag)
})

onMounted(async () => {
  const { $firebaseDb, $getFlags } = useNuxtApp()
  const flagsRef = firebaseRef($firebaseDb, 'flags')
  
  allFlags.value = await $getFlags(allFlags)
})
</script>

<template>
  <div>
    <Header />
    <div class="min-h-screen">
      <div class="banner">
        <div class="constant-background">
          <NuxtImg
            :src="locations[prevIndex].banner"
            :alt="locations[prevIndex].name"
            class="-z-10"
          />
        </div>
        <NuxtImg
          ref="locationsImg"
          :src="locations[activeIndex].banner"
          :alt="locations[prevIndex].name"
          class="d-full absolute locations-img hidden"
        />
        <section class="absolute top-1/10 md:top-1/5 col-h max-w-4/5 ml-1/10 mb-10">
          <h2 class="text-4xl semibold pb-5 pl-2 md:pl-0 mb-10">
            Locations where you can find {{ species.toLowerCase() }}
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
            <div v-for="(location, index) in locations" :key="index" class="w-[22rem] relative">
              <div class="overlay-container rounded-lg relative h-[10rem] w-[22rem] pointer z-0">
                <div class="relative h-[10rem] w-[22rem]">
                  <NuxtImg layout="fill" :src="location.banner" class="d-full" />
                </div>
                <div class="overlay">
                  <div class="overlay-description p-0 py-4">
                    <div class="overlay-content py-4">
                      <p class="-mx-10">
                        {{ location.description.slice(0, 160) }} ...
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  v-for="(subspecies, subspeciesIndex) in location.subspecies"
                  :key="subspeciesIndex"
                  class="row absolute bottom-0"
                >
                  <NuxtImg layout="fill" :src="subspecies.imageUrl" class="h-12 w-20 mx-0" :title="subspecies.name" />
                </div>
              </div>
              <div class="row gap-3 max-w-9/10 mx-auto">
                <div class="mx-0 max-w-[22rem] mt-5 hover:text-primary text-xl">
                  {{ location.name }}
                </div>
                   <country-flag v-if="flags.length" :country="flags[index].alpha" size="medium" :title="flag.country" class="country-flag" />
                </div>
            </div>
          </div>
          <footer class="row">
            <Footer class="absolute bottom-0 row z-40 locations-footer" />
          </footer>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.banner {
  min-height: calc(130vh + 50px);

}
.overlay-container {
    position: relative;
    overflow: hidden;
}

.overlay {
    position: absolute;
    bottom: 100%;
    left: 0;
    right: 0;
    text-align: left;
    width: 100%;
    transition: 0.3s ease-out;
    backdrop-filter: blur(0.25rem) brightness(1.2);
    -webkit-backdrop-filter: blur(0.25rem) brightness(1.2);
    text-shadow: 0 0 5px rgba(0,0,0,0.5);
    color: white;
    font-size: 1rem;
    font-style: italic;
    overflow: hidden;
    width: 100%;
    height: 0;
    transition: .5s ease;
}

.overlay-container:hover .overlay {
    height: 100%;
    bottom: 0;
}

.overlay-content {
    color: white;
    font-size: 12px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    padding: 4px;
}

.locations-footer {
  position: absolute;
  top: 98vh;
  margin-left: 5vw;
  bottom: auto;
}

.country-flag {
  margin-top: 0.75rem !important;
}
</style>
