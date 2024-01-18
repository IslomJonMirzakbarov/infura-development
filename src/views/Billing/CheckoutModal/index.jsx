import { Box, Button } from '@mui/material'
import BasicModal from 'components/BasicModal'
import styles from './style.module.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { formatNumberWithCommas, getShortenedPoolName } from 'utils/utilFuncs'
import { useTranslation } from 'react-i18next'

const CheckoutModal = ({ open, toggle, onSubmit, formData }) => {
  const [price, setPrice] = useState(null)
  const { t } = useTranslation()

  const handlePrice = async () => {
    try {
      const res = await axios.get(
        'https://mainnetapi.dexpo.world/api/home/conPrice'
      )
      if (res?.data) {
        // dispatch(setPriceeUSD(res?.data.data?.price_usd))
        // dispatch(setPriceKrw(res?.data.data?.price_krw))
        console.log('price: ', res?.data.data?.price_krw)
        setPrice(res?.data.data?.price_krw)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    handlePrice()
  }, [])

  return (
    <BasicModal
      open={open}
      handleClose={toggle}
      submitLabel={t('continue')}
      onCancel={toggle}
      onSubmit={onSubmit}
      title={t('checkout_confirmation')}
      cancelLabel={t('cancel')}
      withFooter={false}
      heightAuto
    >
      <Box className={styles.box}>
        <div className={styles.items}>
          <div className={styles.item}>
            <p>{t('pool_name')}</p>
            <p>{getShortenedPoolName(formData?.pool_name)}</p>
          </div>
          <div className={styles.item}>
            <p>{t('pool_size')}</p>
            <p>
              {formData?.pool_size?.value} {formData?.pool_size?.unit}
            </p>
          </div>
          <div className={styles.item}>
            <p>{t('pin_replication_b')}</p>
            <p>{formData?.pin_replication}</p>
          </div>
          <div className={styles.item}>
            <p>{t('period')}</p>
            <p>
              {formData?.pool_period}{' '}
              {formData?.pool_period === 1 ? t('month') : t('months')}
            </p>
          </div>
        </div>
        <Box
          display='flex'
          padding='10px 0 16px'
          justifyContent='space-between'
        >
          <p className={styles.price}>{t('estimated_pool_price_sh')}</p>
          <Box className={styles.cycon}>
            <p>{formatNumberWithCommas(formData?.pool_price)} CYCON</p>
            <p>
              {price &&
                formatNumberWithCommas(
                  Math.round(formData?.pool_price * price)
                )}
              {price && '원'}
            </p>
          </Box>
        </Box>
        <Box className={styles.notice}>
          <p>{t('notice')}</p>
          <p>{t('transaction_warning')}</p>
          <div className={styles.buttons}>
            <button onClick={toggle}>{t('cancel')}</button>
            <Button variant='contained' color='primary' onClick={onSubmit}>
              {t('confirm')}
            </Button>
          </div>
        </Box>
      </Box>
    </BasicModal>
  )
}

export default CheckoutModal
