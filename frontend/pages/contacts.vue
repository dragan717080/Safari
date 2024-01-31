<template lang="">
  <div>
    1
    <NuxtImg
      :src="species[0].imageUrl"
      :alt="species[0].name"
      height="100"
      width="100"
    />
  </div>
</template>
<script setup lang="ts">

const query = "*[_type == 'species'][] { _id, name, 'imageUrl': images[0].asset->url }"
const { data } = await useSanityQuery(query)
const species = data.value

</script>
<style lang="">

</style>
