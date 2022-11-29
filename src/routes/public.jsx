import { Navigate, useRoutes } from 'react-router-dom';
import Login from 'views/Auth/Login/Login';
import Reset from 'views/Auth/Reset';
import Signup from 'views/Auth/SignUp';

export const publicRoutes = [
  {
    children: [
      {
        path: '/',
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
    path: '*',
    element: <Navigate to="/" />
  }
];

export default function PublicRoutes() {
  let element = useRoutes(publicRoutes);
  return element;
}
