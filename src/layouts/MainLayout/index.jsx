import Sidebar from 'components/Sidebar'
import { Outlet } from 'react-router-dom'
import styles from './style.module.scss'

export default function MainLayout() {
  return (
    <div className={styles.main}>
      <Sidebar />
      <main className={styles.body}>
        <Outlet />
      </main>
    </div>
  )
}
