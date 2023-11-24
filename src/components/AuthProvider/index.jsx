import PrivateRoutes from 'routes/private'
import PublicRoutes from 'routes/public'
import authStore from 'store/auth.store'
import { observer } from 'mobx-react-lite'
import useCheckNetwork from 'hooks/useCheckNetwork'

const AuthProvider = () => {
  const { isAuth } = authStore

  useCheckNetwork()

  return isAuth ? <PrivateRoutes /> : <PublicRoutes />
}

export default observer(AuthProvider)
