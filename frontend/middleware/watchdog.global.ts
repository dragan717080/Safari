import useUser from '~~/composables/useUser'

export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUser()
  const allowedRoutes = ['/', '/auth']
  if (user.value) {
    if (!allowedRoutes.includes(to.path)) {
      return navigateTo('/auth')
    }
  }
})
