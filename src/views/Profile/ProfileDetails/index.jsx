import { Box, Button, Typography } from '@mui/material'
import Container from 'components/Container'
import HFTextField from 'components/ControlledFormElements/HFTextField'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './styles.module.scss'
// import ApiKeyModal from '../../Billing/ApiKeyModal'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetPoolById } from 'services/pool.service'
import { formatNumberWithCommas, truncateJWT } from 'utils/utilFuncs'
import BasicTextField from 'components/ControlledFormElements/HFSimplified/BasicTextField'
import CopyField from 'components/ControlledFormElements/HFSimplified/CopyField'
// import poolStore from 'store/pool.store'
// const sizes = [
//   {
//     label: 'TB',
//     value: 'TB'
//   },
//   {
//     label: 'GB',
//     value: 'GB'
//   }
// ]

const ProfileDetails = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetPoolById({ id })
  console.log('details: ', data)
  const txHash =
    '0x3f85259ebb1dfe210fe484f252b69ff4818f89a0d1bbb8788be0d7d9f1185f4f'
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm({
    defaultValues: {
      type: 'TB',
      pin: 10
    }
  })

  // const pools = poolStore.pools
  // const apiKey = pools.find((pool) => pool.id === id)?.token

  const onSubmit = (data) => {}

  const [open, setOpen] = useState(true)

  const toggle = () => setOpen((prev) => !prev)

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
                value={isLoading ? '' : data?.name}
                readOnly={true}
                disabled
              />
              <BasicTextField
                control={control}
                name='size'
                label='Pool size'
                required
                fullWidth
                value={
                  isLoading ? '' : `${data?.size?.value}${data?.size?.unit}`
                }
                readOnly={true}
                disabled
              />
              <CopyField
                control={control}
                name='gateway'
                label='Gateway'
                fullWidth
                withCopy
                value={'https://public.oceandrive.network '}
                readOnly={true}
                disabled
              />
              <BasicTextField
                control={control}
                name='replication'
                type='number'
                label='Pin Replication'
                fullWidth
                value={isLoading ? '' : `${data?.pin_replication}`}
                readOnly={true}
                disabled
              />
              <Box>
                <BasicTextField
                  control={control}
                  name='price'
                  label='Pool price in CYCON'
                  fullWidth
                  value={
                    isLoading ? '' : `${formatNumberWithCommas(data?.price)}`
                  }
                  readOnly={true}
                  disabled
                />

                {txHash && (
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
                      href={`https://baobab.scope.klaytn.com/tx/${txHash}`}
                      target='_blank'
                    >
                      <p>{txHash}</p>
                    </a>
                  </Box>
                )}
              </Box>

              <HFTextField
                control={control}
                name='api_key'
                type='password'
                label='API Key'
                fullWidth
                withCopy
                withRegenerate={handleRegenerate}
                value={isLoading ? '' : data?.token}
                readOnly={true}
                disabled
              />
            </div>
            <Box
              display='flex'
              justifyContent='flex-end'
              width='100%'
              height='100%'
              mt='250px'
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
      {/* <ApiKeyModal toggle={toggle} open={open} /> */}
    </>
  )
}

export default ProfileDetails
