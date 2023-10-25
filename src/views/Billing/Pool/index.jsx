import { Box, Button, Typography } from '@mui/material'
import Container from 'components/Container'
import HFTextField from 'components/ControlledFormElements/HFTextField'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './styles.module.scss'
import ApiKeyModal from '../ApiKeyModal'
import HFSelect from 'components/ControlledFormElements/HFSelect'
import CheckoutModal from '../CheckoutModal'
import LoaderModal from '../LoaderModal'
const sizes = [
  {
    label: '20',
    value: '20'
  },
  {
    label: '30',
    value: '30'
  }
]

const months = [
  {
    label: '1 month',
    value: '1-month'
  },
  {
    label: '2 month',
    value: '2-month'
  }
]

const Pool = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      type: 'TB',
      pin: 10
    }
  })

  const onSubmit = () => {
    setOpen(false)
    setOpen2(true)
    setOpen3(false)
    setTimeout(() => {
      setOpen2(false)
      setOpen3(true)
    }, 1000)
  }

  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)

  const toggle = () => setOpen((prev) => !prev)
  const toggle2 = () => setOpen2((prev) => !prev)
  const toggle3 = () => setOpen3((prev) => !prev)

  return (
    <>
      <Container>
        <Box width='100%' display='flex' alignItems='center'>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <Typography component='p' color='#fff' variant='main' mb='22px'>
              Pool From
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
              <HFSelect
                control={control}
                name='replication'
                label='Pin Replication'
                placeholder='Select pin replication'
                fullWidth
                required
                options={sizes}
              />

              <HFSelect
                control={control}
                name='period'
                label='Period'
                placeholder='Select period'
                fullWidth
                required
                options={months}
              />

              <HFTextField
                control={control}
                name='price'
                label='Estimated Pool price in CYCON'
                placeholder='Enter pool price'
                required
                fullWidth
              />
            </div>
            <Box
              display='flex'
              justifyContent='flex-end'
              width='100%'
              height='100%'
              mt='50px'
            >
              <Button
                onClick={toggle}
                variant='contained'
                color='secondary'
                type='submit'
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
      <CheckoutModal toggle={toggle} open={open} onSubmit={onSubmit} />
      <LoaderModal title='Loading' toggle={toggle2} open={open2} />
      <ApiKeyModal
        title='Transaction successfully
complete'
        toggle={toggle3}
        open={open3}
      />
    </>
  )
}

export default Pool
