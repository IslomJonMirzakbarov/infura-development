import { useMutation } from 'react-query'
import authStore from 'store/auth.store'
import httpRequest from './httpRequest'

const authService = {
  login: async (data) => httpRequest.post('auth/users/login', data),
  logout: async (data) => httpRequest.post('auth/users/logout', data),
  register: async (data) => httpRequest.post('auth/users/register', data), // email verification is not working
  sendVerificationEmail: async () =>
    httpRequest.get('auth/users/send-verification-email', {
      headers: {
        Authorization: `Bearer ${authStore.token.refresh.token}`
      }
    }),
  confirmCode: async (otp) =>
    httpRequest.get(`auth/users/verify-email-with-otp`, { params: { otp } }),
  resend: async (data) =>
    httpRequest.post('auth/users/re-send-verification-email', data), // in the old api only email is required but in new password added
  renew: async (data) => httpRequest.post('auth/users/refresh-tokens', data),
  forgotPassword: async (data) =>
    httpRequest.post('auth/users/forgot-password', data),
  resetPassword: async (data) =>
    httpRequest.patch('auth/users/reset-password', data)
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

export const useResetPasswordMutation = (mutationSettings) => {
  return useMutation(authService.resetPassword, mutationSettings)
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
