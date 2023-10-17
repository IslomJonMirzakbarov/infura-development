import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import styles from './style.module.scss';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import classNames from 'classnames';

const BillingCard = ({
  name,
  price,
  storage,
  gatewayCount,
  replication,
  onSelect,
  isCurrentPlan,
  id,
  disabled
}) => {
  const handleSelect = () => {
    if (isCurrentPlan) return;
    onSelect(id);
  };

  return (
    <Box
      className={classNames(styles.card, {
        [styles.currentPlan]: isCurrentPlan,
        [styles.disabled]: disabled
      })}
    >
      <Typography className={styles.title}>{name}</Typography>
      <Box display="flex" alignItems="center">
        <span className={styles.price}>${price}</span>
        <span className={styles.month}>/month</span>
      </Box>
      <ul className={styles.list}>
        <li className={styles.item}>
          <CheckRoundedIcon /> {storage} storage
        </li>
        <li className={styles.item}>
          <CheckRoundedIcon /> {gatewayCount} gateway
        </li>
        <li className={styles.item}>
          <CheckRoundedIcon /> {replication} pin replication
        </li>
      </ul>
      <Button onClick={handleSelect}>
        {isCurrentPlan ? 'Current Plan' : 'Select'}
      </Button>
    </Box>
  );
};

export default BillingCard;
