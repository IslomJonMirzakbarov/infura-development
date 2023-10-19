import AuthLayout from 'layouts/AuthLayout'
import MainLayout from 'layouts/MainLayout'
import { Navigate, useRoutes } from 'react-router-dom'
import ConfirmationCode from 'views/Auth/ConfirmationCode'
import Login from 'views/Auth/Login'
import NewPassword from 'views/Auth/NewPassword'
import ResetPassword from 'views/Auth/ResetPassword'
import Signup from 'views/Auth/SignUp'
import Billing from 'views/Billing'
import Connect from 'views/Billing/Connect'
import Deposit from 'views/Billing/Deposit'
import BillingContainer from 'views/Billing/index.container'
import Pool from 'views/Billing/Pool'
import PoolDetails from 'views/Billing/PoolDetails'
import Dashboard from 'views/Dashboard'
import LandingPage from 'views/LandingPage'
import ProfileContainer from 'views/Profile'

export const privateRoutes = [
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
  },
  {
    path: '/main',
    element: <MainLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: '/main',
        element: <Navigate to='/main/dashboard' replace />
      },
      {
        path: 'profile',
        element: <ProfileContainer />
      },
      {
        path: 'billing',
        element: <BillingContainer />,
        children: [
          {
            index: true,
            element: <Billing />
          },
          {
            path: 'pool',
            element: <Pool />
          },
          {
            path: 'pool/details',
            element: <PoolDetails />
          },
          {
            path: 'connect',
            element: <Connect />
          },
          {
            path: 'deposit',
            element: <Deposit />
          }
        ]
      }
    ]
  },

  {
    path: '*',
    element: <Navigate to='/' />
  }
]

export default function PrivateRoutes() {
  let element = useRoutes(privateRoutes)
  return element
}
