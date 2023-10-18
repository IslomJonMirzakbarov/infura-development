import React from 'react'
import { useSelector } from 'react-redux'
import PrivateRoutes from 'routes/private'
import PublicRoutes from 'routes/public'

const AuthProvider = () => {
  const { isAuth } = useSelector((store) => store.auth)
  // const isAuth = true

  return !!isAuth ? <PrivateRoutes /> : <PublicRoutes />
}

export default AuthProvider
