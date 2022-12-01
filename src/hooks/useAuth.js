import { useMutation } from 'react-query';
import request from 'utils/request';

const login = (data) => request.post('auth/login', data);

const register = (data) => request.post('auth/register', data);

const logout = (data) => request.post('auth/logout', data);

const reset = (data) => request.post('auth/reset-password', data);

const forget = (data) => request.post('auth/forget-password', data);

const refresh = (data) => request.post('auth/refresh-tokens', data);

const verify = (data) => request.post('auth/verify-email', data);

const useAuth = () => {
  const loginMutation = useMutation((data) => login(data));

  const registerMutation = useMutation((data) => register(data));

  const logoutMutation = useMutation((data) => logout(data));

  const resetMutation = useMutation((data) => reset(data));

  const forgetMutation = useMutation((data) => forget(data));

  const refreshMutation = useMutation((data) => refresh(data));

  const verifyMutation = useMutation((data) => verify(data));

  return {
    loginMutation,
    registerMutation,
    logoutMutation,
    resetMutation,
    forgetMutation,
    refreshMutation,
    verifyMutation
  };
};

export default useAuth;
