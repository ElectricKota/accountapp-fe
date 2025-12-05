import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { useQueryCache } from '@pinia/colada'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      // token z API (Bearer token)
      accessToken: useLocalStorage(
        `${import.meta.env.VITE_NAME}/pinia/auth/accessToken`,
        '',
      ),

      user: null as null | {
        id: number
        username: string
        email: string
        role: string
      },
    }
  },

  actions: {
    isAuthenticated() {
      return this.accessToken !== ''
    },

    login(token: string, user: any) {
      this.accessToken = token
      this.user = user

      const queryCache = useQueryCache()
      queryCache.invalidateQueries()
    },

    logout() {
      this.accessToken = ''
      this.user = null

      const queryCache = useQueryCache()
      queryCache.invalidateQueries()
    },

    setUser(user: any) {
      this.user = user
    },
  },
})
