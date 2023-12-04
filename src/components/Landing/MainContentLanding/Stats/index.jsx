import React from 'react'
import { Box, Typography } from '@mui/material'
import styles from '../style.module.scss'
import { formatStatNumber } from 'utils/utilFuncs'

const Stats = ({ stats: statsData }) => {
  const mockStats = {
    connected_nodes_count: 735,
    storage_capacity: 1.22,
    stored_data: 1.34,
    pools_count: 456
  }
  const stats = [
    {
      statTitle: 'Connected Nodes',
      statNum: statsData?.connected_nodes_count,
      statCap: ''
    },
    {
      statTitle: 'Storage Capacity',
      statNum: statsData?.storage_capacity,
      statCap: ''
    },
    {
      statTitle: 'Stored Data ',
      statNum: statsData?.stored_data,
      statCap: ''
    },
    {
      statTitle: 'Created Pools',
      statNum: statsData?.pools_count,
      statCap: ''
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

      {/* <div className={styles.statBoxesHolder}> */}
      {stats.map((stat) => {
        const formattedStat = formatStatNumber(stat.statNum)
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
                {formattedStat.cap || stat.statCap}
              </Typography>
            </Box>
          </Box>
        )
      })}
      {/* </div> */}
    </Box>
  )
}

export default Stats
