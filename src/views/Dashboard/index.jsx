import { Box, Button, Typography } from '@mui/material'
import DashboardBarChart from 'components/BarChart'
import Container from 'components/Container'
import HFSelect from 'components/ControlledFormElements/HFSelect'
import PageTransition from 'components/PageTransition'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import poolStore from 'store/pool.store'
import {
  formatStatNumber,
  formatStatStorageNumber,
  getShortenedPoolName
} from 'utils/utilFuncs'
import styles from './style.module.scss'
import { usePoolStatistics } from 'services/pool.service'

const Dashboard = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { control, watch } = useForm({
    defaultValues: {
      dashboardPool: 'ALL'
    }
  })

  const selectedPoolId = watch('dashboardPool')

  // Fetch real data from server
  const { data: serverData, isLoading } = usePoolStatistics()

  // Wrap the data object in useMemo with fallback to demo data
  const data = useMemo(() => {
    if (!serverData?.details?.results) {
      return {
        pools: [], // Return empty array if no data
        all: {
          total_size: '0GB',
          remaining_size: '0GB',
          subscribers_count: 0,
          uploaded_files_count: 0,
          downloaded_files_count: 0
        },
        available_nodes_count: 0
      }
    }

    // Transform server data to match expected format
    const pools = serverData.details.results.map(pool => ({
      id: pool.poolId,
      name: pool.poolName,
      price: pool.price,
      total_size: `${pool.poolSize.size}${pool.poolSize.type}`,
      remaining_size: `${pool.poolSize.size - (pool.usedStorage.size || 0)}${pool.poolSize.type}`,
      subscribers_count: 0, // Use demo value as not provided by API
      uploaded_files_count: pool.uploadedFilesCount,
      downloaded_files_count: pool.downlodedFilesCount
    }))

    // Calculate totals for 'all' data
    const totalSize = pools.reduce((sum, pool) => sum + parseFloat(pool.total_size), 0)
    const remainingSize = pools.reduce((sum, pool) => sum + parseFloat(pool.remaining_size), 0)
    const uploadedFiles = pools.reduce((sum, pool) => sum + pool.uploaded_files_count, 0)
    const downloadedFiles = pools.reduce((sum, pool) => sum + pool.downloaded_files_count, 0)

    return {
      pools,
      all: {
        total_size: `${totalSize}GB`,
        remaining_size: `${remainingSize}GB`,
        subscribers_count: 0, // Use demo value as not provided by API
        uploaded_files_count: uploadedFiles,
        downloaded_files_count: downloadedFiles
      },
      available_nodes_count: serverData.details.statistics?.availableNodesCount || 0
    }
  }, [serverData])

  // Update the existing useMemo to use the memoized data
  const poolData = useMemo(() => {
    return selectedPoolId === 'ALL'
      ? data?.all
      : data?.pools?.find((pool) => pool.id === selectedPoolId)
  }, [data, selectedPoolId])

  const poolCount = data?.pools?.length
  console.log('poolCount: ', poolCount)
  let pools = [
    {
      label: poolCount === 0 || poolCount === undefined ? '0' : 'ALL',
      value: 'ALL'
    }
  ]

  const freePool = data?.pools?.find((pool) => pool.price === 'FREE')
  useEffect(() => {
    poolStore.setPoolCount(poolCount)
    if (freePool) {
      poolStore.setSelected(true)
    } else {
      poolStore.setSelected(false)
    }
  }, [freePool, poolCount])

  if (data?.pools) {
    pools = pools.concat(
      data.pools.map((pool) => ({
        label: getShortenedPoolName(pool.name),
        value: pool.id
      }))
    )
  }

  const isSelectDisabled = pools[0].label === '0'

  const defaultPoolInfo = {
    PoolSize: '0',
    RemainingStorage: '0',
    SubscribedNodes: '0',
    UploadedFiles: '0'
  }

  const poolInfo = isSelectDisabled
    ? defaultPoolInfo
    : {
        PoolSize: poolData?.total_size || '...',
        RemainingStorage: poolData?.remaining_size || '...',
        SubscribedNodes: poolData?.subscribers_count.toString() || '0',
        UploadedFiles: poolData?.uploaded_files_count.toString() || '0'
      }

  const keyMapping = {
    PoolSize: t('pool_size'),
    RemainingStorage: t('remaining_storage'),
    SubscribedNodes: t('subscribed_nodes'),
    UploadedFiles: t('uploaded_files')
  }

  const infoBoxes = Object.entries(poolInfo).map(([key, value]) => {
    let displayValue
    if (key === 'PoolSize' || key === 'RemainingStorage') {
      const num = parseFloat(value) * 1e9
      displayValue =
        formatStatStorageNumber(num).value +
        '' +
        formatStatStorageNumber(num).cap
    } else {
      const num = parseInt(value, 10)
      displayValue =
        formatStatNumber(num).value + ' ' + formatStatNumber(num).cap
    }

    return (
      <Typography key={key} fontSize={12} fontWeight={700} color='#fff'>
        {keyMapping[key]}:{' '}
        <span style={{ fontWeight: '300' }}>{displayValue}</span>
      </Typography>
    )
  })

  return (
    <PageTransition>
      <Container maxWidth={true} className={styles.container}>
        <Box className={styles.createBtnBox}>
          <Button
            className={styles.createBtn}
            disableElevation
            color='primary'
            onClick={() => navigate('/main/pool-creation/pool')}
          >
            <span>+</span> {t('create_storage')}
          </Button>
          <Typography className={styles.nodes}>
            {t('nodes_available')} : {data?.available_nodes_count}
          </Typography>
        </Box>

        <Box className={styles.chartHolder}>
          <Box
            className={styles.chartHead}
            display='flex'
            alignItems='center'
            gap='21px'
          >
            <HFSelect
              control={control}
              name='dashboardPool'
              placeholder='Select pool'
              required
              style={{ width: '222px' }}
              options={pools}
              disabled={isSelectDisabled}
            />

            <Typography
              color='#fff'
              fontSize={13}
              fontWeight={500}
              mt={4}
              className={styles.planTxt}
            >
              {t('current_plan_free_change_your_plan')}
            </Typography>
          </Box>

          <div className={styles.chartBody}>
            <div className={styles.infoBoxesContainer}>
              <Box
                width='100%'
                height='40px'
                backgroundColor='rgba(255, 255, 255, 0.15);'
                borderRadius='7px 7px 0px 0px'
                display='flex'
                alignItems='center'
                paddingLeft='11px'
                gap='33px'
                className={styles.infoBoxes}
              >
                {infoBoxes}
              </Box>
              <DashboardBarChart
                upload={poolData?.uploaded_files_count}
                download={poolData?.downloaded_files_count}
                className={styles.chart}
              />
            </div>
            <Box padding='16px 12px'>
              <Box display='flex' alignItems='center' gap='8px' mb='5px'>
                <Box width={13} height={13} backgroundColor='#27e6d6' />
                <Typography color='#fff' fontSize={12} fontWeight={500}>
                  {t('upload')}
                </Typography>
              </Box>
              <Box display='flex' alignItems='center' gap='8px'>
                <Box width={13} height={13} backgroundColor='#4131CA' />
                <Typography color='#fff' fontSize={12} fontWeight={500}>
                  {t('download')}
                </Typography>
              </Box>
            </Box>
          </div>
        </Box>
      </Container>
    </PageTransition>
  )
}

export default Dashboard
