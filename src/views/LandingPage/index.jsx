import React from 'react'
import globusIcon from 'assets/images/landing/globus.svg'
import styles from './style.module.scss'
import MainContentLanding from 'components/Landing/MainContentLanding'
import FooterLanding from 'components/Landing/FooterLanding'
import { useStats } from 'services/pool.service'

const LandingPage = () => {
  const { data } = useStats()
  return (
    <>
      <img src={globusIcon} alt='' className={styles.globusIcon} />

      <MainContentLanding stats={data} />

      <FooterLanding />
    </>
  )
}

export default LandingPage
