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

const ProfileDetails = () => {
  const { id } = useParams()
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      size: '',
      gateway: 'https://public.oceandrive.network ',
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
    <>
      <Container>
        <Box width='100%' display='flex' alignItems='center'>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <Typography component='p' color='#fff' variant='main' mb='22px'>
              Details
            </Typography>
            <div className={styles.elements}>
              <BasicTextField
                control={control}
                name='name'
                label='Pool name'
                required
                fullWidth
                readOnly={true}
                disabled
              />
              <BasicTextField
                control={control}
                name='size'
                label='Pool size'
                required
                fullWidth
                readOnly={true}
                disabled
              />
              <CopyField
                control={control}
                name='gateway'
                label='Gateway'
                fullWidth
                withCopy
                readOnly={true}
                disabled
              />
              <BasicTextField
                control={control}
                name='replication'
                type='number'
                label='Pin Replication'
                fullWidth
                readOnly={true}
                disabled
              />
              <Box>
                <BasicTextField
                  control={control}
                  name='price'
                  label='Pool price in CYCON'
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
                      Tx hash
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
                label='API Key'
                fullWidth
                withCopy
                withRegenerate={handleRegenerate}
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
                Change plan
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  )
}

export default ProfileDetails
