import React from 'react'
import globusIcon from 'assets/images/landing/globus.svg'
import styles from './style.module.scss'
import MainContentLanding from 'components/Landing/MainContentLanding'
import FooterLanding from 'components/Landing/FooterLanding'

const LandingPage = () => {
  return (
    <>
      <img src={globusIcon} alt='' className={styles.globusIcon} />

      <MainContentLanding />

      <FooterLanding />
    </>
  )
}

export default LandingPage
