import { useMutation } from 'react-query'
import httpRequest from './httpRequest'

const authService = {
  login: async (data) => httpRequest.post('api/v1/auth/login', data),
  register: async (data) => httpRequest.post('api/v1/auth/register', data),
  confirmCode: async (data) => httpRequest.post('api/v1/auth/confirm', data)
}

export const useLoginMutation = (mutationSettings) => {
  return useMutation(authService.login, mutationSettings)
}

export const useRegisterMutation = (mutationSettings) => {
  return useMutation(authService.register, mutationSettings)
}

export const useConfirmCodeMutation = (mutationSettings) => {
  return useMutation(authService.confirmCode, mutationSettings)
}
