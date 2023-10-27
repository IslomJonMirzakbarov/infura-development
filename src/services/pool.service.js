import { useMutation } from 'react-query'
import httpRequest from './httpRequest'

const poolService = {
  create: async (data) => httpRequest.post('api/v1/pools', data)
}

export const usePoolCreateMutation = (mutationSettings) => {
  return useMutation(poolService.create, mutationSettings)
}
