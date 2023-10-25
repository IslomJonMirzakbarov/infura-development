import React from 'react'
import { Box, Typography } from '@mui/material'
import styles from '../style.module.scss'
import { stats } from '../data'

const Stats = () => {
  return (
    <Box className={styles.statsDiv}>
      <Typography
        variant='h6'
        color='white'
        gutterBottom
        className={styles.titleNS}
      >
        OceanDrive's <br /> Network Stats
      </Typography>

      {/* <div className={styles.statBoxesHolder}> */}
      {stats.map((stat) => (
        <Box className={styles.stats}>
          <Typography className={styles.statTitle}>{stat.statTitle}</Typography>
          <Box className={styles.statBox}>
            <Typography
              variant='subtitle1'
              color='white'
              className={styles.statNum}
            >
              {stat.statNum}
            </Typography>
            <Typography variant='body2' color='gray' className={styles.statCap}>
              {stat.statCap}
            </Typography>
          </Box>
        </Box>
      ))}
      {/* </div> */}
    </Box>
  )
}

export default Stats
