import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import styles from './style.module.scss'
import classNames from 'classnames'
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded'
import MobileBillingCard from './MobileBillingCard'
import { useTranslation } from 'react-i18next'

const BillingCard = ({ onSelect, item, isFree }) => {
  const handleSelect = () => {
    if (item.isCurrentPlan) return
    onSelect(item)
  }
  const { t } = useTranslation()
  const isMobile = useMediaQuery('(max-width:600px)')
  const translatedItemName = t(item.name.toLowerCase().replace(/\s/g, '_'))
  const translatedPriceText = item.isEnterprise
    ? t('get_personalized_plan')
    : `${item.price} ${t('per_month')}`

  return isMobile ? (
    <MobileBillingCard onSelect={onSelect} item={item} isFree={isFree} />
  ) : (
    <Box
      className={classNames(styles.card, {
        [styles.currentPlan]: item.isCurrentPlan,
        [styles.disabled]: item.disabled,
        [styles.isEnterprise]: item.isEnterprise
      })}
    >
      <Typography className={styles.title}>{translatedItemName}</Typography>
      {item.isEnterprise ? (
        <p className={styles.text}>{t('custom_plan_description')}</p>
      ) : (
        <ul className={styles.list}>
          <li className={styles.item}>
            <VerifiedRoundedIcon /> {item.storage} {t('storage')}
          </li>
          <li className={styles.item}>
            <VerifiedRoundedIcon /> {item.gatewayCount} {t('gateway')}
          </li>
          <li className={styles.item}>
            <VerifiedRoundedIcon /> {item.replication} {t('pin_replication')}
          </li>
        </ul>
      )}
      {item.isEnterprise ? (
        <p className={styles.priceText}>{translatedPriceText}</p>
      ) : (
        <Box display='flex' alignItems='center' mt='44px'>
          <span className={styles.price}>${item.price}</span>
          <span className={styles.month}>/{t('per_month')}</span>
        </Box>
      )}

      <Button onClick={handleSelect}>
        {item.isEnterprise
          ? t('customize')
          : item.isCurrentPlan
          ? t('selected_plan')
          : t('select')}
      </Button>
    </Box>
  )
}

export default BillingCard
