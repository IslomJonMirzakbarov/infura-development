import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavbarLanding from 'components/Landing/NavbarLanding'
import globusIcon from 'assets/images/landing/globus.svg'
import styles from './style.module.scss'
import MainContentLanding from 'components/Landing/MainContentLanding'
import FooterLanding from 'components/Landing/FooterLanding'

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.navBar}>
        <NavbarLanding />
      </div>

      <img src={globusIcon} alt='' className={styles.globusIcon} />

      <MainContentLanding />

      <FooterLanding />
    </div>
  )
}

export default LandingPage
