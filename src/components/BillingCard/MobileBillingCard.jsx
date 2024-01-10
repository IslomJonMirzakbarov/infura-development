import { Box, Typography } from '@mui/material'
import React from 'react'
import styles from './style.module.scss'
import classNames from 'classnames'
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded'
import { useTranslation } from 'react-i18next'

export default function MobileBillingCard({ onSelect, item, isFree }) {
  const handleSelect = () => {
    if (item.isCurrentPlan) return
    onSelect(item)
  }
  const { t } = useTranslation()
  const translatedItemName = t(item.name.toLowerCase().replace(/\s/g, '_'))
  return (
    <Box
      className={classNames(styles.card, {
        [styles.currentPlan]: item.isCurrentPlan,
        [styles.disabled]: item.disabled,
        [styles.isEnterprise]: item.isEnterprise
      })}
    >
      <Typography className={styles.title}>{translatedItemName}</Typography>
      {item.isEnterprise ? (
        <div className={styles.enterpriseBox}>
          <p className={styles.priceText}>{t('personalized_plan')}</p>
          <p className={styles.text}>{t('contact_us_for_questions')}</p>
        </div>
      ) : (
        <ul className={styles.list}>
          <li className={styles.item}>
            <Box
              display='flex'
              alignItems='center'
              mt='44px'
              className={styles.priceBox}
            >
              <span className={styles.price}>${item.price}</span>
              <span className={styles.month}>/{t('month')}</span>
            </Box>
          </li>
          <li className={styles.item}>
            <VerifiedRoundedIcon /> {item.storage} {t('storage')}
          </li>
          <li className={styles.item}>
            <VerifiedRoundedIcon /> {item.replication} {t('pin_replication')}
          </li>
        </ul>
      )}

      <button onClick={handleSelect} className={styles.btn}>
        {item.isEnterprise
          ? t('customize')
          : item.isCurrentPlan
          ? t('selected_plan')
          : t('select')}
      </button>
    </Box>
  )
}
