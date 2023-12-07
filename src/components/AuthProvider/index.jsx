import PrivateRoutes from 'routes/private'
import PublicRoutes from 'routes/public'
import authStore from 'store/auth.store'
import { observer } from 'mobx-react-lite'
import useCheckNetwork from 'hooks/useCheckNetwork'
import ServerError from 'views/Error/ServerError'

const AuthProvider = () => {
  const { isAuth } = authStore

  useCheckNetwork()

  return isAuth ? (
    <>
      <PrivateRoutes />
      <ServerError />
    </>
  ) : (
    <>
      <PublicRoutes />
      <ServerError />
    </>
  )
}

export default observer(AuthProvider)
