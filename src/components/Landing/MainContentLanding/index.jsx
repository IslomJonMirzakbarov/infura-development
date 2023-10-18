import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import styles from './style.module.scss'
import Stats from './Stats'
import Features from './Features'
import WhatsNew from './WhatsNew'

const MainContentLanding = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.mainContainer}>
      <Box className={styles.smallDescDiv}>
        <Box className={styles.titleSection}>
          <Typography variant='h1' className={styles.oceanDriveTxt}>
            OceanDrive
          </Typography>
          <Typography variant='h4' className={styles.infuraTxt}>
            Infura
          </Typography>
        </Box>

        <Typography className={styles.description}>
          OceanDrive is a decentralized storage platform that <br /> utilizes
          unused storage space among network participants <br /> to connect the
          global online and offline <br /> economy and provide a model for
          sustainable growth.
        </Typography>

        <Button className={styles.goToBtn}>Go to dashboard</Button>
      </Box>

      <Stats />

      <Features />

      <WhatsNew />
    </div>
  )
}

export default MainContentLanding
