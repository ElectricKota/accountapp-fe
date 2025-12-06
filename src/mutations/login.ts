import { defineMutation, useMutation } from '@pinia/colada'
import { useClient } from '@/utils/client.ts'

export const useLoginMutation = defineMutation(() => {
  const mutation = useMutation({
    key: ['api/user/login'],
    mutation: async (body: { username: string, password: string, keepLogged: boolean }) => {
      return await useClient().POST('/api/user/login', {
        body,
      })
    },
  })

  return { ...mutation }
})
