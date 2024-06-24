import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import Container from 'components/Container'
import React, { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
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
import useDebounce from 'hooks/useDebounce'
import BasicTextField from 'components/ControlledFormElements/HFSimplified/BasicTextField'
import useMetaMask from 'hooks/useMetaMask'
import ApproveModal from './ApproveModal'
import toast from 'react-hot-toast'
import { getRPCErrorMessage } from 'utils/getRPCErrorMessage'
import { months, sizes, units } from './poolData'
import walletStore from 'store/wallet.store'
import PageTransition from 'components/PageTransition'
import { useTranslation } from 'react-i18next'
import useKaikas from 'hooks/useKaikas'

const Pool = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { type } = walletStore
  const queryClient = useQueryClient()
  const isMobile = useMediaQuery('(max-width:640px)')
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      unit: 'GB'
    }
  })
  const metamask = useMetaMask()
  const kaikas = useKaikas()

  const { createPool, checkAllowance, makeApprove } =
    type === 'metamask' ? metamask : kaikas

  const minPrice = type === 'metamask' ? metamask.minPrice : kaikas.minPrice
  console.log('minPrice: ', minPrice)
  const [propError, setPropError] = useState('')
  const [openApprove, setOpenApprove] = useState(false)
  const [txHash, setTxHash] = useState(null)
  const { mutate: checkPool, isLoading: isCheckLoading } =
    usePoolCheckMutation()
  const poolName = useWatch({
    control,
    name: 'name'
  })

  const debouncedPoolName = useDebounce(poolName, 500)

  useEffect(() => {
    if (debouncedPoolName && poolName.length > 4 && poolName.length < 21) {
      checkPool(
        { pool_name: debouncedPoolName },
        {
          onSuccess: (res) => {
            console.log('res: ', res?.success)
            setPropError('')
          },
          onError: (error) => {
            console.log('error: ', error?.data?.message)
            setPropError(error?.data?.message)
          }
        }
      )
    }
  }, [debouncedPoolName])

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        walletStore.logout()
        navigate('/main/billing/connect')
      })
    }
  }, [])

  const { mutate } = usePoolCreateMutation()

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
      // pin_replication: parseInt(data.replication),
      pin_replication: 1000,
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

  const onConfirmApprove = async () => {
    try {
      setOpen2(true)
      setOpenApprove(false)
      await makeApprove()
      await submitCheckout()
    } catch (e) {
      setOpenApprove(false)
      setOpen2(false)
      toast.error(getRPCErrorMessage(e))
    }
  }

  const submitCheckout = async () => {
    try {
      setOpen(false)
      const allowance = await checkAllowance()
      const numericAllowance = Number(allowance)
      if (numericAllowance < formData.pool_price) {
        setOpen(false)
        setOpenApprove(true)
        return
      }
      setOpen2(true)
      const pool_size =
        formData.pool_size.unit === 'GB'
          ? parseInt(formData.pool_size.value)
          : parseInt(formData.pool_size.value * 1024)

      const result = await createPool({
        ...formData,
        pool_size
      })
      setTxHash(result.transactionHash)
      if (result.transactionHash)
        mutate(
          { ...formData, tx_hash: result.transactionHash },
          {
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
          }
        )
    } catch (e) {
      setOpen2(false)
      console.log(e)
      toast.error(getRPCErrorMessage(e))
    }
  }

  return (
    <PageTransition>
      <Container>
        <Box width='100%' display='flex' alignItems='center'>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <Typography component='p' color='#fff' variant='main' mb='22px'>
              {t('pool_form')}
            </Typography>
            <div className={styles.elements}>
              <div>
                <BasicTextField
                  control={control}
                  name='name'
                  label='pool_name'
                  placeholder='enter_pool_name'
                  required={!propError}
                  fullWidth
                  minLength={5}
                  rules={{
                    maxLength: {
                      value: 20,
                      message: t('max_length_20')
                    }
                  }}
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
                <BasicTextField
                  control={control}
                  name='size'
                  label='pool_size'
                  type='number'
                  required
                  placeholder={t('enter_pool_size')}
                  onKeyDown={(evt) =>
                    (evt.key === '.' || evt.key === '-') && evt.preventDefault()
                  }
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

              {/* <HFSelect
                control={control}
                name='replication'
                label={t('pin_replication_b')}
                placeholder={t('select_pin_replication')}
                fullWidth
                required
                options={sizes}
              /> */}

              <HFSelect
                control={control}
                name='period'
                label={t('period')}
                placeholder={t('select_time_period')}
                fullWidth
                required
                options={months}
              />

              <BasicTextField
                control={control}
                name='price'
                label={t('estimated_pool_price')}
                placeholder={t('enter_pool_price')}
                required
                fullWidth
                // type='number'
                // rules={{
                //   validate: (value) => value >= 1000 || t('min_price_1000')
                // }}
                type='text'
                rules={{
                  validate: (value) => {
                    const numberString = value.replace(/,/g, '')
                    return (
                      (numberString &&
                        !isNaN(numberString) &&
                        parseInt(numberString, 10) >= minPrice) ||
                      t('min_price', { value: minPrice })
                    )
                  }
                }}
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
                {t('submit')}
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
      <ApproveModal
        onConfirmApprove={onConfirmApprove}
        open={openApprove}
        title='CYCON'
        handleClose={() => setOpenApprove(false)}
        desc={t('approve_desc')}
        img='https://swap.conun.io/static/cycon.svg'
      />
      <LoaderModal title='Loading' toggle={toggle2} open={open2} />
      <ApiKeyModal
        onSubmit={() => navigate('/main/profile')}
        poolAddress={poolAddress}
        title={
          isMobile
            ? t('transaction_complete_mobile')
            : t('transaction_complete_desktop')
        }
        txHash={txHash}
        toggle={toggle3}
        open={open3}
      />
    </PageTransition>
  )
}

export default Pool
