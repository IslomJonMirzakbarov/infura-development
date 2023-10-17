import { useMutation } from 'react-query'
import request from 'utils/request'

const login = (data) => request.post('auth/login', data)

const register = (data) => request.post('auth/register', data)

const logout = (data) => request.post('auth/logout', data)

const reset = (data, token) =>
  request.post(`auth/reset-password?token=${token}`, data)

const forgot = (data) => request.post('auth/forgot-password', data)

const refresh = (data) => request.post('auth/refresh-tokens', data)

const verify = (data) => request.post('auth/verify-email', data)

const useAuth = (token) => {
  const loginMutation = useMutation((data) => login(data))

  const registerMutation = useMutation((data) => register(data))

  const logoutMutation = useMutation((data) => logout(data))

  const resetMutation = useMutation((data) => reset(data, token))

  const forgotMutation = useMutation((data) => forgot(data))

  const refreshMutation = useMutation((data) => refresh(data))

  const verifyMutation = useMutation((data) => verify(data))

  return {
    loginMutation,
    registerMutation,
    logoutMutation,
    resetMutation,
    forgotMutation,
    refreshMutation,
    verifyMutation
  }
}

export default useAuth
