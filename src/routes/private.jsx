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
import ProfileDetails from 'views/Profile/ProfileDetails'
import Dashboard from 'views/Dashboard'
import LandingPage from 'views/LandingPage'
import ProfileContainer from 'views/Profile'
import ConfirmSubscription from 'views/Billing/ConfirmSubscription'

export const privateRoutes = [
  {
    path: '/',
    element: <LandingPage />
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
        path: 'profile/details',
        element: <ProfileDetails />
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
            path: 'confirm',
            element: <ConfirmSubscription />
          },
          {
            path: 'pool',
            element: <Pool />
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

const PrivateRoutes = () => {
  let element = useRoutes(privateRoutes)
  return element
}

export default PrivateRoutes
