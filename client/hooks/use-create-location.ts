import { useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import { LocationData } from '../../models/Location.js'

export default function useCreateLocation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: LocationData) => {
      await request.post('/api/v1/locations').send(data)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['location'] })
    },
  })
}
