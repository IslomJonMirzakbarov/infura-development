import PrivateRoutes from 'routes/private'
import PublicRoutes from 'routes/public'
import authStore from 'store/auth.store'
import { observer } from 'mobx-react-lite'
import useCheckNetwork from 'hooks/useCheckNetwork'
import ServerError from 'views/Error/ServerError'
import { AnimatePresence } from 'framer-motion'

const AuthProvider = () => {
  const { isAuth } = authStore

  useCheckNetwork()

  return isAuth ? (
    <AnimatePresence>
      <PrivateRoutes />
      <ServerError />
    </AnimatePresence>
  ) : (
    <AnimatePresence>
      <PublicRoutes />
      <ServerError />
    </AnimatePresence>
  )
}

export default observer(AuthProvider)
