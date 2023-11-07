import React from 'react'
import styles from './style.module.scss'
import NavbarLanding from 'components/Landing/NavbarLanding'
import { Outlet } from 'react-router-dom'

const LandingLayout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.navBar}>
        <NavbarLanding />
      </div>
      <Outlet />
    </div>
  )
}

export default LandingLayout
