<script setup lang='ts'>
const getLink = (pageName: string) =>
  pageName.toLowerCase() === 'home' ? '/' : pageName.toLowerCase()
</script>

<template>
  <nav class="hidden md:flex h-30 px-14 md:pr-2 lg:px-14 md:space-x-7 lg:space-x-10 2xl:space-x-12">
    <div v-for="(item, index) in ['Home', 'Contacts', 'Info']" :key="index">
      <div class="group row-v space-x-0.5 hover:text-primary">
        <h2 v-if="item === 'Home'" class="">
          <a :href="getLink(item)">{{ item }}</a>
        </h2>
        <h2 v-else class="">
          <span>{{ item }}</span>
        </h2>
      </div>
    </div>
  </nav>
</template>
