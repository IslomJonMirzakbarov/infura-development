import React from 'react'
import { Box, Typography } from '@mui/material'
import styles from '../style.module.scss'
import { formatStatStorageNumber, formatStatNumber } from 'utils/utilFuncs'
import { useTranslation } from 'react-i18next'
import { useDownloadsCount, useWalletsCount } from 'services/pool.service'

const Stats = ({ stats: statsData }) => {
  const { data } = useDownloadsCount()
  console.log('datastorage: ', statsData)
  const { data: walletsData } = useWalletsCount()

  const walletsCount = walletsData?.payload?.wallet_count

  let downloadsCount = 0
  if (
    data?.data?.data?.attributes?.mac ||
    data?.data?.data?.attributes?.windows
  ) {
    downloadsCount =
      parseInt(data?.data?.data?.attributes?.mac) +
      parseInt(data?.data?.data?.attributes?.windows)
  }
  const { t } = useTranslation()
  const stats = [
    {
      statTitle: t('users'),
      statNum: walletsCount ?? 0,
      formatFunction: formatStatNumber
    },
    {
      statTitle: t('connected_nodes'),
      statNum: statsData?.connected_nodes_count ?? 0,
      formatFunction: formatStatNumber
    },
    {
      statTitle: t('storage_capacity'),
      statNum: statsData ? statsData.live_available_storage * 1e6 : 0,
      formatFunction: formatStatStorageNumber
    },
    {
      statTitle: t('stored_data'),
      statNum: statsData ? statsData.stored_data * 1e9 : 0,
      formatFunction: formatStatStorageNumber
    },
    {
      statTitle: t('created_pools'),
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
        dangerouslySetInnerHTML={{ __html: t('oceandrives_network_stats') }}
      />

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
