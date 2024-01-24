import { Box, Button, Typography } from '@mui/material'
import Container from 'components/Container'
import React from 'react'
import { useForm } from 'react-hook-form'
import styles from './styles.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetPoolById } from 'services/pool.service'
import { formatNumberWithCommas } from 'utils/utilFuncs'
import BasicTextField from 'components/ControlledFormElements/HFSimplified/BasicTextField'
import CopyField from 'components/ControlledFormElements/HFSimplified/CopyField'
import PasswordField from 'components/ControlledFormElements/HFSimplified/PasswordField'
import { useTranslation } from 'react-i18next'

const ProfileDetails = ({ id }) => {
  const { t } = useTranslation()
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      size: '',
      gateway: 'https://infura.oceandrive.network',
      replication: '',
      price: '',
      api_key: ''
    }
  })
  const { data } = useGetPoolById({
    id,
    queryProps: {
      onSuccess: (res) => {
        reset({
          name: res?.name,
          size: `${res?.size?.value}${res?.size?.unit}`,
          replication: res?.pin_replication,
          price: `${formatNumberWithCommas(res?.price)}`,
          api_key: res?.token
        })
      }
    }
  })

  const navigate = useNavigate()

  const onSubmit = (data) => {}

  const handleRegenerate = () => {
    // Logic for regenerating the API Key
    console.log('API Key regenerated!')
  }

  return (
    <Box width='100%' display='flex' alignItems='center'>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Typography component='p' color='#fff' variant='main' mb='22px'>
          {t('details')}
        </Typography>
        <div className={styles.elements}>
          <BasicTextField
            control={control}
            name='name'
            label={t('pool_name')}
            required
            fullWidth
            readOnly={true}
            disabled
          />
          <BasicTextField
            control={control}
            name='size'
            label={t('pool_size')}
            required
            fullWidth
            readOnly={true}
            disabled
          />
          <CopyField
            control={control}
            name='gateway'
            label={t('gateway_b')}
            fullWidth
            withCopy
            readOnly={true}
            disabled
          />
          <BasicTextField
            control={control}
            name='replication'
            type='number'
            label={t('pin_replication_b')}
            fullWidth
            readOnly={true}
            disabled
          />
          <Box>
            <BasicTextField
              control={control}
              name='price'
              label={t('pool_price')}
              fullWidth
              readOnly={true}
              disabled
            />

            {data?.tx_hash && (
              <Box className={styles.txHash}>
                <Typography
                  color='white'
                  variant='standard'
                  fontWeight={500}
                  mb={1}
                >
                  {t('tx_hash')}
                </Typography>
                <a
                  href={`https://baobab.scope.klaytn.com/tx/${data.tx_hash}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  <p>{data.tx_hash}</p>
                </a>
              </Box>
            )}
          </Box>

          <PasswordField
            control={control}
            name='api_key'
            type='password'
            label={t('api_key')}
            fullWidth
            withCopy
            // withRegenerate={handleRegenerate}
            readOnly={true}
            disabled
            value={data?.token}
          />
        </div>
        <Box
          display='flex'
          justifyContent='flex-end'
          width='100%'
          height='100%'
          mt='250px'
          className={styles.planBtn}
        >
          <Button
            variant='contained'
            color='secondary'
            type='submit'
            onClick={() => navigate('/main/pricing')}
          >
            {t('change_plan')}
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default ProfileDetails
