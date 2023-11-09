import React from 'react'
import Container from 'components/Container'
import styles from './style.module.scss'
import { Box, Button, Typography } from '@mui/material'
import HFSelect from 'components/ControlledFormElements/HFSelect'
import { useForm } from 'react-hook-form'
import DashboardBarChart from 'components/BarChart'

const pools = [
  { label: 'DEXPO POOL', value: 'DEXPO POOL' },
  { label: 'OCEANDRIVE', value: 'OCEANDRIVE' }
]

const poolInfo = {
  PoolSize: '500GB',
  RemainingStorage: '10GB',
  SubscribedNodes: '10',
  UploadedFiles: '12'
}

const Dashboard = () => {
  const { control, handleSubmit, formState, watch } = useForm({
    defaultValues: {
      dashboardPool: 'ALL'
    }
  })

  const infoBoxes = Object.entries(poolInfo).map(([key, value]) => (
    <Typography key={key} fontSize={12} fontWeight={700} color='#fff'>
      {key.replace(/([A-Z])/g, ' $1')}:{' '}
      <span style={{ fontWeight: '300' }}>{value}</span>
    </Typography>
  ))
  return (
    <Container maxWidth={true}>
      <Box className={styles.createBtnBox}>
        <Button className={styles.createBtn} disableElevation color='primary'>
          <span>+</span> Create Storage
        </Button>
        <Typography className={styles.nodes}>
          Nodes are available : 99
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
          <DashboardBarChart />
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
