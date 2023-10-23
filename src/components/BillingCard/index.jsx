import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import styles from './style.module.scss'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import classNames from 'classnames'
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded'

const BillingCard = ({
  name,
  price,
  storage,
  gatewayCount,
  replication,
  onSelect,
  isCurrentPlan,
  id,
  disabled,
  isEnterprise,
  priceText,
  text
}) => {
  const handleSelect = () => {
    if (isCurrentPlan) return
    onSelect(id)
  }

  return (
    <Box
      className={classNames(styles.card, {
        [styles.currentPlan]: isCurrentPlan,
        [styles.disabled]: disabled,
        [styles.isEnterprise]: isEnterprise
      })}
    >
      <Typography className={styles.title}>{name}</Typography>
      {isEnterprise ? (
        <p className={styles.text}>{text}</p>
      ) : (
        <ul className={styles.list}>
          <li className={styles.item}>
            <VerifiedRoundedIcon /> {storage} storage
          </li>
          <li className={styles.item}>
            <VerifiedRoundedIcon /> {gatewayCount} gateway
          </li>
          <li className={styles.item}>
            <VerifiedRoundedIcon /> {replication} pin replication
          </li>
        </ul>
      )}
      {isEnterprise ? (
        <p className={styles.priceText}>{priceText}</p>
      ) : (
        <Box display='flex' alignItems='center' mt='44px'>
          <span className={styles.price}>${price}</span>
          <span className={styles.month}>/month</span>
        </Box>
      )}

      <Button onClick={handleSelect}>
        {isEnterprise
          ? 'Customize'
          : isCurrentPlan
          ? 'Your current plan'
          : 'Select'}
      </Button>
    </Box>
  )
}

export default BillingCard
