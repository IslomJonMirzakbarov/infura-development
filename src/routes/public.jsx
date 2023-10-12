import { Navigate, useRoutes } from 'react-router-dom'
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
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Signup />
      },
      {
        path: 'reset',
        element: <Reset />
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
