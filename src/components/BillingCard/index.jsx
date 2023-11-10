import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import styles from './style.module.scss'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import classNames from 'classnames'
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded'

const BillingCard = ({ onSelect, item, isFree }) => {
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
        <p className={styles.text}>{item.text}</p>
      ) : (
        <ul className={styles.list}>
          <li className={styles.item}>
            <VerifiedRoundedIcon /> {item.storage} storage
          </li>
          <li className={styles.item}>
            <VerifiedRoundedIcon /> {item.gatewayCount} gateway
          </li>
          <li className={styles.item}>
            <VerifiedRoundedIcon /> {item.replication} pin replication
          </li>
        </ul>
      )}
      {item.isEnterprise ? (
        <p className={styles.priceText}>{item.priceText}</p>
      ) : (
        <Box display='flex' alignItems='center' mt='44px'>
          <span className={styles.price}>${item.price}</span>
          <span className={styles.month}>/month</span>
        </Box>
      )}

      <Button onClick={handleSelect}>
        {item.isEnterprise
          ? 'Customize'
          : item.isCurrentPlan
          ? 'Selected plan'
          : 'Select'}
      </Button>
    </Box>
  )
}

export default BillingCard
