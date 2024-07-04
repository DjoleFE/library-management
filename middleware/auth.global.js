import { useUserStore } from '~/store/user'

export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client) {
    const userStore = useUserStore()
    userStore.loadUser()
    if (!userStore.user && to.path !== '/login') {
      return navigateTo('/login')
    }
  }
})
