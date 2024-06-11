import Sidebar from 'components/Sidebar'
import { Outlet } from 'react-router-dom'
import styles from './style.module.scss'
import NavbarLanding from 'components/Landing/NavbarLanding'

export default function MainLayout() {
  return (
    <div className={styles.main}>
      <div className={styles.navBar}>
        <NavbarLanding />
      </div>
      <Sidebar />
      <main className={styles.body}>
        <Outlet />
      </main>
    </div>
  )
}
