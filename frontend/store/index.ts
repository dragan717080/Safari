import { defineStore } from 'pinia'
import { AuthUser } from '~/interfaces/User'

export const useAuthStore = defineStore('auth', {
  state: () => ({ user: null }),
  actions: {
    setUser (value: AuthUser) {
      this.user = value
    },
    signOutUser () {
      this.user = null
    }
  },
  persist: {
    storage: persistedState.sessionStorage
  }
})
