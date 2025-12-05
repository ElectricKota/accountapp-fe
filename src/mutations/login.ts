import { defineMutation, useMutation } from '@pinia/colada'
import { useClient } from '@/utils/client.ts'

export const useLoginMutation = defineMutation(() => {
  const mutation = useMutation({
    key: ['login'],
    mutation: async (body: { username: string, password: string, keepLogged: boolean }) => {
      return await useClient().POST('/login', {
        body,
      })
    },
  })

  return { ...mutation }
})
