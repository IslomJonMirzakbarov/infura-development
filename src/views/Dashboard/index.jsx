import React, { useEffect, useMemo } from 'react'
import Container from 'components/Container'
import styles from './style.module.scss'
import { Box, Button, Typography } from '@mui/material'
import HFSelect from 'components/ControlledFormElements/HFSelect'
import { useForm } from 'react-hook-form'
import DashboardBarChart from 'components/BarChart'
import { useNavigate } from 'react-router-dom'
import { useDashboard } from 'services/pool.service'
import poolStore from 'store/pool.store'
import { getShortenedPoolName } from 'utils/utilFuncs'

const Dashboard = () => {
  const navigate = useNavigate()
  const { control, watch } = useForm({
    defaultValues: {
      dashboardPool: 'ALL'
    }
  })

  const selectedPoolId = watch('dashboardPool')

  const { data } = useDashboard()
  console.log('dashboard: ', data)

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

  const freePool = data?.pools?.find((pool) => pool.price === 'free')
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

  const infoBoxes = Object.entries(poolInfo).map(([key, value]) => (
    <Typography key={key} fontSize={12} fontWeight={700} color='#fff'>
      {key.replace(/([A-Z])/g, ' $1')}:{' '}
      <span style={{ fontWeight: '300' }}>{value}</span>
    </Typography>
  ))
  return (
    <Container maxWidth={true}>
      <Box className={styles.createBtnBox}>
        <Button
          className={styles.createBtn}
          disableElevation
          color='primary'
          onClick={() => navigate('/main/pricing')}
        >
          <span>+</span> Create Storage
        </Button>
        <Typography className={styles.nodes}>
          Nodes available : {data?.available_nodes_count}
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

          <Typography color='#fff' fontSize={13} fontWeight={500} mt={4}>
            Current Plan: Free/Change your plan
          </Typography>
        </Box>

        <div className={styles.chartBody}>
          <Box
            width='100%'
            height='40px'
            backgroundColor='rgba(255, 255, 255, 0.15);'
            borderRadius='7px 7px 0px 0px'
            display='flex'
            alignItems='center'
            paddingLeft='11px'
            gap='33px'
          >
            {infoBoxes}
          </Box>
          <DashboardBarChart
            upload={poolData?.uploaded_files_count}
            download={0}
          />
          <Box padding='16px 12px'>
            <Box display='flex' alignItems='center' gap='8px' mb='5px'>
              <Box width={13} height={13} backgroundColor='#27e6d6' />
              <Typography color='#fff' fontSize={12} fontWeight={500}>
                Upload
              </Typography>
            </Box>
            <Box display='flex' alignItems='center' gap='8px'>
              <Box width={13} height={13} backgroundColor='#4131CA' />
              <Typography color='#fff' fontSize={12} fontWeight={500}>
                Download
              </Typography>
            </Box>
          </Box>
        </div>
      </Box>
    </Container>
  )
}

export default Dashboard
