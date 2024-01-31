<template>
  <main class="text-center col-h min-h-screen">
    <div class="flex-1">
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

<script setup lang="ts">
import '~/assets/css/tailwind.css'
</script>
