import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import Container from 'components/Container'
import HFSelect from 'components/ControlledFormElements/HFSelect'
import BasicTextField from 'components/ControlledFormElements/HFSimplified/BasicTextField'
import PageTransition from 'components/PageTransition'
import useDebounce from 'hooks/useDebounce'
import useKaikas from 'hooks/useKaikas'
import useMetaMask from 'hooks/useMetaMask'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { usePoolCheckMutation } from 'services/pool.service'
import walletStore from 'store/wallet.store'
import poolStore from 'store/pool.store'
import { getRPCErrorMessage } from 'utils/getRPCErrorMessage'
import CheckoutModal from '../CheckoutModal'
import LoaderModal from '../LoaderModal'
import ApproveModal from './ApproveModal'
import { months, units } from './poolData'
import styles from './styles.module.scss'

const Pool = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { type } = walletStore
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
  const [propError, setPropError] = useState('')
  const [openApprove, setOpenApprove] = useState(false)
  const [formData, setFormData] = useState(null)
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)

  const { mutate: checkPool, isLoading: isCheckLoading } = usePoolCheckMutation()
  
  const poolName = useWatch({
    control,
    name: 'name'
  })

  const debouncedPoolName = useDebounce(poolName, 500)

  useEffect(() => {
    if (debouncedPoolName && poolName.length > 4 && poolName.length < 21) {
      checkPool(debouncedPoolName, {
        onSuccess: (res) => {
          if (!res?.details?.isAvailable) {
            setPropError(false)
          } else {
            setPropError('Pool already exists')
          }
        },
        onError: (error) => {
          console.log('error: ', error?.data?.message)
          setPropError(error?.data?.message)
        }
      })
    }
  }, [debouncedPoolName, poolName])

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        walletStore.logout()
        navigate('/main/billing/connect')
      })
    }
  }, [navigate])

  const toggle = () => setOpen((prev) => !prev)
  const toggle2 = () => setOpen2((prev) => !prev)

  const onSubmit = (data) => {
    const formData = {
      pool_name: data.name,
      pool_period: parseInt(data.period),
      pool_price: data.price,
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
      console.log('result of create pool metamask: ', result)
      setTxHash(result.transactionHash)

      if (result.transactionHash && result.poolId) {
        console.log('poolId: ', result.poolId)
        mutate(
          {
            subscriptionPlan: 0,
            price: formData.pool_price,
            poolName: formData.pool_name,
            poolSize: {
              size: formData.pool_size.value,
              type: formData.pool_size.unit
            },
            pinReplication: formData.pin_replication,
            period: formData.pool_period,
            txHash: result.transactionHash,
            rewardPoolId: result.poolId
          },
          {
            onSuccess: (res) => {
              console.log('create pool response success: ', res)
              setPoolAddress(res?.details?.poolAddress)
              setOpen2(false)
              setOpen3(true)
              queryClient.invalidateQueries('pools')

              const apiKeyData = {
                poolId: res.details.poolId,
                poolName: res.details.poolName,
                poolNote: `API Key for ${res.details.poolName}`,
                period: res.details.period,
                read: true,
                write: true
              }

              generateApiKey(apiKeyData)
            },
            onError: (error) => {
              setOpen2(false)
              console.log('create pool error: ', error)
              if (error.status === 401) {
                // navigate('/auth/register')
              }
            }
          }
        )
      } else {
        setOpen2(false)
        toast.error(
          'Could not find poolId in transaction. Please contact support.'
        )
      }
    } catch (e) {
      setOpen2(false)
      console.log('submit checkout error: ', e)
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
                  <p className={styles.errorText}>
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
    </PageTransition>
  )
}

export default Pool
