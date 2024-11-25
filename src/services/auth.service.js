import { useMutation, useQuery } from 'react-query'
import authStore from 'store/auth.store'
import httpRequest from './httpRequest'
import axios from 'axios'

const authService = {
  login: async (data) => httpRequest.post('api/v1/auth/users/login', data),
  logout: async (data) => httpRequest.post('api/v1/auth/users/logout', data),
  register: async (data) =>
    httpRequest.post('api/v1/auth/users/register', data), // email verification is not working
  sendVerificationEmail: async () =>
    httpRequest.get('api/v1/auth/users/send-verification-email', {
      headers: {
        Authorization: `Bearer ${authStore.token.refresh.token}`
      }
    }),
  confirmCode: async (otp) =>
    httpRequest.get(`api/v1/auth/users/verify-email-with-otp`, {
      params: { otp },
      headers: {
        Authorization: `Bearer ${authStore.token.refresh.token}`
      }
    }),
  resend: async (data) =>
    httpRequest.post('api/v1/auth/users/re-send-verification-email', data), // in the old api only email is required but in new password added
  renew: async (data) =>
    httpRequest.post('api/v1/auth/users/refresh-tokens', data),
  forgotPassword: async (data) =>
    httpRequest.post('api/v1/auth/users/forgot-password', data),
  resetPassword: async (data, headers) =>
    axios.post(
      `${process.env.REACT_APP_BASE_URL}api/v1/auth/users/reset-password`,
      data,
      {
        headers
      }
    ),
  getApiKey: async (poolId) =>
    httpRequest.get(`api/v1/auth/users/api-key-list/${poolId}`),
  generateApiKey: async (data) =>
    httpRequest.post('api/v1/auth/users/generate-api-key', data)
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

export const useSendVerificationEmailMutation = (mutationSettings) => {
  return useMutation(authService.sendVerificationEmail, mutationSettings)
}

export const useConfirmCodeMutation = (mutationSettings) => {
  return useMutation(authService.confirmCode, mutationSettings)
}

export const useForgotPasswordMutation = (mutationSettings) => {
  return useMutation(authService.forgotPassword, mutationSettings)
}

export const useResetPasswordMutation = ({ mutationSettings, headers }) => {
  return useMutation(
    (data) => authService.resetPassword(data, headers),
    mutationSettings
  )
}

export const useResendSms = (mutationSettings) => {
  return useMutation(authService.resend, mutationSettings)
}

export const refreshToken = async (token) => {
  try {
    const res = await authService.renew({
      refreshToken: token
    })
    return res?.details?.token?.access?.token
  } catch (e) {}
}

export const useGetApiKey = (poolId, queryOptions) => {
  return useQuery(['apiKey', poolId], () => authService.getApiKey(poolId), {
    enabled: !!poolId,
    ...queryOptions
  })
}

export const useApiGenerateKey = (mutationOptions) => {
  return useMutation(authService.generateApiKey, {
    ...mutationOptions
  })
}
