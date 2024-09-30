import React, { useEffect } from 'react'
import globusIcon from 'assets/images/landing/globus.svg'
import styles from './style.module.scss'
import MainContentLanding from 'components/Landing/MainContentLanding'
import FooterLanding from 'components/Landing/FooterLanding'
import { useStats } from 'services/pool.service'
import PageTransition from 'components/PageTransition'

const LandingPage = () => {
  const { data } = useStats()
  console.log('statdata: ', data);
  

  return (
    <PageTransition>
      <img src={globusIcon} alt='globus' className={styles.globusIcon} />
      <MainContentLanding stats={data} />
      <FooterLanding />
    </PageTransition>
  )
}

export default LandingPage
