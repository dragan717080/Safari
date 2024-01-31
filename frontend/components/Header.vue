<script setup lang='ts'>
import { signOut } from 'firebase/auth'
import { useAuthStore } from '~/store'
import { type AuthUser } from '~/interfaces/User'

const { user, signOutUser } = useAuthStore()

const currentUser = ref(user || {} as AuthUser)
const currentUserExists = ref(JSON.stringify(currentUser.value) !== '{}')

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
        <div class="ml-auto">
          <ClientOnly>
            <div v-if="currentUserExists">
              <div class="row-v">
                {{ currentUser.displayName }}
                <div class="hover:text-primary ml-10" @click="userSignOut">
                  Logout
                </div>
              </div>
            </div>
            <NuxtLink v-else to="/auth" class="hover:text-primary">
              Login
            </NuxtLink>
          </ClientOnly>
        </div>
      </div>
    </div>
  </header>
</template>
