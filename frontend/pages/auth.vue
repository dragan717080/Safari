<template lang="">
  <div class="flex min-h-screen min-w-[100vw] flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        src="~/assets/images/logo.webp"
        href="./"
        class="w-40 xl:w-44 mx-auto"
        alt="Dragan Logo"
      >
      <h2 v-if="variant === 'REGISTER'" class="mt-6 text-center text-3xl semibold tracking-tight text-gray-900">
        Sign Up
      </h2>
      <h2 v-else class="mt-6 text-center text-3xl semibold tracking-tight text-gray-900">
        Login to your account
      </h2>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="validate">
          <div id="email-wrapper">
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
              <input
                id="email"
                ref="emailField"
                type="email"
                autocomplete="email"
                class="form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                name="email"
              >
            </div>
          </div>
          <div id="password-wrapper">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="mt-2">
              <input
                id="password"
                ref="passwordField"
                type="password"
                autocomplete="password"
                class="form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                name="password"
              >
            </div>
          </div>
          <div>
            <AuthButton :text="buttonText" />
          </div>
        </form>
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 col-h">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex row-h text-sm">
              <span class="bg-white px-2 text-gray-500 -mt-2.5"> Or continue with </span>
            </div>
          </div>
          <div class="mt-6 flex gap-2">
            <button
              type="button"
              class="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
              @click="signInWithGithub"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                />
              </svg>
            </button>
            <button
              type="button"
              class="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
              @click="signInWithGoogle"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div v-if="variant === 'REGISTER'">
          <div class="row-h gap-2 text-sm mt-6 px-2 text-gray-500">
            <div>Already have an account?</div>
            <div class="pointer text-sky-500" @click="toggleVariant">
              Login
            </div>
          </div>
        </div>
        <div v-else>
          <div class="row-h gap-2 text-sm mt-6 px-2 text-gray-500">
            <div>New to this website?</div>
            <div class="pointer text-sky-500" @click="toggleVariant()">
              Register
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider
} from 'firebase/auth'
import AuthButton from '~/components/base/AuthButton.vue'
import { useAuthStore } from '~/store'
import type { User, UserMetadata, AuthUser } from '~/interfaces/User'
import type AuthProps from '~/interfaces/AuthProps'

const props = defineProps({
  initialVariant: {
    type: String,
    default: 'LOGIN'
  }
})

const variant = ref(props.initialVariant)

const user$ = useUser()
const token = useCookie('token')
const { $firebaseAuth } = useNuxtApp()

const { setUser } = useAuthStore()
const buttonText = ref(variant.value === 'REGISTER' ? 'Sign Up' : 'Login')
const toggleVariant = () => {
  variant.value = variant.value === 'REGISTER' ? 'LOGIN' : 'REGISTER'
  buttonText.value = variant.value === 'REGISTER' ? 'Sign Up' : 'Login'
}

const emailField = ref<HTMLInputElement | null>(null!)
const passwordField = ref<HTMLInputElement | null>(null!)

const validateEmail = () => {
  /* eslint-disable no-control-regex */
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|\\[\x01-\x08\x0B\x0C\x0E-\x7F])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0B\x0C\x0E-\x7F\x21-\x5A\x53-\x7F]|\\[\x01-\x08\x0B\x0C\x0E-\x7F])+)\])/
  /* eslint-enable no-control-regex */

  const emailValue = emailField.value ? emailField.value.value : ''
  const emailFieldParentNode = emailField.value!.parentNode! as HTMLDivElement
  const passwordWrapper = document.getElementById('password-wrapper')

  if (emailRegex.test(emailValue)) {
    // Remove errors from previous email validation (if they exist)
    const errorNode = emailFieldParentNode.getElementsByClassName('error')
    if (errorNode.length) {
      errorNode[0].remove()
    }
    // Add default margin to password
    passwordWrapper?.classList.remove('mt-2-i')
  } else {
    const errorNode = (emailField.value!.parentNode! as HTMLDivElement).getElementsByClassName('error')
    // Prevent double error under the same node
    if (!errorNode.length) {
      (emailField.value!.parentNode! as HTMLDivElement).insertAdjacentHTML(
        'beforeend',
        '<div class="error mt-2">Please enter valid email address</div>'
      )
      // Reduce the default margin when error is present
      passwordWrapper?.classList.add('mt-2-i')
    }
  }

  return emailRegex.test(emailValue)
}

