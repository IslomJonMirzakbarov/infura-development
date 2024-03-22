import AuthLayout from 'layouts/AuthLayout'
import LandingLayout from 'layouts/LandingLayout'
import { Navigate, useRoutes } from 'react-router-dom'
import ConfirmationCode from 'views/Auth/ConfirmationCode'
import Login from 'views/Auth/Login'
import NewPassword from 'views/Auth/NewPassword'
import ResetPassword from 'views/Auth/ResetPassword'
import Signup from 'views/Auth/SignUp'
import FAQ from 'views/FAQ'
import LandingPage from 'views/LandingPage'
import WhyInfura from 'views/WhyInfura'

export const publicRoutes = [
  {
    children: [
      {
        path: '/',
        element: <LandingLayout />,
        children: [
          {
            index: true,
            element: <LandingPage />
          },
          {
            path: 'why-infura',
            element: <WhyInfura />
          },
          {
            path: 'faq',
            element: <FAQ />
          }
        ]
      },
      {
        path: '/why-infura',
        element: <WhyInfura />
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
            path: 'new-password',
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
