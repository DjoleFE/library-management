import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const errorMessage = ref('')

  const setUser = (userData) => {
    user.value = userData
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(userData))
    }
  }

  const clearUser = () => {
    user.value = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user')
    }
  }

  const loadUser = () => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        user.value = JSON.parse(storedUser)
      }
    }
  }

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
