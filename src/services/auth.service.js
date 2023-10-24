import { useMutation } from 'react-query'
import httpRequest from './httpRequest'

const authService = {
  login: async (data) => httpRequest.post('auth/login', data),
  register: async (data) => httpRequest.post('auth/register', data),
  confirmCode: async (data) => httpRequest.post('auth/confirm', data)
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
