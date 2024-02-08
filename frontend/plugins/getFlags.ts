import { ref as firebaseRef, onValue } from 'firebase/database'

const getFlags = (allFlags) => {
  const { $firebaseDb } = useNuxtApp()
  const flagsRef = firebaseRef($firebaseDb, 'flags')

  onValue(flagsRef, (snapshot) => {
    if (snapshot.exists()) {
      allFlags.value = snapshot.val()
      return allFlags.value
    } else {
      console.log('No data available')
    }
  }, (error) => {
    console.error('Error getting data:', error)
  })
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      getFlags
    }
  }
})
