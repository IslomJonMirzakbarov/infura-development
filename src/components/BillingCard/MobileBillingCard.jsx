import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import styles from './style.module.scss'
import classNames from 'classnames'
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded'

export default function MobileBillingCard({ onSelect, item, isFree }) {
  const handleSelect = () => {
    if (item.isCurrentPlan) return
    onSelect(item)
  }
  return (
    <Box
      className={classNames(styles.card, {
        [styles.currentPlan]: item.isCurrentPlan,
        [styles.disabled]: item.disabled,
        [styles.isEnterprise]: item.isEnterprise
      })}
    >
      <Typography className={styles.title}>{item.name}</Typography>
      {item.isEnterprise ? (
        <div className={styles.enterpriseBox}>
          <p className={styles.priceText}>Personalized plan</p>
          <p className={styles.text}>
            Feel free to contact us for any questions.
          </p>
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
              <span className={styles.month}>/month</span>
            </Box>
          </li>
          <li className={styles.item}>
            <VerifiedRoundedIcon /> {item.storage} storage
          </li>
          <li className={styles.item}>
            <VerifiedRoundedIcon /> {item.replication} pin replication
          </li>
        </ul>
      )}

      <button onClick={handleSelect} className={styles.btn}>
        {item.isEnterprise
          ? 'Customize'
          : item.isCurrentPlan
          ? 'Selected Plan'
          : 'Select'}
      </button>
    </Box>
  )
}
