import { Box, Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'
import { formatNumberWithCommas } from 'utils/utilFuncs'
import BasicTextField from 'components/ControlledFormElements/HFSimplified/BasicTextField'
import CopyField from 'components/ControlledFormElements/HFSimplified/CopyField'
import PasswordField from 'components/ControlledFormElements/HFSimplified/PasswordField'
import { useTranslation } from 'react-i18next'

const ProfileDetails = ({ poolData }) => {
  const { t } = useTranslation()
  const gatewayUrl =
    process.env.REACT_APP_INFURA_NETWORK || 'https://infura.oceandrive.network'
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      size: '',
      gateway: gatewayUrl,
      // replication: '',
      period: '',
      price: '',
      api_key: ''
    }
  })

  useEffect(() => {
    if (poolData) {
      reset({
        name: poolData?.name,
        size: `${poolData?.size?.value}${poolData?.size?.unit}`,
        // replication: poolData?.pin_replication,
        period:
          poolData?.period === 0
            ? 0
            : poolData?.period === 1
            ? '1 month'
            : poolData?.period > 1
            ? `${poolData?.period} months`
            : null,
        price: `${formatNumberWithCommas(poolData?.price)}`,
        api_key: poolData?.token
      })
    }
  }, [poolData, reset])

  const navigate = useNavigate()

  const onSubmit = (data) => {}

  const handleRegenerate = () => {
    // Logic for regenerating the API Key
    console.log('API Key regenerated!')
  }

  return (
    <Box
      width='100%'
      display='flex'
      alignItems='center'
      className={styles.detailsBox}
    >
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
            value={gatewayUrl}
          />
          <BasicTextField
            control={control}
            name='period'
            type='string'
            label={t('period')}
            fullWidth
            readOnly={true}
            disabled
          />
          <Box>
            {poolData?.price !== 'FREE' && (
              <BasicTextField
                control={control}
                name='price'
                label={t('pool_price')}
                fullWidth
                readOnly={true}
                disabled
              />
            )}

            {poolData?.tx_hash && (
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
                  href={`https://baobab.scope.klaytn.com/tx/${poolData.tx_hash}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  <p>{poolData.tx_hash}</p>
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
            value={poolData?.token}
          />
        </div>
        <Box
          display='flex'
          justifyContent='flex-end'
          width='100%'
          height='100%'
          mt='110px'
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
