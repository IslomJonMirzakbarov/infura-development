import MainLayout from 'layouts/MainLayout'
import { Navigate, useRoutes } from 'react-router-dom'
import Billing from 'views/Billing'
import Pricing from 'views/Billing/pricing'
import Connect from 'views/Billing/Connect'
import Deposit from 'views/Billing/Deposit'
import BillingContainer from 'views/Billing/index.container'
import Pool from 'views/Billing/Pool'
import Dashboard from 'views/Dashboard'
import LandingPage from 'views/LandingPage'
import ProfileContainer from 'views/Profile'
import ConfirmSubscription from 'views/Billing/ConfirmSubscription'
import LandingLayout from 'layouts/LandingLayout'
import WhyInfura from 'views/WhyInfura'
import FAQ from 'views/FAQ'
import FileUpload from 'views/Profile/FileUpload'
import PoolCreate from 'views/PoolCreate'

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
        path: 'profile/:poolId/file-upload',
        element: <FileUpload />
      },
      // {
      //   path: 'profile/details/:id',
      //   element: <ProfileDetails />
      // },
      {
        path: 'pool-creation/pool',
        element: <BillingContainer />,
        children: [
          {
            index: true,
            element: <PoolCreate />
          },
          {
            path: 'connect-wallet',
            element: <Connect />
          }
        ]
      },
      // {
      //   path: 'pricing',
      //   element: <BillingContainer />,
      //   children: [
      //     {
      //       index: true,
      //       element: <Pricing />
      //     },
      //     {
      //       path: 'confirm',
      //       element: <ConfirmSubscription />
      //     }
      //   ]
      // },
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
