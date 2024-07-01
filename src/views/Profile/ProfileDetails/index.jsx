import { Box, Button, Typography } from '@mui/material'
import HFSelect from 'components/ControlledFormElements/HFSelect'
import BasicTextField from 'components/ControlledFormElements/HFSimplified/BasicTextField'
import CopyField from 'components/ControlledFormElements/HFSimplified/CopyField'
import PasswordField from 'components/ControlledFormElements/HFSimplified/PasswordField'
import PageTransition from 'components/PageTransition'
import useKaikas from 'hooks/useKaikas'
import useMetaMask from 'hooks/useMetaMask'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetPoolById, usePoolUpdateMutation } from 'services/pool.service'
import walletStore from 'store/wallet.store'
import { getRPCErrorMessage } from 'utils/getRPCErrorMessage'
import { formatNumberWithCommas } from 'utils/utilFuncs'
import LoaderModal from 'views/Billing/LoaderModal'
import ApproveModal from 'views/Billing/Pool/ApproveModal'
import { months, units } from 'views/Billing/Pool/poolData'
import styles from './styles.module.scss'

const ProfileDetails = ({ poolData, poolId }) => {
  const { poolId: workspacePoolId } = useParams()
  const { data: worksapcePoolData } = useGetPoolById({ id: workspacePoolId })
  const customPoolId = workspacePoolId ? workspacePoolId : poolId
  const customPoolData = workspacePoolId ? worksapcePoolData : poolData
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [openApprove, setOpenApprove] = useState(false)
  const [open2, setOpen2] = useState(false)
  const gatewayUrl =
    process.env.REACT_APP_INFURA_NETWORK || 'https://infura.oceandrive.network'
  const { type, address } = walletStore
  const { mutate } = usePoolUpdateMutation()
  const metamask = useMetaMask()
  const kaikas = useKaikas()

  const { upgradePool, checkAllowance, makeApprove } =
    type === 'metamask' ? metamask : kaikas

  const minPrice = type === 'metamask' ? metamask.minPrice : kaikas.minPrice
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      name: '',
      size: '',
      unit: '',
      gateway: gatewayUrl,
      period: 1,
      price: '',
      api_key: ''
    }
  })

  const [initialValues, setInitialValues] = useState({
    size: '',
    unit: '',
    period: '',
    price: ''
  })

  const editable = customPoolData?.is_active === false

  useEffect(() => {
    if (customPoolData) {
      const formattedPrice = `${formatNumberWithCommas(customPoolData?.price)}`

      reset({
        name: customPoolData?.name,
        size: customPoolData?.size?.value,
        unit: customPoolData?.size?.unit,
        period: editable ? 1 : customPoolData?.period,
        price: formattedPrice,
        api_key: customPoolData?.token
      })

      setInitialValues({
        size: customPoolData?.size?.value,
        unit: customPoolData?.size?.unit,
        period: customPoolData?.period,
        price: formattedPrice
      })
    }
  }, [customPoolData, reset])

  const watchedValues = watch(['size', 'unit', 'period', 'price'])

  const onConfirmApprove = async () => {
    try {
      setOpen2(true)
      setOpenApprove(false)
      await makeApprove()
      await onSubmit()
    } catch (e) {
      setOpenApprove(false)
      setOpen2(false)
      toast.error(getRPCErrorMessage(e))
    }
  }

  const onSubmit = async (data) => {
    if (!address) {
      navigate(`/main/profile/connect-wallet/update-${customPoolId}`)
    }
    // else if (
    // data.size === initialValues.size &&
    // data.unit === initialValues.unit &&
    // data.period === initialValues.period &&
    //   data.price === initialValues.price
    // ) {
    //   toast.error('Price change is required!')
    //   return
    // }
    else {
      const poolPrice = data.price.replace(/,/g, '')
      if (isNaN(poolPrice) || !poolPrice) {
        toast.error('Invalid price value')
        return
      }

      const formData = {
        pool_name: data.name,
        pool_period: parseInt(data.period),
        pool_price: poolPrice,
        pin_replication: 1000,
        pool_size: {
          value: parseInt(data.size),
          unit: data.unit
        }
      }

      try {
        const allowance = await checkAllowance()
        const numericAllowance = Number(allowance)
        if (numericAllowance < formData.pool_price) {
          setOpenApprove(true)
          return
        }
        setOpen2(true)
        const poolSize =
          formData.pool_size.unit === 'GB'
            ? parseInt(formData.pool_size.value)
            : parseInt(formData.pool_size.value * 1024)

        const result = await upgradePool({
          poolId: customPoolData.reward_pool_id,
          poolSize,
          poolPrice: formData.pool_price,
          replicationCount: 1000,
          replicationPeriod:
            parseInt(data.period) + parseInt(customPoolData?.period)
        })

        console.log('result: ', result)
        if (result.transactionHash)
          mutate(
            {
              customPoolId,
              data: {
                pool_size: formData.pool_size,
                pool_price: formData.pool_price,
                pool_period: formData.pool_period,
                tx_hash: result.transactionHash
              }
            },
            {
              onSuccess: (res) => {
                console.log('res: ', res)
                setOpen2(false)
                toast.success('Updated successfully!')
                queryClient.invalidateQueries(`get-pool-${customPoolId}`)
                setTimeout(() => {
                  navigate('/main/billing')
                }, 1000)
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
        console.log('Error during onSubmit: ', e)
        toast.error(getRPCErrorMessage(e))
      }
    }
  }

  return (
    <PageTransition>
      <Box
        width='100%'
        display='flex'
        flexDirection={workspacePoolId ? 'column' : 'row'}
        alignItems={workspacePoolId ? 'start' : 'center'}
        className={styles.detailsBox}
      >
        {workspacePoolId && (
          <Typography
            fontWeight='500'
            fontSize='15px'
            lineHeight='22.5px'
            color='#27e6d6'
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() => navigate(-1)}
            marginBottom='10px'
          >
            &lt; Back
          </Typography>
        )}
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
            <div style={{ display: 'flex', gap: '6px' }}>
              <BasicTextField
                control={control}
                name='size'
                label='pool_size'
                type='number'
                onKeyDown={(evt) =>
                  (evt.key === '.' || evt.key === '-') && evt.preventDefault()
                }
                disabled={!editable}
              />
              <HFSelect
                control={control}
                name='unit'
                required
                style={{ width: '80px' }}
                options={units}
                disabled={!editable}
              />
            </div>
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
            <HFSelect
              control={control}
              name='period'
              label={editable ? t('extra_period') : t('period')}
              fullWidth
              options={months}
              disabled={!editable}
            />
            <Box>
              {customPoolData?.price !== 'FREE' && (
                <BasicTextField
                  control={control}
                  name='price'
                  label={t('pool_price')}
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
                  disabled={!editable}
                />
              )}

              {customPoolData?.tx_hash && (
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
                    href={`https://baobab.scope.klaytn.com/tx/${customPoolData.tx_hash}`}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <p>{customPoolData.tx_hash}</p>
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
              readOnly={true}
              disabled
              value={customPoolData?.token}
            />
          </div>
          {editable && (
            <Box
              display='flex'
              justifyContent='flex-end'
              width='100%'
              height='100%'
              mt='60px'
              className={styles.planBtn}
            >
              <Button variant='contained' color='secondary' type='submit'>
                {t('edit')}
              </Button>
            </Box>
          )}
        </form>
      </Box>
      <ApproveModal
        onConfirmApprove={onConfirmApprove}
        open={openApprove}
        title='CYCON'
        handleClose={() => setOpenApprove(false)}
        desc={t('approve_desc')}
        img='https://swap.conun.io/static/cycon.svg'
      />
      <LoaderModal title='Loading' open={open2} />
    </PageTransition>
  )
}

export default ProfileDetails
