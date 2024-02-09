import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  try {
    const config = useRuntimeConfig()
    const { firebase } = config.public
    const app = initializeApp({ ...firebase })
    const auth = getAuth(app)
    // Realtime database
    const db = getDatabase(app)

    return {
      provide: {
        firebaseApp: app,
        firebaseAuth: auth,
        firebaseDb: db
      }
    }
  } catch (error) {
    console.error('Error initializing Firebase:', error.message)
    return {}
  }
  return {}
})
