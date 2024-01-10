import { Box, Button, Typography } from '@mui/material'
import Container from 'components/Container'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './styles.module.scss'
import ApiKeyModal from '../ApiKeyModal'
import { useLocation, useNavigate } from 'react-router-dom'
import { usePoolCreateMutation } from 'services/pool.service'
import poolStore from 'store/pool.store'
import LoaderModal from '../LoaderModal'
import BasicTextField from 'components/ControlledFormElements/HFSimplified/BasicTextField'
import CopyField from 'components/ControlledFormElements/HFSimplified/CopyField'
import { useTranslation } from 'react-i18next'

const ConfirmSubscription = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const location = useLocation()
  const { control, handleSubmit, reset } = useForm()
  const [poolAddress, setPoolAddress] = useState('')
  const [open2, setOpen2] = useState(false)
  const { mutate } = usePoolCreateMutation()

  const toggle2 = () => setOpen2((prev) => !prev)

  const onSubmit = (data) => {
    const formData = {
      pool_name: data.pool_name,
      pool_period: 1,
      pool_price: 'free',
      pin_replication: 1,
      pool_size: {
        value: 1,
        unit: 'GB'
      }
    }
    setOpen2(true)
    mutate(formData, {
      onSuccess: (res) => {
        setPoolAddress(res?.access_token?.token)
        const items = [...poolStore.billingItems]
        poolStore.changeBillingItems(items)
        poolStore.setSelected(true)
        toggle()
        setOpen2(false)
      },
      onError: (err) => {
        console.log('confirmErr: ', err)
        poolStore.setSelected(false)
      }
    })
  }

  const [open, setOpen] = useState(false)

  const toggle = () => setOpen((prev) => !prev)

  const handleApiSubmit = () => navigate('/main/profile')

  useEffect(() => {
    reset({
      pool_name: location.state?.poolName,
      pool_size: '1 GB',
      gateway: 'https://public.oceandrive.network',
      pin_replication: 1,
      pool_price: 'Free'
    })
  }, [])

  return (
    <>
      <Container>
        <Box width='100%' display='flex' alignItems='center'>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <Typography component='p' color='#fff' variant='main' mb='22px'>
              {t('confirm_subscription')}
            </Typography>
            <div className={styles.elements}>
              <BasicTextField
                control={control}
                name='pool_name'
                label='pool_name'
                placeholder='enter_pool_name'
                required
                fullWidth
                disabled
              />
              <BasicTextField
                control={control}
                name='pool_size'
                label='pool_size'
                type='text'
                required
                fullWidth
                placeholder='Enter pool size'
                disabled
              />
              <CopyField
                control={control}
                name='gateway'
                label={t('gateway_b')}
                fullWidth
                withCopy
                disabled
                value='https://public.oceandrive.network'
              />
              <BasicTextField
                control={control}
                name='pin_replication'
                type='number'
                label='pin_replication_b'
                placeholder='Enter pin replication'
                fullWidth
                disabled
              />
              <BasicTextField
                control={control}
                name='pool_price'
                label='pool_price'
                placeholder='Enter pool price'
                fullWidth
                disabled
              />
            </div>
            <Box
              display='flex'
              justifyContent='flex-end'
              width='100%'
              height='100%'
              mt='50px'
            >
              <Button variant='contained' color='secondary' type='submit'>
                {t('submit')}
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
      <LoaderModal title='Loading' toggle={toggle2} open={open2} />
      <ApiKeyModal
        toggle={toggle}
        open={open}
        poolAddress={poolAddress}
        onSubmit={handleApiSubmit}
      />
    </>
  )
}

export default ConfirmSubscription
