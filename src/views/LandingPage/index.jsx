import React from 'react'
import globusIcon from 'assets/images/landing/globus.svg'
import styles from './style.module.scss'
import MainContentLanding from 'components/Landing/MainContentLanding'
import FooterLanding from 'components/Landing/FooterLanding'
import { useNodeStats } from 'services/pool.service'
import PageTransition from 'components/PageTransition'

const LandingPage = () => {
  const { data: nodeStats } = useNodeStats()
  
  return (
    <PageTransition>
      <img src={globusIcon} alt='globus' className={styles.globusIcon} />
      <MainContentLanding stats={nodeStats?.details} />
      <FooterLanding />
    </PageTransition>
  )
}

export default LandingPage
