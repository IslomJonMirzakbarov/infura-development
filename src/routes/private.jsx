import MainLayout from 'layouts/MainLayout'
import { Navigate, useRoutes } from 'react-router-dom'
import Billing from 'views/Billing'
import ConfirmSubscription from 'views/Billing/ConfirmSubscription'
import Connect from 'views/Billing/Connect'
import Deposit from 'views/Billing/Deposit'
import BillingContainer from 'views/Billing/index.container'
import Pool from 'views/Billing/Pool'
import Dashboard from 'views/Dashboard'
import ProfileContainer from 'views/Profile'

export const privateRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
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

export default function PrivateRoutes() {
  let element = useRoutes(privateRoutes)
  return element
}
