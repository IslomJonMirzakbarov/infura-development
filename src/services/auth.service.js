import { useMutation } from 'react-query'
import httpRequest from './httpRequest'

const authService = {
  login: async (data) =>
    httpRequest.post('auth/users/login', data),
  logout: async (data) => httpRequest.post('api/v1/auth/logout', data),
  register: async (data) => httpRequest.post('api/v1/auth/register', data),
  confirmCode: async (data) => httpRequest.post('api/v1/auth/confirm', data),
  resend: async (data) => httpRequest.post('api/v1/auth/resend-otp', data),
  renew: async (data) => httpRequest.post('api/v1/auth/renew', data),
  forgotPassword: async (data) =>
    httpRequest.post('api/v1/auth/reset-password', data),
  resetPassword: async (data) =>
    httpRequest.patch('api/v1/auth/reset-password', data)
}

export const useLoginMutation = (mutationSettings) => {
  return useMutation(authService.login, mutationSettings)
}

export const useLogoutMutation = (mutationSettings) => {
  return useMutation(authService.logout, mutationSettings)
}

export const useRegisterMutation = (mutationSettings) => {
  return useMutation(authService.register, mutationSettings)
}

export const useConfirmCodeMutation = (mutationSettings) => {
  return useMutation(authService.confirmCode, mutationSettings)
}

export const useForgotPasswordMutation = (mutationSettings) => {
  return useMutation(authService.forgotPassword, mutationSettings)
}

export const useResetPasswordMutation = (mutationSettings) => {
  return useMutation(authService.resetPassword, mutationSettings)
}

export const useResendSms = (mutationSettings) => {
  return useMutation(authService.resend, mutationSettings)
}

export const refreshToken = async (token) => {
  try {
    const res = await authService.renew({
      refresh_token: token
    })
    return res?.payload?.token?.access_token
  } catch (e) {}
}
