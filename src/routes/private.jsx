import LandingLayout from 'layouts/LandingLayout'
import MainLayout from 'layouts/MainLayout'
import WorkspaceLayout from 'layouts/WorkspaceLayout'
import { Navigate, useRoutes } from 'react-router-dom'
import Billing from 'views/Billing'
import ConfirmSubscription from 'views/Billing/ConfirmSubscription'
import Connect from 'views/Billing/Connect'
import Deposit from 'views/Billing/Deposit'
import Pool from 'views/Billing/Pool'
import BillingContainer from 'views/Billing/index.container'
import Dashboard from 'views/Dashboard'
import FAQ from 'views/FAQ'
import LandingPage from 'views/LandingPage'
import PoolCreate from 'views/PoolCreate'
import ProfileContainer from 'views/Profile'
import FileUpload from 'views/Profile/FileUpload'
import ProfileDetails from 'views/Profile/ProfileDetails'
import WhyInfura from 'views/WhyInfura'
import Workspace from 'views/Workspace'

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
      },
      {
        path: 'faq',
        element: <FAQ />
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
        path: 'workspace',
        element: <WorkspaceLayout />,
        children: [
          { index: true, element: <Workspace /> },
          {
            path: ':poolId',
            element: <Workspace />
          },
          { path: ':poolId/details', element: <ProfileDetails /> }
        ]
      },
      {
        path: 'profile/:poolId/file-upload',
        element: <FileUpload />
      },
      {
        path: 'profile/connect-wallet/:page',
        element: <Connect />
      },
      {
        path: 'pool-creation/pool',
        element: <BillingContainer />,
        children: [
          {
            index: true,
            element: <PoolCreate />
          },
          {
            path: 'connect-wallet/:page',
            element: <Connect />
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
