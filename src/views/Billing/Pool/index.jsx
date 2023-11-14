import { Box, Button, Typography } from '@mui/material'
import Container from 'components/Container'
import HFTextField from 'components/ControlledFormElements/HFTextField'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './styles.module.scss'
import ApiKeyModal from '../ApiKeyModal'
import HFSelect from 'components/ControlledFormElements/HFSelect'
import CheckoutModal from '../CheckoutModal'
import LoaderModal from '../LoaderModal'
import {
  usePoolCheckMutation,
  usePoolCreateMutation
} from 'services/pool.service'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { truncateJWT } from 'utils/utilFuncs'
import poolStore from 'store/pool.store'
import useDebounce from 'hooks/useDebounce'
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
    label: '2 months',
    value: 2
  }
]

const Pool = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { control, handleSubmit, formState, watch } = useForm({
    defaultValues: {
      unit: 'GB'
    }
  })
  const [propError, setPropError] = useState('')

  const { mutate: checkPool, isLoading: isCheckLoading } =
    usePoolCheckMutation()
  const poolName = watch('name')
  const debouncedPoolName = useDebounce(poolName, 500)
  useEffect(() => {
    if (debouncedPoolName) {
      checkPool(
        { pool_name: debouncedPoolName },
        {
          onSuccess: (res) => {
            console.log('res: ', res?.success)
            setPropError('')
          },
          onError: (error) => {
            console.log('error: ', error?.data?.message)
            if (
              error?.data?.message ===
              "code=400, message=Key: 'CheckPoolReq.PoolName' Error:Field validation for 'PoolName' failed on the 'min' tag"
            ) {
              setPropError('Please enter at least 5 characters.')
            } else {
              setPropError(error?.data?.message)
            }
          }
        }
      )
    }
  }, [debouncedPoolName])

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
        setPoolAddress(res?.access_token?.token)
        setOpen2(false)
        setOpen3(true)
        queryClient.invalidateQueries('pools')
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
              Pool Form
            </Typography>
            <div className={styles.elements}>
              <div>
                <HFTextField
                  control={control}
                  name='name'
                  label='Pool name'
                  placeholder='Enter pool name'
                  required={!propError}
                  fullWidth
                />
                {propError && (
                  <p
                    style={{
                      color: '#d32f2f',
                      margin: '-20px 0 5px 10px',
                      fontSize: '0.75rem',
                      fontWeight: '400'
                    }}
                  >
                    {propError}
                  </p>
                )}
              </div>
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
                type='number'
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
        onSubmit={() => navigate('/main/profile')}
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
