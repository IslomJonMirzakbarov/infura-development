import AuthLayout from 'layouts/AuthLayout'
import MainLayout from 'layouts/MainLayout'
import { Navigate, useRoutes } from 'react-router-dom'
import ConfirmationCode from 'views/Auth/ConfirmationCode'
import Login from 'views/Auth/Login'
import NewPassword from 'views/Auth/NewPassword'
import ResetPassword from 'views/Auth/ResetPassword'
import Signup from 'views/Auth/SignUp'
import Billing from 'views/Billing'
import Pricing from 'views/Billing/pricing'
import Connect from 'views/Billing/Connect'
import Deposit from 'views/Billing/Deposit'
import BillingContainer from 'views/Billing/index.container'
import Pool from 'views/Billing/Pool'
import ProfileDetails from 'views/Profile/ProfileDetails'
import Dashboard from 'views/Dashboard'
import LandingPage from 'views/LandingPage'
import ProfileContainer from 'views/Profile'
import ConfirmSubscription from 'views/Billing/ConfirmSubscription'
import LandingLayout from 'layouts/LandingLayout'
import WhyInfura from 'views/WhyInfura'

export const privateRoutes = [
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
        path: 'profile/details/:id',
        element: <ProfileDetails />
      },
      {
        path: 'pricing',
        element: <BillingContainer />,
        children: [
          {
            index: true,
            element: <Pricing />
          },
          {
            path: 'confirm',
            element: <ConfirmSubscription />
          }
        ]
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
    element: <Navigate to='/main/dashboard' />
  }
]

const PrivateRoutes = () => {
  let element = useRoutes(privateRoutes)
  return element
}

export default PrivateRoutes
