<script setup lang="ts">
import '~/assets/css/tailwind.css'
</script>

<template>
  <main class="col-h min-h-screen">
    <div class="flex-1 min-w-screen">
      <div class="px-10 text-center">
        <Suspense>
          <template #fallback>
            <div class="opacity-50 italic">
              <span class="pulse">Loading...</span>
            </div>
          </template>
        </Suspense>
        <slot />
      </div>
    </div>
  </main>
</template>
