<script setup lang='ts'>
import { signOut } from 'firebase/auth'
import { useAuthStore } from '~/store'
import { type AuthUser } from '~/interfaces/User'

const { user, signOutUser } = useAuthStore()

const currentUser = ref(user || {} as AuthUser)
const currentUserExists = ref(JSON.stringify(currentUser.value) !== '{}')

const isHeaderBurgerMenuOpen = ref(false)

const toggleIsHeaderBurgerMenuOpen = () => {
  isHeaderBurgerMenuOpen.value = !isHeaderBurgerMenuOpen.value
}

watchEffect(() => {
  currentUserExists.value = JSON.stringify(currentUser.value) !== '{}'
})
const userSignOut = async () => {
  const { $firebaseAuth } = useNuxtApp()
  await signOut($firebaseAuth)
  signOutUser()
  currentUser.value = {} as AuthUser
}
</script>

<template>
  <header class="relative top-0 z-40 py-3 text-gray-200">
    <div class="absolute row-v pointer w-4/5 left-[10%]">
      <div class="row w-full">
        <img src="~/assets/images/logo.webp" alt="logo" class="h-10 w-10">
        <NuxtLink to="/">
          <h1 className="text-xl md:text-2xl bold -mt-1.5 ml-2.5 pt-0.5">
            Dragan<span className="t-primary hidden md:contents">Websites</span>
          </h1>
        </NuxtLink>
        <Navbar />
        <div class="ml-auto flex gap-7">
          <ClientOnly>
            <div v-if="currentUserExists" class="mt-0.75 md:mt-0">
              <div class="row-v">
                {{ currentUser.displayName }}
                <div class="hover:text-primary ml-10" @click="userSignOut">
                  Logout
                </div>
              </div>
            </div>
            <NuxtLink v-else to="/auth" class="hover:text-primary mt-0.75 md:mt-0">
              Login
            </NuxtLink>
          </ClientOnly>
          <div
            class="block md:hidden text-xl ml-auto xs:mr-6 relative"
            :click="toggleIsHeaderBurgerMenuOpen"
          >
            <span>{{ !isHeaderBurgerMenuOpen ? '☰' : 'X' }}</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
