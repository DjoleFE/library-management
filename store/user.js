import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const errorMessage = ref('')

  // Setovanje korisnika u localstorage
  const setUser = (userData) => {
    user.value = userData
    if (import.meta.client) {
      localStorage.setItem('user', JSON.stringify(userData))
    }
  }

  // Brisanje korisnika iz localstorage
  const clearUser = () => {
    user.value = null
    if (import.meta.client) {
      localStorage.removeItem('user')
    }
  }

  // Isčitavanje korisnika iz localstorage
  const loadUser = () => {
    if (import.meta.client) {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        user.value = JSON.parse(storedUser)
      }
    }
  }

  // Logovanje korisnika sa pravim podacima
  const login = (email, password) => {
    if (email === 'demo@mail.com' && password === 'demoPass') {
      setUser({ email, username: 'Demo User' })
      errorMessage.value = ''
      return true
    } else {
      errorMessage.value = 'Wrong credentials'
      return false
    }
  }

  return {
    user,
    errorMessage,
    setUser,
    clearUser,
    loadUser,
    login,
  }
})
