import AuthLayout from 'layouts/AuthLayout'
import { Navigate, useRoutes } from 'react-router-dom'
import ConfirmationCode from 'views/Auth/ConfirmationCode'
import Login from 'views/Auth/Login'
import Reset from 'views/Auth/Reset'
import ResetPassword from 'views/Auth/ResetPassword'
import Signup from 'views/Auth/SignUp'
import LandingPage from 'views/LandingPage'

export const publicRoutes = [
  {
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/auth',
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <Login />
          },
          {
            path: 'register',
            element: <Signup />
          },
          {
            path: 'confirm-code',
            element: <ConfirmationCode />
          },
          {
            path: 'reset-password',
            element: <ResetPassword />
          }
        ]
      }
    ]
  },
  {
    path: 'v1/auth/reset-password',
    element: <ResetPassword />
  },
  {
    path: '*',
    element: <Navigate to='/' />
  }
]

export default function PublicRoutes() {
  let element = useRoutes(publicRoutes)
  return element
}
