import { Box, Button, Typography } from '@mui/material'
import Container from 'components/Container'
import HFTextField from 'components/ControlledFormElements/HFTextField'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './styles.module.scss'
import ApiKeyModal from '../../Billing/ApiKeyModal'
import { useNavigate } from 'react-router-dom'
const sizes = [
  {
    label: 'TB',
    value: 'TB'
  },
  {
    label: 'GB',
    value: 'GB'
  }
]

const ProfileDetails = () => {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm({
    defaultValues: {
      type: 'TB',
      pin: 10
    }
  })

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
              <HFTextField
                control={control}
                name='name'
                label='Pool name'
                placeholder='Enter pool name'
                required
                fullWidth
              />
              <HFTextField
                control={control}
                name='size'
                label='Pool size'
                type='number'
                required
                fullWidth
                placeholder='Enter pool size'
              />
              <HFTextField
                control={control}
                name='gateway'
                label='Gateway'
                fullWidth
                withCopy
              />
              <HFTextField
                control={control}
                name='replication'
                type='number'
                label='Pin Replication'
                placeholder='Enter pin replication'
                fullWidth
              />
              <HFTextField
                control={control}
                name='price'
                label='Pool price'
                placeholder='Enter pool price'
                fullWidth
              />
              <HFTextField
                control={control}
                name='api_key'
                label='API Key'
                fullWidth
                withCopy
                withRegenerate={handleRegenerate}
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
                onClick={() => navigate('/main/billing')}
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
