import React, { useEffect } from 'react'
import globusIcon from 'assets/images/landing/globus.svg'
import styles from './style.module.scss'
import MainContentLanding from 'components/Landing/MainContentLanding'
import FooterLanding from 'components/Landing/FooterLanding'
import { useStats } from 'services/pool.service'
import useMetaMask from 'hooks/useMetaMask'

const LandingPage = () => {
  const { data } = useStats()
  const { initializeProvider } = useMetaMask()

  useEffect(() => {
    initializeProvider()
  }, [initializeProvider])
  return (
    <>
      <img src={globusIcon} alt='' className={styles.globusIcon} />

      <MainContentLanding stats={data} />

      <FooterLanding />
    </>
  )
}

export default LandingPage
