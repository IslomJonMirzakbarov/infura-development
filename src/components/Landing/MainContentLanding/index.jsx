import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import styles from './style.module.scss'
import Stats from './Stats'
import Features from './Features'
import WhatsNew from './WhatsNew'
import authStore from 'store/auth.store'
import InfoSection from './InfoSection'

const MainContentLanding = ({ stats }) => {
  const navigate = useNavigate()
  const token = authStore?.token?.access_token
  const goToClick = () =>
    token ? navigate('/main/dashboard') : navigate('/auth/login')

  return (
    <div className={styles.mainContainer}>
      <Box className={styles.smallDesc}>
        <Box className={styles.titleSection}>
          <Typography className={styles.oceanDriveTxt}>OceanDrive</Typography>
          <Typography className={styles.infuraTxt}>Infura</Typography>
        </Box>

        <Typography className={styles.description}>
          OceanDrive Infura is the bridge to a world seamlessly connected
          through <br /> decentralized storage solutions. Our innovative
          platform leverages the latent <br /> potential of unused storage space
          across our global network of participants, <br /> creating a web of
          connectivity that transcends online and offline boundaries.
        </Typography>

        <Button className={styles.goToBtn} onClick={goToClick}>
          Go to dashboard
        </Button>
      </Box>

      <Stats stats={stats} />

      <Features />

      <InfoSection />

      <WhatsNew />
    </div>
  )
}

export default MainContentLanding
