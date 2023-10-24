import AuthLayout from 'layouts/AuthLayout'
import { Navigate, useRoutes } from 'react-router-dom'
import ConfirmationCode from 'views/Auth/ConfirmationCode'
import Login from 'views/Auth/Login'
import NewPassword from 'views/Auth/NewPassword'
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
          },
          {
            path: 'create-new-password',
            element: <NewPassword />
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

const PublicRoutes = () => {
  let element = useRoutes(publicRoutes)
  return element
}

export default PublicRoutes