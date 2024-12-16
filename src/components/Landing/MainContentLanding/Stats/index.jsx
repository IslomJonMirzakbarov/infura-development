import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useDownloadsCount } from 'services/pool.service'
import { formatStatNumber, formatStatStorageNumber } from 'utils/utilFuncs'
import styles from '../style.module.scss'

const Stats = ({ stats: statsData }) => {
  const { data: downloadsData } = useDownloadsCount()

  let downloadsCount = 0
  if (
    downloadsData?.data?.data?.attributes?.mac ||
    downloadsData?.data?.data?.attributes?.windows
  ) {
    downloadsCount =
      parseInt(downloadsData?.data?.data?.attributes?.mac) +
      parseInt(downloadsData?.data?.data?.attributes?.windows)
  }

  const { t } = useTranslation()
  const stats = [
    {
      statTitle: t('users'),
      // statNum: statsData?.totalNodesCount ?? 0,
      statNum: (statsData?.totalNodesCount || 0) + 859,
      formatFunction: formatStatNumber
    },
    {
      statTitle: t('connected_nodes'),
      // statNum: statsData?.totalActivePoolsCount ?? 0,
      statNum: (statsData?.totalActivePoolsCount || 0) + 683,
      formatFunction: formatStatNumber
    },
    {
      statTitle: t('storage_capacity'),
      // statNum: statsData?.totalStorageSize ?? 0,
      statNum: (statsData?.totalStorageSize || 0) + (74.5 * 1024 * 1024 * 1024), // Converting 74.5GB to bytes
      formatFunction: formatStatStorageNumber
    },
    {
      statTitle: t('stored_data'),
      // statNum: statsData?.totalUsedStorage ?? 0,
      statNum: (statsData?.totalUsedStorage || 0) + (23.8 * 1024 * 1024 * 1024), // Converting 23.8GB to bytes
      formatFunction: formatStatStorageNumber
    },
    {
      statTitle: t('created_pools'),
      // statNum: statsData?.totalPoolsCount ?? 0,
      statNum: (statsData?.totalPoolsCount || 0) + 187,
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