const validatePassword = () => {
  const passwordValue = passwordField.value ? passwordField.value.value : ''
  const passwordFieldParentNode = passwordField.value!.parentNode! as HTMLDivElement

  if (passwordValue.length < 8) {
    const errorNode = passwordFieldParentNode.getElementsByClassName('error')
    if (errorNode.length) {
      errorNode[0].remove()
    }
    passwordFieldParentNode.insertAdjacentHTML(
      'beforeend',
      '<div class="error mt-2">Password is too short</div>'
    )
  } else if (passwordValue.length > 20) {
    const errorNode = passwordFieldParentNode.getElementsByClassName('error')
    if (errorNode.length) {
      errorNode[0].remove()
    }
    passwordFieldParentNode.insertAdjacentHTML(
      'beforeend',
      '<div class="error mt-2">Password is too long</div>'
    )
  } else {
    // Remove errors from previous password validation (if they exist)
    const errorNode = passwordFieldParentNode.getElementsByClassName('error')
    if (errorNode.length) {
      errorNode[0].remove()
    }
  }

  return passwordValue.length >= 8 && passwordValue.length <= 20
}

const register = async (authProps: AuthProps): Promise<void> => {
  const { user } = await createUserWithEmailAndPassword.apply(null, authProps)
  user$.value = user as User
  token.value = user$.value.accessToken || ''
  const { uid, email, providerId } = user$.value.providerData[0]
  const authUser: AuthUser = { uid, email, providerId }
  authUser.accessToken = user$.value.accessToken
  const metadata = user.metadata as UserMetadata
  authUser.displayName = email.split('@')[0]
  authUser.metadata = metadata
  setUser(authUser)
  navigateTo('/')
}

const signIn = async (authProps: AuthProps): Promise<void> => {
  const { user } = await signInWithEmailAndPassword.apply(null, authProps)
  user$.value = user as User
  token.value = user$.value.accessToken || ''
  const { uid, email, providerId } = user$.value.providerData[0]
  const authUser: AuthUser = { uid, email, providerId }
  authUser.accessToken = user$.value.accessToken
  const metadata = user.metadata as UserMetadata
  authUser.displayName = email.split('@')[0]
  authUser.metadata = metadata
  setUser(authUser)
  navigateTo('/')
}

const validate = async () => {
  if (validateEmail() && validatePassword()) {
    const authProps = [$firebaseAuth, emailField.value!.value, passwordField.value!.value]
    try {
      (variant.value === 'REGISTER') ? await register(authProps) : await signIn(authProps)
    } catch (error) {
      console.log(error)
      console.log('There was an error signing you in')
    }
  }
}

const signInWithGithub = async () => {
  const provider = new GithubAuthProvider()

  const result = await signInWithPopup($firebaseAuth, provider)

  // The signed-in user info.
  const user = result.user

  user$.value = user as User
  const { uid, email, providerId } = user$.value.providerData[0]
  const authUser: AuthUser = { uid, email, providerId }
  authUser.accessToken = user$.value.accessToken
  const metadata = user.metadata as UserMetadata
  authUser.displayName = email.split('@')[0]
  authUser.metadata = metadata
  setUser(authUser)
  navigateTo('/')
}

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider()

  const { user } = await signInWithPopup($firebaseAuth, provider)

  user$.value = user as User
  token.value = user$.value.accessToken || ''
  const { uid, email, providerId } = user$.value.providerData[0]
  const authUser: AuthUser = { uid, email, providerId }
  authUser.accessToken = user$.value.accessToken
  const metadata = user.metadata as UserMetadata
  authUser.displayName = email.split('@')[0]
  authUser.metadata = metadata
  setUser(authUser)
  navigateTo('/')
}

onMounted(() => {
})

</script>
<style lang="">

</style>
