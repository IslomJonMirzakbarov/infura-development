import { Box, Typography } from '@mui/material';
import React from 'react';
import NumberFormat from 'react-number-format';
import styles from './style.module.scss';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import classNames from 'classnames';

const BoardCard = ({ value, prefix, suffix, percent, label }) => {
  const isDown = percent < 0;

  return (
    <Box className={styles.card}>
      <Typography className={styles.value}>
        <NumberFormat
          displayType={'text'}
          thousandSeparator={true}
          decimalScale={3}
          value={value}
          prefix={prefix}
          suffix={suffix}
        />
      </Typography>

      <Box display="flex" alignItems="center">
        <Typography className={styles.label}>{label}</Typography>
        <Typography
          className={classNames(styles.percent, { [styles.down]: isDown })}
        >
          {isDown ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
          <NumberFormat
            displayType={'text'}
            thousandSeparator={true}
            decimalScale={1}
            value={percent}
            suffix="%"
          />
        </Typography>
      </Box>
    </Box>
  );
};

export default BoardCard;
