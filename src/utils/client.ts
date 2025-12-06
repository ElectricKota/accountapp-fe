import createClient from 'openapi-fetch'
import type { Middleware } from 'openapi-fetch'
import { createSharedComposable } from '@vueuse/core'
import { useAuthStore } from '@/stores/auth.ts'
import type { paths } from '@/types/schema'

export const useClient = createSharedComposable(() => {
  const headersMiddleware: Middleware = {
    async onRequest({ request }) {
      const auth = useAuthStore()

      // Automatické doplnění tokenu do hlavičky
      if (auth.accessToken) {
        request.headers.set('Authorization', `Bearer ${auth.accessToken}`)
      }

      request.headers.set('Content-Type', 'application/json')

      return request
    },

    onResponse({ response }) {
      // Token expiroval nebo není validní → automaticky odhlásit uživatele
      if (response.status === 401) {
        const auth = useAuthStore()
        if (auth.accessToken) auth.logout()
      }
    },
  }

  const client = createClient<paths>({
    baseUrl: '/',
    credentials: 'include',
  })

  client.use(headersMiddleware)

  return client
})
