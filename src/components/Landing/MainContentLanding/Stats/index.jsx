import React from 'react'
import { Box, Typography } from '@mui/material'
import styles from '../style.module.scss'
import { formatStatStorageNumber, formatStatNumber } from 'utils/utilFuncs'

const Stats = ({ stats: statsData }) => {
  const stats = [
    {
      statTitle: 'Connected Nodes',
      statNum: statsData?.connected_nodes_count ?? 0,
      formatFunction: formatStatNumber
    },
    {
      statTitle: 'Storage Capacity',
      statNum: statsData ? statsData.storage_capacity * 1e9 : 0,
      formatFunction: formatStatStorageNumber
    },
    {
      statTitle: 'Stored Data',
      statNum: statsData ? statsData.stored_data * 1e9 : 0,
      formatFunction: formatStatStorageNumber
    },
    {
      statTitle: 'Created Pools',
      statNum: statsData?.pools_count ?? 0,
      formatFunction: formatStatNumber
    }
  ]

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

      {stats.map((stat) => {
        const formattedStat = stat.formatFunction(stat.statNum)
        return (
          <Box className={styles.stats} key={stat.statTitle}>
            <Typography className={styles.statTitle}>
              {stat.statTitle}
            </Typography>
            <Box className={styles.statBox}>
              <Typography
                variant='subtitle1'
                color='white'
                className={styles.statNum}
              >
                {formattedStat.value}
              </Typography>
              <Typography
                variant='body2'
                color='gray'
                className={styles.statCap}
              >
                {formattedStat.cap}
              </Typography>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

export default Stats
