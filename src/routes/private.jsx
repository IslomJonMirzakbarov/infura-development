import MainLayout from 'layouts/MainLayout';
import { Navigate, useRoutes } from 'react-router-dom';
import Billing from 'views/Billing';
import Dashboard from 'views/Dashboard';
import ProfileContainer from 'views/Profile';

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
        element: <Billing />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
];

export default function PrivateRoutes() {
  let element = useRoutes(privateRoutes);
  return element;
}
