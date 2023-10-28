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
import { usePoolCreateMutation } from 'services/pool.service'
import { useNavigate } from 'react-router-dom'
const sizes = [
  {
    label: '20',
    value: 20
  },
  {
    label: '30',
    value: 30
  }
]

const units = [
  { label: 'GB', value: 'GB' },
  { label: 'TB', value: 'TB' }
]

const months = [
  {
    label: '1 month',
    value: 1
  },
  {
    label: '2 month',
    value: 2
  }
]

const Pool = () => {
  const navigate = useNavigate()
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      unit: 'GB'
    }
  })
  const { mutate, isLoading } = usePoolCreateMutation()
  const [formData, setFormData] = useState(null)
  const [poolAddress, setPoolAddress] = useState(null)
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)

  const toggle = () => setOpen((prev) => !prev)
  const toggle2 = () => setOpen2((prev) => !prev)
  const toggle3 = () => setOpen3((prev) => !prev)

  const onSubmit = (data) => {
    console.log('formState: ', formState)
    const formData = {
      pool_name: data.name,
      pool_period: parseInt(data.period),
      pool_price: data.price,
      pin_replication: parseInt(data.replication),
      pool_size: {
        value: parseInt(data.size),
        unit: data.unit
      }
    }
    setFormData(formData)
    if (Object.keys(formState.errors).length === 0) {
      setOpen(true)
    }
  }

  const submitCheckout = () => {
    setOpen(false)
    setOpen2(true)

    mutate(formData, {
      onSuccess: (res) => {
        console.log('res: ', res)
        setPoolAddress(res?.pool_address)
        setOpen2(false)
        setOpen3(true)
      },
      onError: (error) => {
        setOpen2(false)
        console.log('error: ', error)
        if (error.status === 401) {
          // navigate('/auth/register')
        }
      }
    })
  }

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
              <div style={{ display: 'flex', gap: '6px' }}>
                <HFTextField
                  control={control}
                  name='size'
                  label='Pool size'
                  type='number'
                  required
                  placeholder='Enter pool size'
                />
                <HFSelect
                  control={control}
                  name='unit'
                  placeholder='Select unit'
                  required
                  style={{ width: '80px' }}
                  options={units}
                />
              </div>

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
                // onClick={toggle}
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
      <CheckoutModal
        formData={formData}
        toggle={toggle}
        open={open}
        onSubmit={submitCheckout}
      />
      <LoaderModal title='Loading' toggle={toggle2} open={open2} />
      <ApiKeyModal
        onSubmit={() => navigate('/main/billing')}
        poolAddress={poolAddress}
        title='Transaction successfully
complete'
        toggle={toggle3}
        open={open3}
      />
    </>
  )
}

export default Pool
